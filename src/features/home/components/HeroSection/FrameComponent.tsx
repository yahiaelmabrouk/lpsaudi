import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
  prop?: string;
  letsIconsdimondAlt?: string;

  /** Style props */
  frameDivJustifyContent?: CSSProperties["justifyContent"];
  frameDivBorderLeft?: CSSProperties["borderLeft"];
  frameDivGridRow?: CSSProperties["gridRow"];
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  frameDivJustifyContent,
  frameDivBorderLeft,
  frameDivGridRow,
  prop,
  letsIconsdimondAlt,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      justifyContent: frameDivJustifyContent,
      borderLeft: frameDivBorderLeft,
      gridRow: frameDivGridRow,
    };
  }, [frameDivJustifyContent, frameDivBorderLeft, frameDivGridRow]);

  return (
    <div
      className={[styles.rectangleParent, className].join(" ")}
      style={frameDivStyle}
    >
      <div className={styles.frameChild} />
      <div className={styles.div}>{prop}</div>
      <img
        className={styles.letsIconsdimondAlt}
        alt=""
        src={letsIconsdimondAlt}
      />
    </div>
  );
};

export default FrameComponent;
