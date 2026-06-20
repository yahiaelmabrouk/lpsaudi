import { FunctionComponent } from "react";
import { useOneLinkUrl } from "@/hooks/useOneLinkUrl";
import { asset } from "@/lib/asset";
import styles from "./Pricing.module.css";

export type PricingType = {
  className?: string;
};

const Pricing: FunctionComponent<PricingType> = ({ className = "" }) => {
  const oneLinkUrl = useOneLinkUrl();
  return (
    <div className={[styles.pricing, className].join(" ")}>
      <div className={styles.pricingContent}>
        <div className={styles.background}>
          <b className={styles.b}>التسعيرة</b>
        </div>
        <h2 className={styles.h2}>
          <span>{`كم سعر غسيل وتنظيف `}</span>
          <span className={styles.span}>السجاد</span>
          <span>{`؟`}</span>
        </h2>
      </div>
      <div className={styles.priceInfo}>
        <img
          className={styles.asset21}
          loading="lazy"
          alt=""
          src={asset("/Asset-2-1.svg")}
        />
        <div className={styles.pricingTitlesParent}>
          <div className={styles.pricingTitles}>
            <div className={styles.div}>تسعيرة فورية وشفافة</div>
          </div>
          <a
            href={oneLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <b className={styles.b2}>
            افتح التسعيرة الآن داخل التطبيق
            </b>
            <b className={styles.b2}>حمل التطبيق الان</b>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
