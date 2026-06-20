export const asset = (p: string): string =>
  `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
