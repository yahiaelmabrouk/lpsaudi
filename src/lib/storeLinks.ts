export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.laundryheroes.app";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/laundry-heroes-laundromat-wash/id6755850167";

export function getStoreUrl(): string {
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod|Macintosh/.test(ua) && "ontouchend" in document) {
    return APP_STORE_URL;
  }
  if (/android/i.test(ua)) {
    return GOOGLE_PLAY_URL;
  }
  // Default to App Store on unknown (most KSA users are iOS)
  return APP_STORE_URL;
}
