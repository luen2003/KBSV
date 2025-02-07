import { useTranslation } from "react-i18next";

export default function NoDocuments() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full min-h-full w-full justify-center items-center flex-col">
      <img src="/noDocuments.svg" className="w-48" alt="noDocuments" />
      <p className="text-14px">{t("common:noDocuments")}</p>
    </div>
  );
}
