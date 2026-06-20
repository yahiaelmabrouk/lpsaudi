import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "@/features/home/HomePage";
import { initAppsFlyer } from "@/lib/appsflyer";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  // Start AppsFlyer Smart Script on first mount. Polls until the deferred
  // CDN script has loaded, then generates the OneLink URL from URL params.
  useEffect(() => {
    initAppsFlyer();
  }, []);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MainLayout>
  );
}
export default App;
