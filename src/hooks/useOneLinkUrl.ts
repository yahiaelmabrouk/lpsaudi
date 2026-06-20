import { useEffect, useState } from "react";
import { ONELINK_FALLBACK } from "@/lib/appsflyer";

// Returns the AppsFlyer OneLink URL with attribution params when available,
// or the plain fallback URL while the script is still loading.
export function useOneLinkUrl(): string {
  const [url, setUrl] = useState<string>(
    () => window.__AF_ONELINK ?? ONELINK_FALLBACK
  );

  useEffect(() => {
    // Already resolved before this component mounted
    if (window.__AF_ONELINK) {
      setUrl(window.__AF_ONELINK);
      return;
    }

    const handler = (e: Event) => {
      const { clickURL } = (e as CustomEvent<{ clickURL: string | null }>).detail;
      if (clickURL) setUrl(clickURL);
    };
    window.addEventListener("af-onelink-ready", handler);
    return () => window.removeEventListener("af-onelink-ready", handler);
  }, []);

  return url;
}
