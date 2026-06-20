import { FunctionComponent } from "react";
import styles from "./ServiceIntro.module.css";

const ServiceIntro: FunctionComponent = () => {
  return (
    <section className={styles.serviceIntro} dir="rtl" aria-labelledby="service-intro-title">
      <div className={styles.content}>
        <div className={styles.badge}>
          <b>مغسلة سجاد جدة</b>
        </div>
        <h2 id="service-intro-title" className={styles.title}>
          عن خدمة غسيل وتنظيف <span>السجاد في جدة</span>
        </h2>
        <div className={styles.copyGrid}>
          <p className={styles.copy}>
            أبطال الغسيل هي مغسلة سجاد في جدة تقدم خدمة غسيل سجاد وتنظيف سجاد متكاملة مع
            استلام وتوصيل للباب. سواء كنت تبحث عن مغسلة سجاد قريبة منك، أو مكان غسيل السجاد
            بأسعار واضحة، أو تنظيف سجاد قريب مني داخل أحياء جدة، نوفر لك تجربة سهلة من تطبيق
            واحد. نخدم جميع أنواع السجاد — التركي، البلجيكي، اليدوي، الصوف، السجاد الثقيل
            وكبير الحجم، الزوالي، الممرات والمدّات — مع خيارات غسيل سجاد جاف وغسيل بالبخار
            حسب نوع القطعة.
          </p>
          <p className={styles.copy}>
            تختلف اسعار غسيل السجاد في المغسلة حسب نوع السجاد وحجمه، وعندنا تسعيرة شفافة قبل
            تأكيد الطلب فتعرف التكلفة بالضبط. خدمة مغسلة سجاد توصيل عندنا تشمل غسيل سجاد
            توصيل جدة لكل أحياء المدينة. اطلب غسيل سجاد في جدة من أبطال الغسيل — افضل مغسله
            سجاد بحسب تقييمات العملاء على App Store و Google Play.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;
