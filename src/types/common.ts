/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export declare namespace ICommon {
  type ITheme = "light" | "dark";
  type ILanguage = "vi" | "en";

  type IOption = {
    id: number | string;
    label: string;
    value: string;
  };
  type INDEX = "30" | "HNX" | "UPCOM" | "HOSE" | "HNX30";
}

declare module "react" {
  interface HTMLAttributes<T> {
    "data-theme"?: ICommon.ITheme;
  }
}
