import { FunctionComponent } from "react";
import { asset } from "@/lib/asset";
import styles from "./CarpetTypes.module.css";

const CarpetTypes: FunctionComponent = () => {
  return (
    <section className={styles.carpetTypes} dir="rtl">
      <div className={styles.container}>
        <div className={styles.textSection}>
          <div className={styles.headerGroup}>
            <div className={styles.badge}>
              <b className={styles.badgeText}>الأنواع</b>
            </div>
            <h2 className={styles.title}>
              <span>{`نخدم جميع أنواع `}</span>
              <span className={styles.accentWord}>السجاد</span>
            </h2>
          </div>
          <div className={styles.typesList}>
            <div className={styles.typeItem}>زوالي وممرات ومدّات</div>
            <div className={styles.typeItem}>سجاد تركي وبلجيكي</div>
            <div className={styles.typeItem}>سجاد يدوي وصوف</div>
            <div className={styles.typeItem}>سجاد ثقيل وكبير الحجم</div>
          </div>
        </div>
        <img
          className={styles.mascotImage}
          loading="lazy"
          alt=""
          src={asset("/Layer-5.svg")}
        />
      </div>
    </section>
  );
};

export default CarpetTypes;
