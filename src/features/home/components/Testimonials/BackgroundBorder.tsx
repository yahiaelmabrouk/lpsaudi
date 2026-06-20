import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { asset } from "@/lib/asset";
import styles from "./BackgroundBorder.module.css";

export type BackgroundBorderType = {
  className?: string;
  sVG?: string;
  appStore?: string;
  prop?: string;
  prop1?: string;
  extraStar?: string;
  extraStarColor?: CSSProperties["color"];
  reviewCount?: string;

  /** Style props */
  backgroundBorderBackgroundColor?: CSSProperties["backgroundColor"];
  backgroundBorderBorder?: CSSProperties["border"];
  appStoreColor?: CSSProperties["color"];
  bColor?: CSSProperties["color"];
  h3Color?: CSSProperties["color"];
  divColor?: CSSProperties["color"];
};

const BackgroundBorder: FunctionComponent<BackgroundBorderType> = ({
  className = "",
  backgroundBorderBackgroundColor,
  backgroundBorderBorder,
  sVG,
  appStore,
  appStoreColor,
  prop,
  bColor,
  prop1,
  h3Color,
  divColor,
  extraStar,
  extraStarColor,
  reviewCount = "32",
}) => {
  const backgroundBorderStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: backgroundBorderBackgroundColor,
      border: backgroundBorderBorder,
    };
  }, [backgroundBorderBackgroundColor, backgroundBorderBorder]);

  const appStoreStyle: CSSProperties = useMemo(() => {
    return {
      color: appStoreColor,
    };
  }, [appStoreColor]);

  const bStyle: CSSProperties = useMemo(() => {
    return {
      color: bColor,
    };
  }, [bColor]);

  const h3Style: CSSProperties = useMemo(() => {
    return {
      color: h3Color,
    };
  }, [h3Color]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      color: divColor,
    };
  }, [divColor]);

  return (
    <div
      className={[styles.backgroundborder, className].join(" ")}
      style={backgroundBorderStyle}
    >
      <div className={styles.logosCombined}>
        <img className={styles.svgIcon} alt="" src={sVG ? asset(sVG) : undefined} />
        <div className={styles.appStore} style={appStoreStyle}>
          {appStore}
        </div>
      </div>
      <div className={styles.ratingBox}>
        <div className={styles.ratingMarks}>
          <b className={styles.b} style={bStyle}>
            {extraStar && (
              <span style={{ color: extraStarColor }}>{extraStar}</span>
            )}
            {prop}
          </b>
          <h3 className={styles.h3} style={h3Style}>
            {prop1}
          </h3>
        </div>
        <div className={styles.div} style={divStyle}>
          <span>{reviewCount}</span><span>تقييمًا من العملاء</span>
        </div>
      </div>
    </div>
  );
};

export default BackgroundBorder;
