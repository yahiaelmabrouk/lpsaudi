import { FunctionComponent } from "react";
import { useOneLinkUrl } from "@/hooks/useOneLinkUrl";
import { asset } from "@/lib/asset";
import styles from "./Button1.module.css";

export type Button1Type = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const Button1: FunctionComponent<Button1Type> = ({
  className = "",
  property1 = "Default",
}) => {
  const href = useOneLinkUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.button03, className].join(" ")}
      data-property1={property1}
    >
      <img className={styles.vectorIcon} alt="" src={asset("/Vector2.svg")} />
      <img className={styles.vectorIcon2} alt="" src={asset("/Vector2.svg")} />
      <img className={styles.vectorIcon3} alt="" src={asset("/Vector2.svg")} />
      <img className={styles.vectorIcon4} alt="" src={asset("/Vector2.svg")} />
      <img className={styles.vectorIcon5} alt="" src={asset("/Vector2.svg")} />
      <div className={styles.buttonBase} />
      <div className={styles.continue}>حمّل التطبيق</div>
      <img
        className={styles.iconarrowRight}
        alt=""
        src={asset("/icon-arrow-right.svg")}
      />
    </a>
  );
};

export default Button1;
