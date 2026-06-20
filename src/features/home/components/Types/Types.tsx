import { FunctionComponent } from "react";
import { asset } from "@/lib/asset";
import styles from "./Types.module.css";

export type TypesType = {
  className?: string;
};

const Types: FunctionComponent<TypesType> = ({ className = "" }) => {
  return (
    <div className={[styles.types, className].join(" ")}>
      <div className={styles.typeContainer}>
        <img
          className={styles.layer5Icon}
          loading="lazy"
          alt=""
          src={asset("/Layer 7.png")}
        />
        <section className={styles.typesInfo}>
          <div className={styles.backgroundParent}>
            <div className={styles.background}>
              <b className={styles.b}>الخدمات</b>
            </div>
            <div className={styles.typesDescription}>
              <h2 className={styles.h2}>
                <span>{`اختر مهمة `}</span>
                <span className={styles.span}>بطلك</span>
              </h2>
            </div>
          </div>
          <div className={styles.carpetCategories}>
            <div className={styles.carpetCategoriesInner}>
              <div className={styles.parent}>
                <div className={styles.div}>غسيل وكوي</div>
                <div className={styles.div2}>للاستخدام اليومي، يتم التعامل معه بعناية.</div>
              </div>
            </div>
            <div className={styles.carpetCategoriesInner}>
              <div className={styles.parent}>
                <div className={styles.div}>كوي فقط</div>
                <div className={styles.div2}>لمظهر مكوي ونظيف دائما</div>
              </div>
            </div>
            <div className={styles.frameDiv}>
              <div className={styles.parent}>
                <div className={styles.div}>تنظيف جاف</div>
                <div className={styles.div2}>للقطَع الحسّاسة والبدل</div>
              </div>
            </div>
            <div className={styles.carpetCategoriesInner}>
              <div className={styles.parent}>
                <div className={styles.div}>عناية خاصة</div>
                <div className={styles.div2}>الثوب، الفساتين، وملابس الأطفال</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Types;
