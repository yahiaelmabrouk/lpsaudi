import { FunctionComponent, ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
import { asset } from "@/lib/asset";
import styles from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logoGroup}>
            <img className={styles.groupIcon} alt="" src={asset("/Group1.svg")} />
            <div className={styles.imageMasking}>
              <img className={styles.layer1Icon} alt="" src={asset("/Layer-1.svg")} />
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
