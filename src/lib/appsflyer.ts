// Plain OneLink URL — used as fallback when the Smart Script hasn't run yet
// (script still loading, CDN unreachable, no gclid in URL).
// OneLink still routes iOS → App Store, Android → Play Store automatically.
export const ONELINK_FALLBACK = "https://laundry-heroes.onelink.me/Ag7z";

function init(): void {
  if (!window.AF_SMART_SCRIPT) return;

  const result = window.AF_SMART_SCRIPT.generateOneLinkURL({
    oneLinkURL: ONELINK_FALLBACK,
    webReferrer: "af_channel",
    afParameters: {
      mediaSource: { keys: ["utm_source"], defaultValue: "googleads_int" },
      campaign:    { keys: ["utm_campaign"], defaultValue: "Sub-Services-EN" },
      afSub1:      { keys: ["gclid"] },
      afCustom:    [{ paramKey: "af_ss_ui", defaultValue: "true" }],
    },
  });

  window.__AF_ONELINK = (result && result.clickURL) || null;
  window.dispatchEvent(
    new CustomEvent("af-onelink-ready", {
      detail: { clickURL: window.__AF_ONELINK },
    })
  );
}

// Poll until the CDN script has loaded, then initialize.
// Gives up after ~5 s; buttons fall back to ONELINK_FALLBACK gracefully.
export function initAppsFlyer(): void {
  let attempts = 0;
  const timer = setInterval(() => {
    attempts++;
    if (window.AF_SMART_SCRIPT) {
      clearInterval(timer);
      init();
    } else if (attempts >= 50) {
      clearInterval(timer);
    }
  }, 100);
}
