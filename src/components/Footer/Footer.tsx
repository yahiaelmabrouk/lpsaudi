import { FunctionComponent } from "react";
import { useOneLinkUrl } from "@/hooks/useOneLinkUrl";
import { asset } from "@/lib/asset";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  const oneLinkUrl = useOneLinkUrl();
  return (
    <section className={[styles.footer, className].join(" ")}>
      <h1 className={styles.h1}>
        <span>{`جاهز ترجع `}</span>
        <span className={styles.span}>سجادك</span>
        <span> نظيف بدون تعب؟</span>
      </h1>
      <div className={styles.footerAw}>
        <div className={styles.bodyWrapper}>
          <div className={styles.body}>
            <img className={styles.groupIcon} alt="" src={asset("/Group2.svg")} />
            <img className={styles.bodyChild} alt="" src={asset("/Group-22.svg")} />
          </div>
        </div>
        <div className={styles.hands}>
          <img className={styles.groupIcon2} alt="" src={asset("/Group3.svg")} />
          <img className={styles.groupIcon2} alt="" src={asset("/Group.svg")} />
        </div>
        <div className={styles.callToActionAreaWrapper}>
          <div className={styles.callToActionArea}>
            <div className={styles.wrapper}>
              <div className={styles.div}>
                <span>
                  <img src={asset("/star.png")} alt="star" className={styles.starIcon} />{" "}
                  مغسلة ملابس موثوقة في{" "}
                </span>
                <span className={styles.span}>جدة</span>
              </div>
            </div>
            <div className={styles.downloadDetails}>
              <h2 className={styles.h2}>
                <span>{` أول طلب؟ خله يبدأ `}</span>
                <span className={styles.span}>اليوم</span>
              </h2>
              <div className={styles.laundryHeroesContainer}>
                <span>{`حمّل تطبيق `}</span>
                <b>{`Laundry Heroes `}</b>
                <span>{`واطلب `}</span>
                <b>غسيل وكي الملابس</b>
                <span> في جدة مع استلام وتسليم لباب.</span>
              </div>
            </div>
            <div className={styles.downloadLinks}>
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
                  <div className={styles.storeSubtitle}>GET IT ON</div>
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
            <img
              className={styles.vis0621}
              loading="lazy"
              alt=""
              src={asset("/Vis-06-2-1-optimized.webp")}
            />
          </div>
        </div>
      </div>
      <section className={styles.footerFooter}>
        <div className={styles.paragraph}>
          <span>
            غسيل الملابس في جدة | مغسلة ملابس | غسيل وكي الملابس | خدمات غسيل الملابس
          </span>
          <span> - أبطال الغسيل</span>
        </div>
        <div className={styles.paragraph2}>
          خدمة استلام وتسليم للباب داخل جدة | تواصل عبر واتساب
        </div>
        <div className={styles.container}>
          <div className={styles.laundryHeroes}>
            © 2026 أبطال الغسيل. جميع الحقوق محفوظة.
          </div>
        </div>
      </section>
    </section>
  );
};

export default Footer;
