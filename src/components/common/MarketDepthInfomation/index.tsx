import {
  priceFormatted,
  priceFormattedDerivative,
  quantityFormatted,
  quantityFormattedDerivative
} from "@helpers/board";
import { colorTopTrade } from "@helpers/topTrade";
import { type INewSymbolData } from "@interfaces/board.interfaces";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { NoDocuments } from "..";

interface Props {
  classNames?: { wrap?: string; noData?: string };
  symbolData?: INewSymbolData;
  isDerivative?: boolean;
  handleGetPrice?: (price: number | string, status: "buy" | "sell") => void;
}

const MarketDepthInfomation = ({
  classNames,
  symbolData,
  isDerivative,
  handleGetPrice
}: Props) => {
  const { t } = useTranslation();
  const cusorPointer = handleGetPrice ? "cursor-pointer" : "";

  const KLM =
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    symbolData?.V1 || symbolData?.V2 || symbolData?.V3
      ? (symbolData?.V1 || 0) + (symbolData?.V2 || 0) + (symbolData?.V3 || 0)
      : 0;
  const KLB =
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    symbolData?.U1 || symbolData?.U2 || symbolData?.U3
      ? (symbolData.U1 || 0) + (symbolData.U2 || 0) + (symbolData.U3 || 0)
      : 0;
  const colorB1 = colorTopTrade(
    symbolData?.B1 ? symbolData?.B1 : 0,
    symbolData?.RE ? symbolData?.RE : 0,
    symbolData?.CL ? symbolData?.CL : 0,
    symbolData?.FL ? symbolData?.FL : 0
  );
  const colorB2 = colorTopTrade(
    symbolData?.B2 ? symbolData?.B2 : 0,
    symbolData?.RE ? symbolData?.RE : 0,
    symbolData?.CL ? symbolData?.CL : 0,
    symbolData?.FL ? symbolData?.FL : 0
  );
  const colorB3 = colorTopTrade(
    symbolData?.B3 ? symbolData?.B3 : 0,
    symbolData?.RE ? symbolData?.RE : 0,
    symbolData?.CL ? symbolData?.CL : 0,
    symbolData?.FL ? symbolData?.FL : 0
  );
  const colorS1 = colorTopTrade(
    symbolData?.S1 ? symbolData?.S1 : 0,
    symbolData?.RE ? symbolData?.RE : 0,
    symbolData?.CL ? symbolData?.CL : 0,
    symbolData?.FL ? symbolData?.FL : 0
  );
  const colorS2 = colorTopTrade(
    symbolData?.S2 ? symbolData?.S2 : 0,
    symbolData?.RE ? symbolData?.RE : 0,
    symbolData?.CL ? symbolData?.CL : 0,
    symbolData?.FL ? symbolData?.FL : 0
  );
  const colorS3 = colorTopTrade(
    symbolData?.S3 ? symbolData?.S3 : 0,
    symbolData?.RE ? symbolData?.RE : 0,
    symbolData?.CL ? symbolData?.CL : 0,
    symbolData?.FL ? symbolData?.FL : 0
  );

  return (
    <div className={clsx("w-full p-2 h-[249px]", classNames?.wrap)}>
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
      {symbolData?.V1 || symbolData?.U1 ? (
        <div className="flex items-center gap-0.5 mb-2 relative">
          <div
            style={{ width: `${(KLM / (KLM + KLB)) * 100}%` }}
            className={`px-2 py-1 bg-color-green001 rounded-l-lg h-8`}
          ></div>
          <div
            style={{ width: `${(KLB / (KLM + KLB)) * 100}%` }}
            className={`px-2 py-1 bg-color-red001 rounded-r-lg h-8`}
          ></div>
          <p className="text-14px font-medium text-gray-013 left-2 absolute">
            {KLM
              ? isDerivative
                ? quantityFormattedDerivative(KLM)
                : quantityFormatted(KLM)
              : "-"}
          </p>
          <p className="text-14px font-medium text-gray-013 right-2 absolute">
            {KLB
              ? isDerivative
                ? quantityFormattedDerivative(KLB)
                : quantityFormatted(KLB)
              : "-"}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-0.5 mb-2">
          <div
            style={{ width: `50%` }}
            className={`px-2 py-1 bg-color-green001 rounded-l-lg`}
          >
            -
          </div>
          <div
            style={{ width: `50%` }}
            className={`px-2 py-1 bg-color-red001 rounded-r-lg text-right`}
          >
            -
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-0.5 mb-0.5">
        <div className="bg-gray-008 px-2 py-1.5 flex items-center justify-between">
          <p className="text-14px text-gray-011">{t("stockDetail:kl")}</p>
          <p className="text-14px text-gray-011">{t("stockDetail:mua")}</p>
        </div>
        <div className="px-2 py-1.5 bg-gray-008 flex items-center justify-between">
          <p className="text-14px text-gray-011">{t("stockDetail:ban")}</p>
          <p className="text-14px text-gray-011">{t("stockDetail:kl")}</p>
        </div>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
      {symbolData?.V1 || symbolData?.U1 ? (
        <div className={clsx("grid grid-cols-2 gap-0.5", cusorPointer)}>
          <div
            {...(handleGetPrice && {
              onClick: () => handleGetPrice(symbolData?.B1, "sell")
            })}
            className="bg-gray-006 relative h-[1.75rem]"
          >
            <div className="bg-transparent absolute top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-between px-2 py-1.5">
              <p className="text-14px text-gray-012">
                {symbolData?.V1
                  ? isDerivative
                    ? quantityFormattedDerivative(Number(symbolData?.V1))
                    : quantityFormatted(Number(symbolData?.V1))
                  : "-"}
              </p>
              <p
                className={`text-14px ${
                  Number(symbolData?.B1) ? colorB1 : "text-color-white"
                }`}
              >
                {symbolData?.B1
                  ? isNaN(Number(symbolData?.B1))
                    ? symbolData?.B1
                    : isDerivative
                    ? priceFormattedDerivative(Number(symbolData?.B1))
                    : priceFormatted(Number(symbolData?.B1))
                  : "-"}
              </p>
            </div>
            <div
              style={{ width: `${(Number(symbolData?.V1) / KLM) * 100}%` }}
              className="absolute bg-gray-008 right-0 top-0 bottom-0 z-10"
            />
          </div>
          <div
            {...(handleGetPrice && {
              onClick: () => handleGetPrice(symbolData?.S1, "buy")
            })}
            className={clsx("bg-gray-006 relative h-[1.75rem]", cusorPointer)}
          >
            <div className="bg-transparent absolute top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-between px-2 py-1.5">
              <p
                className={`text-14px ${
                  Number(symbolData?.S1) ? colorS1 : "text-color-white"
                }`}
              >
                {symbolData?.S1
                  ? isNaN(Number(symbolData?.S1))
                    ? symbolData?.S1
                    : isDerivative
                    ? priceFormattedDerivative(Number(symbolData?.S1))
                    : priceFormatted(Number(symbolData?.S1))
                  : "-"}
              </p>
              <p className="text-14px text-gray-012">
                {symbolData?.U1
                  ? isDerivative
                    ? quantityFormattedDerivative(Number(symbolData?.U1))
                    : quantityFormatted(Number(symbolData?.U1))
                  : "-"}
              </p>
            </div>
            <div
              style={{ width: `${(Number(symbolData?.U1) / KLB) * 100}%` }}
              className="absolute bg-gray-008 left-0 top-0 bottom-0 z-10"
            />
          </div>
          <div
            {...(handleGetPrice && {
              onClick: () => handleGetPrice(symbolData?.B2, "sell")
            })}
            className={clsx("bg-gray-006 relative h-[1.75rem]", cusorPointer)}
          >
            <div className="bg-transparent absolute top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-between px-2 py-1.5">
              <p className="text-14px text-gray-012">
                {symbolData?.V2
                  ? isDerivative
                    ? quantityFormattedDerivative(Number(symbolData?.V2))
                    : quantityFormatted(Number(symbolData?.V2))
                  : "-"}
              </p>
              <p className={`text-14px ${colorB2}`}>
                {symbolData?.B2
                  ? isDerivative
                    ? priceFormattedDerivative(Number(symbolData?.B2))
                    : priceFormatted(Number(symbolData?.B2))
                  : "-"}
              </p>
            </div>
            <div
              style={{ width: `${(Number(symbolData?.V2) / KLM) * 100}%` }}
              className="absolute bg-gray-008 right-0 top-0 bottom-0 z-10"
            />
          </div>
          <div
            {...(handleGetPrice && {
              onClick: () => handleGetPrice(symbolData?.S2, "buy")
            })}
            className={clsx("bg-gray-006 relative h-[1.75rem]", cusorPointer)}
          >
            <div className="bg-transparent absolute top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-between px-2 py-1.5">
              <p className={`text-14px ${colorS2}`}>
                {symbolData?.S2
                  ? isDerivative
                    ? priceFormattedDerivative(Number(symbolData?.S2))
                    : priceFormatted(Number(symbolData?.S2))
                  : "-"}
              </p>
              <p className="text-14px text-gray-012">
                {symbolData?.U2
                  ? isDerivative
                    ? quantityFormattedDerivative(Number(symbolData?.U2))
                    : quantityFormatted(Number(symbolData?.U2))
                  : "-"}
              </p>
            </div>
            <div
              style={{ width: `${(Number(symbolData?.U2) / KLB) * 100}%` }}
              className="absolute bg-gray-008 left-0 top-0 bottom-0 z-10"
            />
          </div>
          <div
            {...(handleGetPrice && {
              onClick: () => handleGetPrice(symbolData?.B3, "sell")
            })}
            className={clsx("bg-gray-006 relative h-[1.75rem]", cusorPointer)}
          >
            <div className="bg-transparent absolute top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-between px-2 py-1.5">
              <p className="text-14px text-gray-012">
                {symbolData?.V3
                  ? isDerivative
                    ? quantityFormattedDerivative(Number(symbolData?.V3))
                    : quantityFormatted(Number(symbolData?.V3))
                  : "-"}
              </p>
              <p className={`text-14px ${colorB3}`}>
                {symbolData?.B3
                  ? isDerivative
                    ? priceFormattedDerivative(Number(symbolData?.B3))
                    : priceFormatted(Number(symbolData?.B3))
                  : "-"}
              </p>
            </div>
            <div
              style={{ width: `${(Number(symbolData?.V3) / KLM) * 100}%` }}
              className="absolute bg-gray-008 right-0 top-0 bottom-0 z-10"
            />
          </div>
          <div
            {...(handleGetPrice && {
              onClick: () => handleGetPrice(symbolData?.S3, "buy")
            })}
            className={clsx("bg-gray-006 relative h-[1.75rem]", cusorPointer)}
          >
            <div className="bg-transparent absolute top-0 right-0 left-0 bottom-0 z-20 flex items-center justify-between px-2 py-1.5">
              <p className={`text-14px ${colorS3}`}>
                {symbolData?.S3
                  ? isDerivative
                    ? priceFormattedDerivative(Number(symbolData?.S3))
                    : priceFormatted(Number(symbolData?.S3))
                  : "-"}
              </p>
              <p className="text-14px text-gray-012">
                {symbolData?.U3
                  ? isDerivative
                    ? quantityFormattedDerivative(Number(symbolData?.U3))
                    : quantityFormatted(Number(symbolData?.U3))
                  : "-"}
              </p>
            </div>
            <div
              style={{ width: `${(Number(symbolData?.U3) / KLB) * 100}%` }}
              className="absolute bg-gray-008 left-0 top-0 bottom-0 z-10"
            />
          </div>
        </div>
      ) : (
        <div className={clsx("h-[140px]", classNames?.noData)}>
          <NoDocuments />
        </div>
      )}
    </div>
  );
};
export default MarketDepthInfomation;
