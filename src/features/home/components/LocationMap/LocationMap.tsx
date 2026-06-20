import { FunctionComponent } from "react";
import NeighborhoodContainer from "./NeighborhoodContainer";
import { asset } from "@/lib/asset";
import styles from "./LocationMap.module.css";

export type LocationMapType = {
  className?: string;
};

const LocationMap: FunctionComponent<LocationMapType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.locationMap, className].join(" ")}>
      <div className={styles.locationMapInner}>
        <section className={styles.map}>
          <img className={styles.vectorIcon} alt="" src={asset("/Vector.svg")} />
          <img className={styles.vectorIcon2} alt="" src={asset("/Vector1.svg")} />
          <NeighborhoodContainer
            prop="النهضة"
            unionSrc="/Union1.svg"
            unionTransform="scaleY(-1)"
            unionContainerTransform="translateX(-7px)"
          />
          <div className={styles.mapInner}>
            <div className={styles.frameParent}>
              <img className={styles.frameChild} alt="" src={asset("/Group-371.svg")} />
              <div className={styles.unionParent}>
                <img className={styles.unionIcon} alt="" src={asset("/Union1.svg")} />
                <div className={styles.rawdaContent}>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>الروضة</div>
                  </div>
                  <img
                    className={styles.fluentlocation28FilledIcon}
                    alt=""
                    src={asset("/fluent-location-28-filled.svg")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameGroup}>
            <div className={styles.frameContainer}>
              <img className={styles.frameItem} alt="" src={asset("/Group-81.svg")} />
              <div
                className={styles.unionGroup}
                style={{ transform: "translateX(-20px)" }}
              >
                <img
                  className={styles.unionIcon}
                  alt=""
                  src={asset("/Union1.svg")}
                  style={{ transform: "scaleY(-1)" }}
                />
                <div className={styles.frameDiv}>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>االحمدانية</div>
                  </div>
                  <img
                    className={styles.fluentlocation28FilledIcon}
                    alt=""
                    src={asset("/fluent-location-28-filled.svg")}
                  />
                </div>
              </div>
            </div>
            <img className={styles.frameInner} alt="" src={asset("/Group-81.svg")} />
            <img className={styles.groupIcon} alt="" src={asset("/Group-81.svg")} />
          </div>
          <NeighborhoodContainer
            neighborhoodContainerPadding="140px 0px 0px"
            neighborhoodContainerMarginLeft="-103px"
            groupDivWidth="111px"
            groupIconLeft="calc(50% - 23.5px)"
            unionBackground="radial-gradient(65.77% 93.75% at 37.97% 79.46%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0)) padding-box, linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)) padding-box, linear-gradient(104.75deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.25)) border-box"
            unionSrc="/Union2.svg"
            unionTransform="scaleY(-1)"
            unionContainerTransform="translateX(15px)"
            polygonIconLeft="px"
            rectangleDivWidth="111px"
            prop="الصفاء"
          />
          <div className={styles.mapChild}>
            <div className={styles.groupDiv}>
              <img className={styles.frameChild2} alt="" src={asset("/Group-371.svg")} />
              <div className={styles.unionParent}>
                <img className={styles.unionIcon} alt="" src={asset("/Union2.svg")} />
                <div className={styles.rawdaContent}>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>النسيم</div>
                  </div>
                  <img
                    className={styles.fluentlocation28FilledIcon}
                    alt=""
                    src={asset("/fluent-location-28-filled.svg")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={[styles.frameParent3, styles.shateeMarker].join(" ")}>
            <img className={styles.frameChild3} alt="" src={asset("/Group-371.svg")} />
            <div className={styles.unionParent2}>
              <img
                className={styles.unionIcon}
                alt=""
                src={asset("/Union.svg")}
                style={{ transform: "scaleX(-1)" }}
              />
              <div
                className={[styles.frameDiv, styles.shateeContent].join(" ")}
              >
                <div className={styles.wrapper}>
                  <div className={styles.div}>الشاطئ</div>
                </div>
                <img
                  className={styles.fluentlocation28FilledIcon}
                  alt=""
                  src={asset("/fluent-location-28-filled.svg")}
                />
              </div>
            </div>
          </div>
          <div className={styles.frameParent5}>
            <img className={styles.frameChild4} alt="" src={asset("/Group-371.svg")} />
            <div className={styles.unionParent3}>
              <img className={styles.unionIcon} alt="" src={asset("/Union.svg")} />
              <div
                className={[styles.frameParent6, styles.fayhaaContent].join(
                  " ",
                )}
              >
                <img
                  className={styles.fluentlocation28FilledIcon}
                  alt=""
                  src={asset("/fluent-location-28-filled.svg")}
                />
                <div className={styles.wrapper}>
                  <div className={styles.div}>الفيحاء</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mapInner2}>
            <div className={styles.frameParent7}>
              <div className={styles.frameWrapper}>
                <img
                  className={styles.frameChild5}
                  alt=""
                  src={asset("/Group-81.svg")}
                />
              </div>
              <img className={styles.frameChild5} alt="" src={asset("/Group-81.svg")} />
            </div>
          </div>
          <div className={styles.mapInner3}>
            <div className={styles.frameParent8}>
              <img className={styles.frameChild2} alt="" src={asset("/Group-371.svg")} />
              <div className={styles.unionParent}>
                <img className={styles.unionIcon} alt="" src={asset("/Union2.svg")} />
                <div className={styles.rawdaContent}>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>السلامة</div>
                  </div>
                  <img
                    className={styles.fluentlocation28FilledIcon}
                    alt=""
                    src={asset("/fluent-location-28-filled.svg")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.frameSection}>
          <div className={styles.frameParent10}>
            <div className={styles.backgroundParent}>
              <div className={styles.background}>
                <b className={styles.b}>التغطية</b>
              </div>
              <div className={styles.wrapper5}>
                <h2 className={styles.h2}>
                  <span>{`نخدم أحياء `}</span>
                  <span className={styles.span}>جدة</span>
                </h2>
              </div>
            </div>
            <div className={styles.div7}>
              هدفنا: ترجع ملابسك نظيفة ومنعشة… وتلبسها بثقة وكأنها جديدة، مو مجرد غسيل سريع.</div>
            <div className={styles.backgroundborder}>
              <div className={styles.parent}>
                <div className={styles.div8}>★★★★★</div>
                <div className={styles.div9}>5/5 (21) تقييم العملاء</div>
              </div>
              <div className={styles.container2}>
                <img className={styles.starIcon} alt="star" src={asset("/AdobeExpressPhotos_c5471b286e9c4ba695fcdd21db853b93.png")} />
              </div>
            </div>
          </div>
          <div className={styles.layer1Parent}>
            <img
              className={styles.layer1Icon}
              loading="lazy"
              alt=""
              src={asset("/Layer-11.svg")}
            />
            <div className={styles.group}>
              <div className={styles.div11}>قريباً في جميع مناطق المملكة</div>
              <div className={styles.div12}>
                الرياض، الدمام، مكة، المدينة ، القصيم، حائل وجميع مدن المملكة
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LocationMap;
