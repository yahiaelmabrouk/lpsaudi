import { FunctionComponent } from "react";
import styles from "./FilterButtons.module.css";

export type FilterButtonsType = {
  className?: string;
  clickHere?: string;

  /** Variant props */
  property1?: string;
};

const FilterButtons: FunctionComponent<FilterButtonsType> = ({
  className = "",
  property1 = "Default",
  clickHere,
}) => {
  return (
    <div
      className={[styles.root, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.clickHere}>{clickHere}</div>
    </div>
  );
};

export default FilterButtons;
