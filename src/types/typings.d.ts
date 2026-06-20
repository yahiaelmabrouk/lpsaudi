/// <reference types="vite/client" />

declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

interface Window {
  AF_SMART_SCRIPT?: {
    generateOneLinkURL: (config: unknown) => { clickURL: string } | null;
  };
  __AF_ONELINK?: string | null;
}
