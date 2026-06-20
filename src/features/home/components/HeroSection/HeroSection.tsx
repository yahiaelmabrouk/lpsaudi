import { FunctionComponent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FrameComponent from "./FrameComponent";
import { useOneLinkUrl } from "@/hooks/useOneLinkUrl";
import { asset } from "@/lib/asset";
import styles from "./HeroSection.module.css";

export type HeroSectionType = {
  className?: string;
};

const HeroSection: FunctionComponent<HeroSectionType> = ({
  className = "",
}) => {
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const iosFullscreenVideoRef = useRef<(HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // iOS only: pre-create a hidden video for fullscreen, but defer the network
  // request until after the page has settled. Setting preload="none" on mount
  // avoids a second simultaneous video connection during initial page load
  // (which compounds connection pressure on high-latency links). After 5 s the
  // video metadata loads in the background so the fullscreen path is ready.
  useEffect(() => {
    if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) return;
    type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

    const wrapper = document.createElement("div");
    wrapper.setAttribute(
      "style",
      "position:fixed;top:50vh;left:50vw;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden"
    );
    document.body.appendChild(wrapper);

    const fsVid = document.createElement("video") as IOSVideo;
    fsVid.src = asset("/hero-video.mp4");
    fsVid.preload = "none";
    fsVid.muted = false;
    fsVid.setAttribute("style", "width:1px;height:1px");
    wrapper.appendChild(fsVid);
    iosFullscreenVideoRef.current = fsVid;

    // Start loading metadata after the page has finished its critical requests
    const timer = setTimeout(() => {
      if (fsVid) fsVid.preload = "metadata";
    }, 5000);

    return () => {
      clearTimeout(timer);
      fsVid.pause();
      wrapper.parentNode?.removeChild(wrapper);
      iosFullscreenVideoRef.current = null;
    };
  }, []);

  const requestVideoFullscreen = (video: HTMLVideoElement | null) => {
    if (!video) return;

    type MaybeFullscreenVideo = HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => Promise<void> | void;
    };

    type MaybeFullscreenElement = HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
      msRequestFullscreen?: () => Promise<void> | void;
    };

    const fullscreenVideo = video as MaybeFullscreenVideo;
    const fullscreenElement = video as MaybeFullscreenElement;

    const standardRequest = video.requestFullscreen?.bind(video);
    const webkitElementRequest =
      fullscreenElement.webkitRequestFullscreen?.bind(fullscreenElement);
    const msRequest =
      fullscreenElement.msRequestFullscreen?.bind(fullscreenElement);

    const enterFullscreen =
      standardRequest ?? webkitElementRequest ?? msRequest ?? null;

    if (enterFullscreen) {
      void Promise.resolve(enterFullscreen()).catch(() => {
        fullscreenVideo.webkitEnterFullscreen?.();
      });
      return;
    }

    fullscreenVideo.webkitEnterFullscreen?.();
  };

  const openModal = () => {
    type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    const inline = inlineVideoRef.current as IOSVideo | null;
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

    if (isIOS) {
      const fsVid = iosFullscreenVideoRef.current;
      const savedTime = inline?.currentTime ?? 0;

      // Primary path: use the pre-loaded hidden video for fullscreen.
      // The inline video is only paused — its currentTime and play-permission
      // are fully preserved, so resuming after fullscreen is instant with no reload.
      if (fsVid?.webkitEnterFullscreen && fsVid.readyState >= 1) {
        const savedScrollY = window.scrollY;
        inline?.pause();
        fsVid.currentTime = 0;
        fsVid.addEventListener("webkitendfullscreen", () => {
          fsVid.pause();
          // iOS scrolls the page to reveal the source video element when exiting
          // fullscreen, which shifts the viewport and displaces the play button.
          // Snap back to the exact scroll position we were at before.
          window.scrollTo(0, savedScrollY);
          // iOS may pause the inline video asynchronously after fullscreen exits.
          // Retry play() with increasing delays until it succeeds.
          const tryPlay = (attempt: number) => {
            if (!inline) return;
            inline.muted = true;
            inline.currentTime = savedTime;
            void inline.play().catch(() => {
              if (attempt < 4) setTimeout(() => tryPlay(attempt + 1), 150 * (attempt + 1));
            });
          };
          setTimeout(() => tryPlay(0), 100);
        }, { once: true });
        fsVid.webkitEnterFullscreen();
        void fsVid.play().catch(() => {});
        return;
      }

      // Fallback (hidden video not ready yet): use inline video directly with load() reset.
      if (inline?.webkitEnterFullscreen) {
        const restoreAutoplay = () => {
          inline.muted = true;
          inline.loop = true;
          inline.addEventListener("canplay", () => {
            void inline.play().catch(() => {});
          }, { once: true });
          inline.load();
        };
        inline.addEventListener("webkitendfullscreen", restoreAutoplay, { once: true });
        inline.pause();
        inline.currentTime = 0;
        inline.muted = false;
        inline.volume = 1;
        inline.webkitEnterFullscreen();
        void inline.play().catch(() => {});
        return;
      }
    }

    // Android / desktop: open modal then request fullscreen.
    inline?.pause();
    setIsModalOpen(true);
    requestVideoFullscreen(modalVideoRef.current);
    requestAnimationFrame(() => {
      requestVideoFullscreen(modalVideoRef.current);
    });
  };

  const closeModal = () => {
    const modalVideo = modalVideoRef.current;
    if (modalVideo) {
      modalVideo.pause();
    }
    setIsModalOpen(false);
    // Resume silent inline playback
    const inline = inlineVideoRef.current;
    if (inline) {
      inline.muted = true;
      void inline.play().catch(() => {});
    }
  };

  // Modal: start from 0, unmuted, playing; lock body scroll while open
  useEffect(() => {
    if (!isModalOpen) return;
    const v = modalVideoRef.current;
    if (v) {
      v.currentTime = 0;
      v.muted = false;
      v.volume = 1;
      void v.play().catch(() => {
        // Some browsers may block; leave controls for user
      });
    }

    // Prevent background scroll
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const fullscreenDocument = document as Document & {
      webkitFullscreenElement?: Element | null;
    };

    const isFullscreenActive = () =>
      Boolean(
        document.fullscreenElement ||
        fullscreenDocument.webkitFullscreenElement,
      );

    const onFullscreenChange = () => {
      // If user exits fullscreen via browser controls, return to landing view.
      if (!isFullscreenActive()) {
        closeModal();
      }
    };

    const onWebkitEndFullscreen = () => {
      closeModal();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      onFullscreenChange as EventListener,
    );
    v?.addEventListener(
      "webkitendfullscreen",
      onWebkitEndFullscreen as EventListener,
    );

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullscreenChange as EventListener,
      );
      v?.removeEventListener(
        "webkitendfullscreen",
        onWebkitEndFullscreen as EventListener,
      );
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isModalOpen]);

  const oneLinkUrl = useOneLinkUrl();

  const [frameComponentItems] = useState([
    {
      frameDivJustifyContent: "center" as const,
      frameDivBorderLeft: undefined,
      frameDivGridRow: "1" as const,
      prop: "نتيجة تهمّك",
      letsIconsdimondAlt: asset("/lets-icons-dimond-alt.svg"),
    },
    {
      frameDivJustifyContent: "unset" as const,
      frameDivBorderLeft: "1px solid #e2e8f0" as const,
      frameDivGridRow: undefined,
      prop: "راحة كاملة",
      letsIconsdimondAlt: asset("/bx-happy.svg"),
    },
    {
      frameDivJustifyContent: "unset" as const,
      frameDivBorderLeft: "1px solid #e2e8f0" as const,
      frameDivGridRow: "2" as const,
      prop: "مرونة بالأنواع",
      letsIconsdimondAlt: asset("/hugeicons-ruler.svg"),
    },
    {
      frameDivJustifyContent: "unset" as const,
      frameDivBorderLeft: "1px solid #e2e8f0" as const,
      frameDivGridRow: "2" as const,
      prop: "شفافية تامة",
      letsIconsdimondAlt: asset("/Magnifying.svg"),
    },
  ]);
  return (
    <div className={[styles.heroSection, className].join(" ")}>
      <div className={styles.heroHeader}>
        <img
          className={styles.heroVisIcon}
          fetchPriority="high"
          alt=""
          src={asset("/Hero-Vis-optimized.avif")}
        />
        <section className={styles.heroText}>
          <div className={styles.wrapper}>
            <div className={styles.div}>
              <span>
                <img src={asset("/star.png")} alt="star" className={styles.starIcon} />{" "}
                مغسلة ملابس موثوقة في{" "}
              </span>
              <span className={styles.span}>جدة</span>
            </div>
          </div>
          <div className={styles.descriptionContainerParent}>
            <div className={styles.descriptionContainer}>
              <h1 className={styles.h1}>
                <span>{`غسيل وكي الملابس مع `}</span>
                <span className={styles.span}>استلام وتسليم للباب</span>
              </h1>
            </div>
            <div className={styles.laundryHeroes}>
              {`خلّ السجاد يرجع `}<b className={styles.span}>{`"كأنه جديد"`}</b>{` بدون ما تشيل هم النقل. استلام من باب البيت، تنظيف سجاد عميق + تعقيم + تجفيف احترافي، وتتابع كل خطوة داخل تطبيق `}<b className={styles.span}>Laundry Heroes</b>
            </div>
          </div>
          <div className={styles.storeDownload}>
            <a
              href={oneLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeDownloadButton}
            >
              <img
                className={styles.playstoreIcon}
                alt=""
                src={asset("/Playstore2.svg")}
              />
              <div className={styles.content}>
                <div className={styles.subtext}>GET IT ON</div>
                <img className={styles.path90Icon} alt="" src={asset("/path90.svg")} />
              </div>
            </a>
            <a
              href={oneLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeDownloadButton2}
            >
              <img className={styles.appleIcon} alt="" src={asset("/Apple.svg")} />
              <div className={styles.content2}>
                <div className={styles.downloadOnThe}>Download on the</div>
                <div className={styles.appStore}>App Store</div>
              </div>
            </a>
          </div>
          <div className={styles.container}>
            <div className={styles.container2}>
              <div className={styles.div2}>
                أسعارنا الأقل مقارنة بالمغاسل التقليدية
              </div>
              <div className={styles.container3}>
                <b className={styles.b}>✓</b>
              </div>
            </div>
            <div className={styles.container4}>
              <div className={styles.div2}>دعم سريع عبر واتساب</div>
              <div className={styles.container3}>
                <b className={styles.b}>✓</b>
              </div>
            </div>
            <div className={styles.container6}>
              <div className={styles.div2}>تسعيرة واضحة قبل التأكيد</div>
              <div className={styles.container3}>
                <b className={styles.b}>✓</b>
              </div>
            </div>
            <div className={styles.container8}>
              <div className={styles.div2}>حجز خلال ثواني</div>
              <div className={styles.container3}>
                <b className={styles.b}>✓</b>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.maskGroupParent} onClick={openModal} style={{ cursor: "pointer" }}>
          <video
            ref={inlineVideoRef}
            className={styles.heroVideo}
            src={asset("/hero-video.mp4")}
            poster={asset("/hero-video-poster.jpg")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Hero preview video"
          />
          <div className={styles.frameChild} />
          <div className={styles.frameItem} />
          <button
            type="button"
            className={styles.playButtonWrapper}
            onClick={(e) => { e.stopPropagation(); openModal(); }}
            aria-label="Play video with sound"
          >
            <div className={styles.playButton}>
              <div className={styles.background}>
                <div className={styles.overlayshadow} />
                <img className={styles.svgIcon} alt="" src={asset("/SVG.svg")} />
                <div className={styles.border} />
                <div className={styles.border2} />
              </div>
            </div>
          </button>
          <div className={styles.durationBadge}>
            <b className={styles.b5}>٣٠ ثانية</b>
            <div className={styles.background2} />
          </div>
        </div>
        <section className={styles.benefitsContainer}>
          <div className={styles.frameGroup}>
            {frameComponentItems.map((item, index) => (
              <FrameComponent
                key={index}
                frameDivJustifyContent={item.frameDivJustifyContent}
                frameDivBorderLeft={item.frameDivBorderLeft}
                frameDivGridRow={item.frameDivGridRow}
                prop={item.prop}
                letsIconsdimondAlt={item.letsIconsdimondAlt}
              />
            ))}
          </div>
          <a
            href={oneLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.paragraphbackgroundshadow}
          >
            <div className={styles.div6}>
              إذا كنت تبحث عن مغاسل ملابس التطبيق يختصرها لك
              <br />
              <b>حمل التطبيق الان</b>
            </div>
          </a>
        </section>
      </div>
      {isModalOpen &&
        createPortal(
          <div
            className={styles.videoModalOverlay}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
          >
            <button
              type="button"
              className={styles.videoModalClose}
              onClick={closeModal}
              aria-label="Close video"
            >
              ×
            </button>
            <div
              className={styles.videoModalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                className={styles.videoModalPlayer}
                src={asset("/hero-video.mp4")}
                poster={asset("/hero-video-poster.jpg")}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default HeroSection;
