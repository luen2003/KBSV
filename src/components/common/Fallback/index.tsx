import { type FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";

import Buttons from "../Buttons";

export default ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();
  if (error) {
    console.error(error);
  }

  return (
    <div className="bg-gray-004 text-gray-013">
      <div
        className="flex w-[100vw] h-[100vh] flex-col items-center justify-center gap-6"
        role="alert"
      >
        <p>{t("toastErrorException:base")}</p>
        <pre className="bg-gray-006 p-6 rounded-md text-color-red">{error.message}</pre>
        <Buttons size="XL" prop="Outlined" onClick={resetErrorBoundary}>
          {t("home:retry")}
        </Buttons>
      </div>
    </div>
  );
};
