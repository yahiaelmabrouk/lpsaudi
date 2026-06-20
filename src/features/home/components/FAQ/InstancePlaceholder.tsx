import { FunctionComponent } from "react";
import { asset } from "@/lib/asset";
import styles from "./InstancePlaceholder.module.css";

export type InstancePlaceholderType = {
  className?: string;
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

const InstancePlaceholder: FunctionComponent<InstancePlaceholderType> = ({
  className = "",
  question,
  answer,
  isOpen = false,
  onToggle,
}) => {
  return (
    <section
      className={[styles.questionCardAr, className].join(" ")}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle?.()}
      aria-expanded={isOpen}
    >
      <img
        className={[styles.instancePlaceholderIcon, isOpen ? styles.iconOpen : ""].join(" ")}
        alt=""
        src={asset("/241@2x.png")}
      />
      <div className={styles.questionContent}>
        <div className={styles.doYouClean}>{question}</div>
        {isOpen && (
          <div className={styles.yesourSpecialCare}>{answer}</div>
        )}
      </div>
    </section>
  );
};

export default InstancePlaceholder;
