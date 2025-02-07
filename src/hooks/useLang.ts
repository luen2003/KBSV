import { LIST_LANGUAGES } from "@constants/common";
import type { ICommon } from "@types";
import { useTranslation } from "react-i18next";

const useLang = () => {
  const { i18n } = useTranslation();

  const handleChangeLang = (option: ICommon.IOption) => {
    const newLang = LIST_LANGUAGES.find((langE) => langE.id === option.id);
    if (newLang) i18n.changeLanguage(newLang.id);
  };

  return {
    lang:
      LIST_LANGUAGES.find((lE) => i18n.language === lE.id) ?? LIST_LANGUAGES[0],
    handleChangeLang
  };
};

export default useLang;
