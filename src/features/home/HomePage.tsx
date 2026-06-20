import { FunctionComponent } from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import CarpetTypes from "./components/CarpetTypes/CarpetTypes";
import Types from "./components/Types/Types";
import Pricing from "./components/Pricing/Pricing";
import LocationMap from "./components/LocationMap/LocationMap";
import Testimonials from "./components/Testimonials/Testimonials";
import ServiceIntro from "./components/ServiceIntro/ServiceIntro";
import AllContent from "./components/FAQ/AllContent";
import { asset } from "@/lib/asset";
import styles from "./HomePage.module.css";

const HomePage: FunctionComponent = () => {
  return (
    <>
      <img className={styles.vector5} alt="" src={asset("/Vector-5.svg")} />
      <img className={styles.vector6} alt="" src={asset("/Vector-5.svg")} />
      <section className={styles.allContent}>
        <HeroSection />
        <CarpetTypes />
        <Pricing />
        <LocationMap />
        <Testimonials />
        <AllContent />
      </section>
    </>
  );
};

export default HomePage;
