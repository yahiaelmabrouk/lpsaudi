import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { asset } from "@/lib/asset";
import styles from "./NeighborhoodContainer.module.css";

export type NeighborhoodContainerType = {
  className?: string;
  prop?: string;
  unionSrc?: string;
  unionTransform?: CSSProperties["transform"];
  unionContainerTransform?: CSSProperties["transform"];

  /** Style props */
  neighborhoodContainerPadding?: CSSProperties["padding"];
  neighborhoodContainerMarginLeft?: CSSProperties["marginLeft"];
  groupDivWidth?: CSSProperties["width"];
  groupIconLeft?: CSSProperties["left"];
  unionBackground?: CSSProperties["background"];
  polygonIconLeft?: CSSProperties["left"];
  rectangleDivWidth?: CSSProperties["width"];
};

const NeighborhoodContainer: FunctionComponent<NeighborhoodContainerType> = ({
  className = "",
  neighborhoodContainerPadding,
  neighborhoodContainerMarginLeft,
  groupDivWidth,
  groupIconLeft,
  unionBackground,
  polygonIconLeft,
  rectangleDivWidth,
  unionSrc = "/Union1.svg",
  unionTransform,
  unionContainerTransform,
  prop,
}) => {
  const neighborhoodContainerStyle: CSSProperties = useMemo(() => {
    return {
      padding: neighborhoodContainerPadding,
      marginLeft: neighborhoodContainerMarginLeft,
    };
  }, [neighborhoodContainerPadding, neighborhoodContainerMarginLeft]);

  const groupDivStyle: CSSProperties = useMemo(() => {
    return {
      width: groupDivWidth,
    };
  }, [groupDivWidth]);

  const groupIconStyle: CSSProperties = useMemo(() => {
    return {
      left: groupIconLeft,
    };
  }, [groupIconLeft]);

  const unionStyle: CSSProperties = useMemo(() => {
    return {
      background: unionBackground,
    };
  }, [unionBackground]);

  const polygonIconStyle: CSSProperties = useMemo(() => {
    return {
      left: polygonIconLeft,
    };
  }, [polygonIconLeft]);

  const rectangleDivStyle: CSSProperties = useMemo(() => {
    return {
      width: rectangleDivWidth,
    };
  }, [rectangleDivWidth]);

  return (
    <div
      className={[styles.neighborhoodContainer, className].join(" ")}
      style={neighborhoodContainerStyle}
    >
      <div className={styles.frameParent} style={groupDivStyle}>
        <img
          className={styles.frameChild}
          alt=""
          src={asset("/Group-81.svg")}
          style={groupIconStyle}
        />
        <div
          className={styles.unionParent}
          style={
            unionContainerTransform
              ? { transform: unionContainerTransform }
              : undefined
          }
        >
          <img
            className={styles.unionIcon}
            alt=""
            src={asset(unionSrc)}
            style={unionTransform ? { transform: unionTransform } : undefined}
          />
          <div className={styles.nahdaContent}>
            <div className={styles.wrapper}>
              <div className={styles.div}>{prop}</div>
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
  );
};

export default NeighborhoodContainer;
