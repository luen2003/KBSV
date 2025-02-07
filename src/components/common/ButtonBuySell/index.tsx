import clsx from "clsx";
import { useTranslation } from "react-i18next";

const ButtonBuySell = ({
  status,
  isDerivative,
  onChange,
  disabled
}: {
  isDerivative?: boolean;
  onChange: (st: "buy" | "sell") => void;
  status: "buy" | "sell";
  disabled?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <button
        disabled={disabled}
        type="button"
        onClick={() => onChange("buy")}
        className={clsx(
          "py-2.5 px-3 rounded-s-lg font-medium text-14px cursor-pointer",
          status === "buy"
            ? "bg-color-green001 text-gray-013 disabled:bg-gray-009 disabled:text-gray-011"
            : "bg-gray-004 text-gray-013 disabled:text-gray-011"
        )}
      >
        {isDerivative ? t("footer:long") : t("stockDetail:mua")}
      </button>
      <button
        disabled={disabled}
        type="button"
        onClick={() => onChange("sell")}
        className={clsx(
          "py-2.5 px-3 rounded-e-lg text-gray-013 font-medium text-14px cursor-pointer",
          status === "sell"
            ? "bg-color-red disabled:bg-gray-009 disabled:text-gray-011"
            : "bg-gray-004 disabled:text-gray-011"
        )}
      >
        {isDerivative ? t("footer:short") : t("stockDetail:ban")}
      </button>
    </div>
  );
};

export default ButtonBuySell;
