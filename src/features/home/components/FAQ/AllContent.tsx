import { FunctionComponent, useState } from "react";
import InstancePlaceholder from "./InstancePlaceholder";
import FilterButtons from "./FilterButtons";
import styles from "./AllContent.module.css";

type Category = "all" | "orders" | "tracking" | "care" | "payment";

const FAQ_ITEMS: { question: string; answer: string; category: Category }[] = [
  {
    question: "هل أنتم مغسلة سجاد ولا وسيط؟",
    answer:
      "نحن نقدم خدمة منظمة عبر التطبيق توفر لك غسيل وتنظيف سجاد مع استلام وتسليم كامل.",
    category: "orders",
  },
  {
    question: "أنا أبحث عن مغاسل سجاد كثيرة... هل أقدر أختار؟",
    answer:
      "نعم، التطبيق يتيح لك الاختيار من بين أفضل مغاسل السجاد المعتمدة لدينا.",
    category: "orders",
  },
  {
    question: "كم مدة غسيل السجاد؟",
    answer:
      "تتراوح مدة غسيل السجاد بين 2-5 أيام عمل حسب نوع السجاد والحمل.",
    category: "tracking",
  },
  {
    question: "هل فيه تعقيم وإزالة روائح؟",
    answer:
      "نعم، نوفر خدمة التعقيم وإزالة الروائح مع كل طلب غسيل سجاد.",
    category: "care",
  },
  {
    question: "هل تنظيف سجاد بالبخار مناسب؟",
    answer:
      "البخار مناسب لأنواع معينة من السجاد، فريقنا يحدد الطريقة الأنسب لسجادتك.",
    category: "care",
  },
];

const FILTER_BUTTONS: { label: string; value: Category }[] = [
  { label: "جميع الأسئلة", value: "all" },
  { label: "الدفع والدعم", value: "payment" },
  { label: "الرعاية والجودة", value: "care" },
  { label: "التتبع والتحديثات", value: "tracking" },
  { label: "الطلبات والتوصيل", value: "orders" },
];

export type AllContentType = {
  className?: string;
};

const AllContent: FunctionComponent<AllContentType> = ({ className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const filteredItems =
    activeFilter === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className={[styles.allContent, className].join(" ")}>
      <section className={styles.faqHeader}>
        <div className={styles.background}>
          <b className={styles.b}>الأسئلة الشائعة</b>
        </div>
        <div className={styles.wrapper}>
          <h2 className={styles.h2}>
            <span>{`أسئلة شائعة عن غسيل وتنظيف `}</span>
            <span className={styles.span}>السجاد</span>
          </h2>
        </div>
      </section>
      <div className={styles.faqQuestions}>
        <div className={styles.filterOptions}>
          {FILTER_BUTTONS.map((btn) => (
            <div
              key={btn.value}
              onClick={() => {
                setActiveFilter(btn.value);
                setOpenIndex(-1);
              }}
              style={{ cursor: "pointer" }}
            >
              <FilterButtons
                clickHere={btn.label}
                property1={activeFilter === btn.value ? "Selected" : "Default"}
              />
            </div>
          ))}
        </div>
        <div className={styles.faqQuestionsChild} />
        <div className={styles.questionsContainer}>
          {filteredItems.map((item, index) => (
            <InstancePlaceholder
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllContent;
