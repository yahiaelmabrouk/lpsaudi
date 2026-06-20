import { FunctionComponent, useRef, useEffect } from "react";
import BackgroundBorder from "./BackgroundBorder";
import { getStoreUrl } from "@/lib/storeLinks";
import { asset } from "@/lib/asset";
import styles from "./Testimonials.module.css";

export type TestimonialsType = {
  className?: string;
};

type Review = {
  name: string;
  location: string;
  letter: string;
  color: string;
  platform: "app_store" | "google_play";
  text: string;
  time: string;
};

const reviews: Review[] = [
  { name: "عبدالله الدوسري", location: "جدة - حي السلامة", letter: "ع", color: "#00BCD4", platform: "app_store", text: "جربتهم في سجاد المجلس، والصراحة فرق واضح. رجع أنظف وفيه ريحة نظافة حلوة، وكمان التزامهم بالموعد ممتاز.", time: "منذ 3 أيام" },
  { name: "نورة القحطاني", location: "جدة - حي الشاطئ", letter: "ن", color: "#F07427", platform: "google_play", text: "كان عندي سجاد فاتح وكنت متخوفة من النتيجة، لكن رجع نظيف بشكل يفرّح. الخدمة سهلة وما فيها أي تعقيد.", time: "منذ 5 أيام" },
  { name: "خالد الزهراني", location: "جدة - حي النهضة", letter: "خ", color: "#8A2BE2", platform: "app_store", text: "غسلت عندهم سجادة كبيرة للمجلس، والنتيجة بصراحة ممتازة. النظافة واضحة من أول نظرة والتوصيل كان مرتب.", time: "منذ يومين" },
  { name: "سارة الغامدي", location: "جدة - حي الصفا", letter: "س", color: "#00C978", platform: "google_play", text: "السجادة التركية عندي كان فيها كم بقعة، وبعد التنظيف فرقها واضح. التطبيق سهل والخدمة مريحة.", time: "منذ ٣ أيام" },
  { name: "محمد العتيبي", location: "جدة - حي الروضة", letter: "م", color: "#1E60F6", platform: "app_store", text: "أرسلت لهم سجادة ومشاية، وكلها رجعت بشكل مرتب ونظيف. الصراحة وفّروا علي مشوار وتعب.", time: "منذ 4 أيام" },
  { name: "ريم الحربي", location: "جدة - حي الزهراء", letter: "ر", color: "#E91E63", platform: "google_play", text: "أكثر شيء عجبني إن السجاد رجع نظيف ومرتب مرة. واضح إنهم يهتمون بالشغل من قلب.", time: "منذ يوم" },
  { name: "فيصل المالكي", location: "جدة - حي أبحر الشمالية", letter: "ف", color: "#4CAF50", platform: "app_store", text: "غسلت عندهم سجادة كبيرة للمجلس، والنتيجة كانت أحسن من اللي توقعتها. اللون صار أوضح والتنظيف باين.", time: "منذ 6 أيام" },
  { name: "دلال الشهري", location: "جدة - حي النعيم", letter: "د", color: "#FF9800", platform: "google_play", text: "جربتهم في سجاد الصالة، والفرق كان واضح جداً. حتى الريحة كانت حلوة وتحس السجادة انتعشت.", time: "منذ 4 أيام" },
  { name: "تركي المطيري", location: "جدة - حي المحمدية", letter: "ت", color: "#795548", platform: "app_store", text: "عندي سجادة ثقيلة وكنت مستثقل موضوع نقلها، لكن الخدمة مرّة مريحة. رجعت نظيفة ومرتبة بشكل ممتاز.", time: "منذ 7 أيام" },
  { name: "أروى البلوي", location: "جدة - حي البساتين", letter: "أ", color: "#9C27B0", platform: "google_play", text: "طلبت تنظيف سجادتين ومشاية، وكلها رجعت نظيفة بشكل واضح. كل شيء كان مرتب من البداية للنهاية.", time: "منذ يومين" },
  { name: "مازن القرني", location: "جدة - حي الخالدية", letter: "م", color: "#3F51B5", platform: "app_store", text: "جربتهم أول مرة في سجاد المجلس، والصراحة ما خاب ظني. الشغل نظيف والتعامل محترم.", time: "منذ 8 أيام" },
  { name: "هناء اليامي", location: "جدة - حي الربوة", letter: "ه", color: "#009688", platform: "google_play", text: "السجاد عندي رجع أنظف من قبل بكثير، خصوصاً الأطراف والزوايا. مرة عجبتني النتيجة.", time: "منذ 10 أيام" },
  { name: "وليد الغامدي", location: "جدة - حي الفيصلية", letter: "و", color: "#607D8B", platform: "app_store", text: "السجاد عندي رجع أنظف بكثير من قبل، خصوصاً المشاية. خدمة مرتبة وتستاهل.", time: "منذ 5 أيام" },
  { name: "لمى السلمي", location: "جدة - حي السامر", letter: "ل", color: "#FF5722", platform: "google_play", text: "كنت محتاجة جهة أعتمدها في السجاد، ويبدو إني لقيتها. الخدمة ممتازة والنتيجة مرّة مرضية.", time: "منذ 9 أيام" },
  { name: "حسن باوزير", location: "جدة - حي العزيزية", letter: "ح", color: "#2196F3", platform: "app_store", text: "أرسلت سجادتين للمجلس، وكلها رجعت ممتازة. الخدمة مريحة خصوصاً للي ما عنده وقت.", time: "منذ 4 أيام" },
  { name: "شهد العمري", location: "جدة - حي الرويس", letter: "ش", color: "#CDDC39", platform: "google_play", text: "السجادة الفاتحة عندي كنت متخوفة عليها، لكن رجعت نظيفة بشكل واضح. مرة انبسطت من النتيجة.", time: "منذ 6 أيام" },
  { name: "زياد الحكمي", location: "جدة - حي النسيم", letter: "ز", color: "#673AB7", platform: "app_store", text: "غسلت سجاد البيت عندهم، والنتيجة بصراحة ممتازة. واضح إن عندهم شغل مرتب وماشيين بنظام.", time: "منذ أسبوع" },
  { name: "عبير الشريف", location: "جدة - حي الحمراء", letter: "ع", color: "#8BC34A", platform: "google_play", text: "جربتهم في سجاد الغرفة والممر، وكل شيء رجع نظيف ومرتب. التوصيل كمان كان في وقته.", time: "منذ 8 أيام" },
  { name: "رامي العسيري", location: "جدة - حي المرجان", letter: "ر", color: "#03A9F4", platform: "app_store", text: "عندي سجادة كبيرة ومشاية، وغسلوها بشكل ممتاز. النتيجة كانت واضحة من أول ما فتحتها.", time: "منذ يومين" },
  { name: "جود الثقفي", location: "جدة - حي الحمدانية", letter: "ج", color: "#FFC107", platform: "google_play", text: "السجاد رجع مرتب ونظيف، وحتى البقع اللي كنت شايلة همها خفت كثير. تجربة موفقة جداً.", time: "منذ 3 أيام" },
  { name: "سلطان الشهراني", location: "جدة - حي الواحة", letter: "س", color: "#9E9E9E", platform: "app_store", text: "غسلت عندهم سجاد المدخل والمجلس، والنتيجة مرة ممتازة. خدمة سهلة وتوفر وقت وجهد.", time: "منذ 7 أيام" },
  { name: "ميساء الزبيدي", location: "جدة - حي الفردوس", letter: "م", color: "#00BCD4", platform: "google_play", text: "السجاد عندي رجع كأنه متجدد، خاصة المدخل والمشاية. التطبيق واضح والخدمة فعلاً مريحة.", time: "منذ 5 أيام" },
  { name: "بندر الغفيلي", location: "جدة - حي الصالحية", letter: "ب", color: "#F44336", platform: "app_store", text: "جربتهم في سجاد البيت، وشغلهم ممتاز. النظافة واضحة من أول ما رجع.", time: "منذ 10 أيام" },
  { name: "فرح القيسي", location: "جدة - حي المنار", letter: "ف", color: "#4CAF50", platform: "google_play", text: "سجاد الصالة رجع نظيف مرة. عجبني إن كل شيء تم بسهولة ومن غير لخبطة.", time: "منذ أسبوع" },
  { name: "إبراهيم السبيعي", location: "جدة - حي البوادي", letter: "إ", color: "#3F51B5", platform: "app_store", text: "السجاد رجع بحالة ممتازة فعلاً، والتنظيف واضح. تجربة ممتازة من أول الطلب إلى التسليم.", time: "منذ 4 أيام" },
  { name: "رهف الجهني", location: "جدة - حي مشرفة", letter: "ر", color: "#FF9800", platform: "google_play", text: "أرسلت سجاد غرفة وجلست أتابع النتيجة، والصراحة كانت أحسن من المتوقع. الخدمة مريحة جداً للأمانة.", time: "منذ 6 أيام" },
  { name: "طلال الحازمي", location: "جدة - حي الرحاب", letter: "ط", color: "#795548", platform: "app_store", text: "جربتهم لسجادتين كبار، وكل شيء رجع مرتب ونظيف. التزامهم بالمواعيد ممتاز.", time: "منذ 8 أيام" },
  { name: "سما باعشن", location: "جدة - حي الأصالة", letter: "س", color: "#E91E63", platform: "google_play", text: "تنظيف السجاد عندهم ممتاز، خصوصاً السجاد الفاتح. فرق واضح في النظافة بعد الرجوع.", time: "منذ يوم" },
  { name: "نايف الشمراني", location: "جدة - حي الزمرد", letter: "ن", color: "#1E60F6", platform: "app_store", text: "طلبت منهم أكثر من مرة للسجاد، وكل مرة نفس الجودة. هذا الشيء اللي خلاني أعتمدهم.", time: "منذ 9 أيام" },
  { name: "هديل المولد", location: "جدة - حي الروابي", letter: "ه", color: "#9C27B0", platform: "google_play", text: "الخدمة ممتازة للسجاد. رجع نظيف ومرتب وتناسب اللي يبغى شيء مريح وسريع.", time: "منذ 7 أيام" },
  { name: "مشعل القحطاني", location: "جدة - حي الأندلس", letter: "م", color: "#607D8B", platform: "app_store", text: "عندي سجاد مجلس وتم تنظيفه بشكل ممتاز. حبيت إن الطلب واضح والتتبع فيه راحة.", time: "منذ 3 أيام" },
  { name: "لجين بافقيه", location: "جدة - حي الروضة", letter: "ل", color: "#009688", platform: "google_play", text: "أرسلت سجادتين، وكلهم رجعوا بشكل ممتاز. الخدمة سهلة والتعامل محترم.", time: "منذ أسبوع" },
  { name: "علي الزهراني", location: "جدة - حي الزهراء", letter: "ع", color: "#2196F3", platform: "app_store", text: "أرسلت سجادة ولها مشاية، وكلها رجعت نظيفة ومرتبة. بصراحة شيء يخليني أكرر التجربة.", time: "منذ يومين" },
  { name: "رغد العمودي", location: "جدة - حي البساتين", letter: "ر", color: "#8BC34A", platform: "google_play", text: "خدمة راقية وسريعة لتنظيف السجاد. سجادة الصالة عندي رجعت مرة مرتبة والنظافة واضحة.", time: "منذ 5 أيام" },
  { name: "سامي الأحمدي", location: "جدة - حي النخيل", letter: "س", color: "#673AB7", platform: "app_store", text: "أنصح فيهم للسجاد، خصوصاً اللي عنده قطع كبيرة. النتيجة ممتازة والخدمة مرتبة.", time: "منذ 10 أيام" },
  { name: "هبة الخضري", location: "جدة - حي المحمدية", letter: "ه", color: "#FF5722", platform: "google_play", text: "السجاد رجع أحسن من المتوقع. نظيف ومرتب والتعامل جداً جميل.", time: "منذ 4 أيام" },
  { name: "منصور باحارث", location: "جدة - حي الواحة", letter: "م", color: "#CDDC39", platform: "app_store", text: "جربتهم للسجاد بسبب التقييمات، والصراحة ما ندمت. السجادة رجعت نظيفة بشكل واضح.", time: "منذ 6 أيام" },
  { name: "ديما الشريف", location: "جدة - حي السليمانية", letter: "د", color: "#03A9F4", platform: "google_play", text: "أرسلت سجاد البيت، وكلها رجعت ممتازة. الخدمة مرتبة وما فيها تعقيد.", time: "منذ 8 أيام" },
  { name: "عمر الحربي", location: "جدة - حي الشرفية", letter: "ع", color: "#FFC107", platform: "app_store", text: "شغلهم مرتب جداً مع السجاد. واضح إن عندهم اهتمام بالنظافة والترتيب.", time: "منذ أسبوع" },
  { name: "نجلاء باجنيد", location: "جدة - حي الصفا", letter: "ن", color: "#9E9E9E", platform: "google_play", text: "جربت الخدمة للسجاد وكانت ممتازة. أكثر شيء عجبني سهولة الطلب ونظافة السجاد بعد الرجوع.", time: "منذ 3 أيام" },
  { name: "عبدالعزيز الغامدي", location: "جدة - حي النهضة", letter: "ع", color: "#00BCD4", platform: "app_store", text: "ممتازين للسجاد. رجع بشكل مرتب ومرة نظيف.", time: "منذ 5 أيام" },
  { name: "جمانة العتيبي", location: "جدة - حي السامر", letter: "ج", color: "#F07427", platform: "google_play", text: "أول مرة أجربهم للسجاد، وكانت تجربة مرة ناجحة. كل شيء رجع نظيف ومرتب.", time: "منذ 9 أيام" },
  { name: "باسل القرشي", location: "جدة - حي العزيزية", letter: "ب", color: "#8A2BE2", platform: "app_store", text: "من أفضل الخدمات اللي وفرت علي وقت كثير في تنظيف السجاد. المشايات والسجاد رجعوا ممتازين.", time: "منذ يومين" },
  { name: "إلهام العوفي", location: "جدة - حي الحمراء", letter: "إ", color: "#00C978", platform: "google_play", text: "النتيجة كانت جميلة مع السجاد. فعلاً خدمة مريحة وتستاهل الواحد يعتمدها.", time: "منذ أسبوع" },
  { name: "صالح باخشب", location: "جدة - حي الربوة", letter: "ص", color: "#1E60F6", platform: "app_store", text: "سجلت الطلب للسجاد، وكل شيء كان واضح. رجع نظيف ومرتب بشكل ممتاز.", time: "منذ 4 أيام" },
  { name: "تمارا الزايدي", location: "جدة - حي الفيحاء", letter: "ت", color: "#E91E63", platform: "google_play", text: "أعجبني شغلهم في تنظيف السجاد. النظافة واضحة والخدمة كلها مرتبة ومريحة.", time: "منذ 6 أيام" },
  { name: "عبدالمجيد السلمي", location: "جدة - حي الرويس", letter: "ع", color: "#4CAF50", platform: "app_store", text: "تعامل ممتاز ونتيجة جميلة مع السجاد. رجع مرتب ونظيف كأنه متجدد.", time: "منذ 8 أيام" },
  { name: "غادة الأحمدي", location: "جدة - حي الرحاب", letter: "غ", color: "#FF9800", platform: "google_play", text: "الخدمة جداً مريحة للسجاد، خاصة مع زحمة البيت. رجع نظيف ومرتب مرة.", time: "منذ 10 أيام" },
  { name: "زياد باعقيل", location: "جدة - حي البغدادية", letter: "ز", color: "#795548", platform: "app_store", text: "جودة الخدمة عالية. جربتهم في السجاد والنظافة كانت واضحة من أول نظرة.", time: "منذ 12 أيام" },
  { name: "مها الشمراني", location: "جدة - حي المرجان", letter: "م", color: "#9C27B0", platform: "google_play", text: "فعلاً تجربة ناجحة للسجاد. من أول الطلب إلى التسليم كل شيء كان سلس.", time: "منذ 14 أيام" },
  { name: "يزيد الثقفي", location: "جدة - حي أبحر الجنوبية", letter: "ي", color: "#3F51B5", platform: "app_store", text: "السجاد رجع نظيف مرة ومرتب. واضح إنهم يهتمون بالشغل.", time: "منذ أسبوعين" },
  { name: "أماني الحربي", location: "جدة - حي المروة", letter: "أ", color: "#009688", platform: "google_play", text: "الخدمة ممتازة والتعامل راقٍ. أحببت سهولة الحجز للسجاد من التطبيق وسرعة الرد.", time: "منذ 16 أيام" },
  { name: "طارق الغفيلي", location: "جدة - حي الوزيرية", letter: "ط", color: "#607D8B", platform: "app_store", text: "خدمة موثوقة للسجاد. استخدمتها أكثر من مرة وكل مرة نفس الجودة والترتيب.", time: "منذ 18 أيام" },
  { name: "ذكرى باوزير", location: "جدة - حي الجامعة", letter: "ذ", color: "#FF5722", platform: "google_play", text: "أكثر شيء عجبني في السجاد إنهم رجعوه مرتب ونظيف بشكل واضح.", time: "منذ 20 أيام" },
  { name: "رائد المطيري", location: "جدة - حي السليمانية", letter: "ر", color: "#2196F3", platform: "app_store", text: "خدمة ممتازة وتستاهل التقييم. تنظيف السجاد وفر علي تعب كبير والنتيجة كانت جميلة.", time: "منذ 21 أيام" },
  { name: "هدى القرني", location: "جدة - حي الخمرة", letter: "ه", color: "#8BC34A", platform: "google_play", text: "السجاد رجع نظيف ومرتب بشكل جميل. تجربة ممتازة بالنسبة لي.", time: "منذ 23 أيام" },
  { name: "أنس السبيعي", location: "جدة - حي قويزة", letter: "أ", color: "#673AB7", platform: "app_store", text: "مرتاح جداً للتعامل معهم في السجاد. الخدمة واضحة والنتيجة ممتازة.", time: "منذ 24 أيام" },
  { name: "نوف الجهني", location: "جدة - حي المنتزهات", letter: "ن", color: "#CDDC39", platform: "google_play", text: "من الخدمات اللي فعلاً تسهّل الحياة. السجاد رجع نظيف مرة والتطبيق مرتب.", time: "منذ 25 أيام" },
  { name: "فهد الحكمي", location: "جدة - حي مدائن الفهد", letter: "ف", color: "#03A9F4", platform: "app_store", text: "السجاد رجع نظيف بشكل ممتاز. شغلهم مرتب ويعتمد عليه.", time: "منذ 26 أيام" },
  { name: "ديانة العمري", location: "جدة - حي الثغر", letter: "د", color: "#FFC107", platform: "google_play", text: "الخدمة ممتازة للسجاد. سهلة ومريحة والنتيجة بعد التنظيف كانت مرة حلوة.", time: "منذ 27 أيام" },
  { name: "ماجد الحازمي", location: "جدة - حي الكندرة", letter: "م", color: "#9E9E9E", platform: "app_store", text: "الخدمة مريحة جداً. السجاد رجع مرتب ونظيف والتجربة كلها كانت ممتازة.", time: "منذ 28 أيام" },
  { name: "جنى العوفي", location: "جدة - حي النزلة اليمانية", letter: "ج", color: "#F44336", platform: "google_play", text: "أعجبني مستوى الخدمة والمتابعة. السجاد رجع مرتب ونظيف.", time: "منذ 29 أيام" },
  { name: "يزن المالكي", location: "جدة - حي البلد", letter: "ي", color: "#4CAF50", platform: "app_store", text: "التجربة كانت سلسة من البداية للنهاية. السجاد رجع نظيف جداً.", time: "منذ شهر" },
  { name: "روان الشريف", location: "جدة - حي الهنداوية", letter: "ر", color: "#3F51B5", platform: "app_store", text: "تنظيف السجاد ممتاز والتعامل راقٍ. أحببت سهولة التطبيق ووضوح الخطوات.", time: "منذ شهر" },
  { name: "عبدالرحمن الزهراني", location: "جدة - حي الكوثر", letter: "ع", color: "#00BCD4", platform: "app_store", text: "من أحسن الخدمات اللي جربتها للسجاد. راحة وجودة ونتيجة ممتازة.", time: "منذ شهر" },
];

const CardSet = ({ setRef }: { setRef: React.Ref<HTMLDivElement> }) => (
  <div className={styles.cardsSet} ref={setRef}>
    {reviews.map((r, i) => (
      <div key={i} className={styles.cardLliq}>
        <div className={styles.containerParent}>
          <div className={styles.container}>
            {r.platform === "app_store" ? (
              <div className={styles.backgroundborder}>
                <img className={styles.svgIcon} alt="" src={asset("/SVG1.svg")} />
                <div className={styles.googlePlay}>App Store</div>
              </div>
            ) : (
              <div className={styles.backgroundborder2}>
                <img className={styles.playstoreIcon} alt="" src={asset("/Playstore1.svg")} />
                <div className={styles.googlePlay}>Google Play</div>
              </div>
            )}
            <div className={styles.container2}>
              <div className={styles.container3}>
                <b className={styles.b2}>{r.name}</b>
                <div className={styles.div}>{r.location}</div>
              </div>
              <div className={styles.background2} style={{ backgroundColor: r.color }}>
                <b className={styles.b2}>{r.letter}</b>
              </div>
            </div>
          </div>
          <b className={styles.b4}>★★★★★</b>
          <div className={styles.laundr}>{r.text}</div>
          <div className={styles.div3}>{r.time}</div>
        </div>
      </div>
    ))}
  </div>
);

const Testimonials: FunctionComponent<TestimonialsType> = ({
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);
  const set2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const set1 = set1Ref.current;
    const set2 = set2Ref.current;
    if (!track || !set1 || !set2) return;

    const halfWidth = set2.getBoundingClientRect().left - set1.getBoundingClientRect().left;

    const containerWidth = (track.parentElement as HTMLElement).offsetWidth;
    const setsNeeded = Math.ceil((containerWidth + 2 * halfWidth) / halfWidth);
    const extraClones: HTMLDivElement[] = [];
    const setTemplates = [set1, set2];
    for (let i = 2; i < setsNeeded; i++) {
      const clone = setTemplates[i % 2].cloneNode(true) as HTMLDivElement;
      track.appendChild(clone);
      extraClones.push(clone);
    }

    let offset = 0;
    let paused = false;
    let animId: number;
    const speed = 0.5;

    let isDragging = false;
    let dragStartX = 0;
    let offsetAtDragStart = 0;

    const wrapOffset = (val: number) => {
      let wrapped = val % halfWidth;
      if (wrapped > 0) wrapped -= halfWidth;
      return wrapped;
    };

    const animate = () => {
      if (!paused) {
        offset -= speed;
        if (Math.abs(offset) >= halfWidth) offset += halfWidth;
        track.style.transform = `translateX(${offset}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const onEnter = () => { if (!isDragging) paused = true; };
    const onLeave = () => { if (!isDragging) paused = false; };
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      paused = true;
      dragStartX = e.touches[0].clientX;
      offsetAtDragStart = offset;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const delta = e.touches[0].clientX - dragStartX;
      offset = wrapOffset(offsetAtDragStart + delta);
      track.style.transform = `translateX(${offset}px)`;
    };

    const onTouchEnd = () => {
      isDragging = false;
      paused = false;
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      extraClones.forEach(c => c.parentNode?.removeChild(c));
    };
  }, []);

  return (
    <div className={[styles.testimonials, className].join(" ")}>
      <section className={styles.feedbackHeaderParent}>
        <div className={styles.feedbackHeaderInner}>
          <div className={styles.feedbackHeader}>
            <BackgroundBorder
              sVG="/SVG1.svg"
              appStore="App Store"
              prop="★★★★★"
              prop1="4.9 "
              reviewCount="43"
            />
            <BackgroundBorder
              backgroundBorderBackgroundColor="#f0f7f0"
              backgroundBorderBorder="1px solid #b8ddb8"
              sVG="/Playstore.svg"
              appStore="Google Play"
              appStoreColor="#2d7d2d"
              prop="★★★★★"
              bColor="#FBBF24"
              prop1="5.0 "
              h3Color="#2d7d2d"
              divColor="#2d7d2d"
              reviewCount="40"
            />
          </div>
          <div className={styles.backgroundParent}>
            <div className={styles.background}>
              <b className={styles.b}>التقييمات</b>
            </div>
            <div className={styles.parent}>
              <h2 className={styles.h2}>
                <span>{`ماذا قالوا عن `}</span>
                <span className={styles.span}>التطبيق؟</span>
              </h2>
              <div className={styles.appStore}>
                تقييمات حقيقية من App Store و Google Play
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.cards}>
        <div className={styles.cardsTrack} ref={trackRef}>
          <CardSet setRef={set1Ref} />
          <CardSet setRef={set2Ref} />
        </div>
      </section>
      <a
        href={getStoreUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mobileCta}
      >
        <span className={styles.mobileCtaText}>حمل التطبيق الان</span>
        <img
          src={asset("/icon-arrow-right.svg")}
          alt=""
          className={styles.mobileCtaArrow}
        />
      </a>
    </div>
  );
};

export default Testimonials;
