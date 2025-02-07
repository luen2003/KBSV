import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import tEn from "./locales/en/en.json";
import tVi from "./locales/vi/vi.json";

const currentLanguage = localStorage.getItem("i18nextLng");
let language = "vi";

if (currentLanguage) {
  language = currentLanguage;
}

export const resources = {
  vi: { ...tVi },
  en: { ...tEn }
} as const;

i18n.use(initReactI18next).use(LanguageDetector).init({
  lng: language,
  fallbackLng: "vi",
  resources
});

export default i18n;
