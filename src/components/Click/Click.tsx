import { FunctionComponent } from "react";
import styles from "./Click.module.css";

export type ClickType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const Click: FunctionComponent<ClickType> = ({
  className = "",
  property1 = "Default",
}) => {
  return (
    <div
      className={[styles.click, className].join(" ")}
      data-property1={property1}
    >
      <div className={styles.click2}>EN</div>
    </div>
  );
};

export default Click;
