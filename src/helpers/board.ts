import { type IDropdownBoard } from "@components/common/DropdownBoard/interface";
import { type INewSymbolData } from "@interfaces/board.interfaces";
import { store } from "@store/store";
import {
  type ValueFormatterParams,
  type CellClassParams,
  type ValueGetterParams
} from "ag-grid-community";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/customParseFormat";
import i18next from "i18next";

export interface IStockBoardCellClassParams extends CellClassParams {
  readonly data: INewSymbolData;
  readonly value: number | string | undefined;
}
export interface IStockBoardValueFormatterParams extends ValueFormatterParams {
  readonly data: INewSymbolData | undefined;
}

export interface IStockBoardValueGetterParams extends ValueGetterParams {
  readonly data: INewSymbolData | undefined;
}

export const basisClassRules = {
  "text-color-green": (params: IStockBoardCellClassParams) =>
    (Number(params?.value) || 0) > 0,
  "text-color-red": (params: IStockBoardCellClassParams) =>
    (Number(params?.value) || 0) < 0,
  Ref: (params: IStockBoardCellClassParams) => params.value === 0
};

export const closePriceClassRules = {
  "text-color-pink": (params: IStockBoardCellClassParams) =>
    params.data?.CP !== undefined &&
    params.data?.CP !== null &&
    Number(params.data?.CP) > 0 &&
    params.data.CP === params.data?.CL,
  "text-color-blue": (params: IStockBoardCellClassParams) =>
    params.data?.CP !== undefined &&
    params.data?.CP !== null &&
    Number(params.data?.CP) > 0 &&
    params.data.CP === params.data?.FL,
  "text-color-yellow": (params: IStockBoardCellClassParams) =>
    params.data?.CP !== undefined &&
    params.data?.CP !== null &&
    Number(params.data?.CP) > 0 &&
    params.data.CP === params.data?.RE,
  "text-color-green": (params: IStockBoardCellClassParams) =>
    params.data?.CP !== undefined &&
    params.data?.CP !== null &&
    Number(params.data?.CP) > 0 &&
    params.data.CP !== params.data.CL &&
    params.data.CP !== params.data.FL &&
    params.data.CP > Number(params.data.RE),
  "text-color-red": (params: IStockBoardCellClassParams) =>
    params.data?.CP !== undefined &&
    params.data?.CP !== null &&
    Number(params.data?.CP) > 0 &&
    params.data.CP !== params.data.CL &&
    params.data.CP !== params.data.FL &&
    params.data.CP < Number(params.data.RE),
  Default: (params: IStockBoardCellClassParams) =>
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    !(params.data && params.data.CP)
};

export const valueClassRules = {
  "text-color-pink": "value == data.CL",
  "text-color-blue": "value == data.FL",
  "text-color-yellow": "value == data.RE",
  "text-color-green": "value != data.CL && value != data.FL && value > data.RE",
  "text-color-red": "value != data.CL && value != data.FL && value < data.RE"
};

export const bidClassRules = (index: number) => ({
  "text-color-pink": `data.B${index + 1} == data.CL`,
  "text-color-blue": `data.B${index + 1} == data.FL`,
  "text-color-yellow": `data.B${index + 1} == data.RE`,
  "text-color-green": `data.B${index + 1} != data.CL && data.B${
    index + 1
  } != data.FL && data.B${index + 1} > data.RE`,
  "text-color-red": `data.B${index + 1} != data.CL && data.B${
    index + 1
  } != data.FL && data.B${index + 1} < data.RE`,
  Default: `data.B${index + 1} == 0`
});

export const offerClassRules = (index: number) => ({
  "text-color-pink": `data.S${index + 1} == data.CL`,
  "text-color-blue": `data.S${index + 1} == data.FL`,
  "text-color-yellow": `data.S${index + 1} == data.RE`,
  "text-color-green": `data.S${index + 1} != data.CL && data.S${
    index + 1
  } != data.FL && data.S${index + 1} > data.RE`,
  "text-color-red": `data.S${index + 1} != data.CL && data.S${
    index + 1
  } != data.FL && data.S${index + 1} < data.RE`,
  Default: `data.S${index + 1} == 0`
});

export const priceFormatter = (params: IStockBoardValueFormatterParams) => {
  if (
    typeof params.value === "string" &&
    (params.value === "ATO" || params.value === "ATC")
  ) {
    return params.value;
  }
  return priceFormatted(Number(params.value));
};

export const priceFormatterIgnoreZero = (
  params: IStockBoardValueFormatterParams
) => {
  if (
    typeof params.value === "string" &&
    (params.value === "ATO" || params.value === "ATC")
  ) {
    return params.value;
  } else if (params.value === 0) {
    return "";
  }
  return priceFormatted(Number(params.value));
};

export const priceFormatted = (value: number) => {
  return formatNumber(value, 2, 1000, true, "");
};

export const priceFormatterDerivative = (
  params: IStockBoardValueFormatterParams
) => {
  if (
    typeof params.value === "string" &&
    (params.value === "ATO" || params.value === "ATC")
  ) {
    return params.value;
  }
  return priceFormattedDerivative(Number(params.value));
};

export const priceFormatterDerivativeIgnoreZero = (
  params: IStockBoardValueFormatterParams
) => {
  if (
    typeof params.value === "string" &&
    (params.value === "ATO" || params.value === "ATC")
  ) {
    return params.value;
  } else if (params.value === 0) {
    return "";
  }
  return priceFormattedDerivative(Number(params.value));
};

export const priceFormattedDerivative = (value: number) => {
  return formatNumber(value, 1, 1, true, "");
};

export const tradingValueFormatted = (value?: number) =>
  formatNumber(
    value,
    value != null && value < 1000000 ? 3 : 0,
    1000000,
    false,
    ""
  );

export const tradingValueFormatter = (
  params: IStockBoardValueFormatterParams
) => {
  if (Number(params.value) === 0) {
    return "";
  }
  return tradingValueFormatted(Number(params.value));
};

export const quantityFormatter = (params: IStockBoardValueFormatterParams) => {
  if (Number(params.value) === 0) {
    return "";
  }
  return quantityFormatted(Number(params.value));
};

export const quantityFormatted = (value: number) => {
  if (Math.abs(value) >= 10) {
    return formatNumber(value, 0, 1, false, "").slice(0, -1);
  } else {
    return formatNumber(value, 1, 10, true, "");
  }
};

export const quantityFormatterDerivative = (
  params: IStockBoardValueFormatterParams
) => {
  if (Number(params.value) === 0) {
    return "";
  }
  return quantityFormattedDerivative(Number(params.value));
};

export const quantityFormattedDerivative = (value: number) => {
  return formatNumber(value, 0, 1, false, "");
};

export const rateFormatter = (params: IStockBoardValueFormatterParams) => {
  if (
    params?.data?.CH !== undefined &&
    params?.data?.CP &&
    Number(params?.data?.CP) > 0
  ) {
    return rateFormatted(Number(params.value));
  }
  return "";
};

export const rateFormatted = (value: number) => {
  return formatNumber(value, 2, undefined, true, "") + "%";
};

export const changeFormatter = (params: IStockBoardValueFormatterParams) => {
  if (
    params?.data?.CP !== undefined &&
    params?.data?.CP !== null &&
    Number(params?.data?.CP) > 0
  ) {
    return changeFormatted(Number(params.value));
  }
  return "";
};

export const changeFormatted = (value: number) => {
  return formatNumber(value, 2, 1000, true, "");
};

export const changeFormatterDerivative = (
  params: IStockBoardValueFormatterParams
) => {
  if (
    params?.data?.CP !== undefined &&
    params?.data?.CP !== null &&
    Number(params?.data?.CP) > 0
  ) {
    return changeFormattedDerivative(Number(params.value));
  }
  return "";
};

export const changeFormattedDerivative = (value: number) => {
  return formatNumber(value, 2, 1, true, "");
};

export const diffFormatter = (params: IStockBoardValueFormatterParams) => {
  return diffFormatted(Number(params.value));
};

export const diffFormatted = (value: number) => {
  return formatNumber(value, 2, 1, true, "");
};

export function formatNumber(
  value?: number,
  digit?: number,
  offsetRate?: number,
  toFixed?: boolean,
  failoverValue: string = "0"
) {
  if (value == null || isNaN(value)) {
    return failoverValue;
  }

  let data = value;

  if (offsetRate != null) {
    data = value / offsetRate;
  }

  let tempValueString = data.toString();
  let prefix = "";

  if (tempValueString[0] === "-") {
    prefix = "-";
    tempValueString = tempValueString.substring(1, tempValueString.length);
  }

  try {
    const tempValue = Number(tempValueString);
    let fractionDigit = 0;
    if (digit != null) {
      fractionDigit = digit;
    }
    if (fractionDigit > 0) {
      const temp = +`${Math.round(
        Number(`${Number(tempValue.toString())}e+${fractionDigit}`)
      )}e-${fractionDigit}`;
      let fractionString = "";
      let i = "";
      if (toFixed === true) {
        i = temp.toFixed(fractionDigit);
        fractionString = i.substring(i.indexOf("."), i.length);
        i = i.substring(0, i.indexOf("."));
      } else {
        i = temp.toString();
        if (temp.toString().indexOf(".") > 1) {
          fractionString = temp
            .toString()
            .substring(temp.toString().indexOf("."), temp.toString().length);
          i = temp.toString().substring(0, temp.toString().indexOf("."));
        }
      }
      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + fractionString;
    } else {
      const temp = +`${Math.round(
        Number(`${Number(tempValue.toString())}e+${fractionDigit}`)
      )}e-${fractionDigit}`;
      const i = temp.toString();
      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } catch {
    return "";
  }
}

export function getRefreshPageTime() {
  const date = new Date();
  const currentUtcTime: number =
    (date.getUTCHours() * 60 + date.getMinutes()) * 60000;
  const openTime = (1 * 60 + 30) * 60000;
  let timeout = openTime - currentUtcTime;
  if (timeout <= 0) {
    timeout = timeout + 86400000;
  }
  return timeout;
}

export function diDer(data: INewSymbolData, vn30Index: number) {
  if (
    data.CP !== undefined &&
    data.CP !== null &&
    Number(data.CP) > 0 &&
    data.CP
  ) {
    const di = Number(data.CP) - Number(vn30Index);
    return { ...data, DI: di };
  }
  return { ...data, DI: undefined };
}

export const baseStockPriceClassRules = {
  "text-color-pink": (params: IStockBoardCellClassParams) =>
    params.data?.CPCS ? params.data?.CPCS?.CP === params.data.CPCS?.CL : false,
  "text-color-blue": (params: IStockBoardCellClassParams) =>
    params.data?.CPCS ? params.data?.CPCS?.CP === params.data.CPCS?.FL : false,
  "text-color-yellow": (params: IStockBoardCellClassParams) =>
    params.data?.CPCS ? params.data?.CPCS?.CP === params.data.CPCS?.RE : false,
  "text-color-green": (params: IStockBoardCellClassParams) =>
    params.data?.CPCS
      ? params.data?.CPCS?.CP !== params.data.CPCS?.CL &&
        params.data?.CPCS?.CP !== params.data.CPCS?.FL &&
        params.data?.CPCS?.CP > Number(params.data.CPCS?.RE)
      : false,
  "text-color-red": (params: IStockBoardCellClassParams) =>
    params.data?.CPCS
      ? params.data?.CPCS?.CP !== params.data.CPCS?.CL &&
        params.data?.CPCS?.CP !== params.data.CPCS?.FL &&
        params.data?.CPCS?.CP < Number(params.data.CPCS?.RE)
      : false,
  Default: (params: IStockBoardCellClassParams) => !params.data?.CPCS?.CP
};

export const baseStockClosePriceGetter = (
  params: IStockBoardValueGetterParams
) => params.data?.CPCS?.CP;

export const baseStockDiemHoaVonPriceGetter = (
  params: IStockBoardValueGetterParams
) =>
  Number(params?.data?.CP) * Number(params?.data?.ER?.split(":")[0]) +
  Number(params?.data?.EP);
export const baseStockDHVGTTPriceGetter = (
  params: IStockBoardValueGetterParams
) =>
  Number(params?.data?.CP) * Number(params?.data?.ER?.split(":")[0]) +
  Number(params?.data?.EP) -
  Number(params.data?.CPCS?.CP);

export const dayDHFormatter = (params: IStockBoardValueFormatterParams) => {
  if (params.value) {
    dayjs.extend(advancedFormat);
    const formattedDate = dayjs(String(params.value), "DD/MM/YYYY").format(
      "DD/MM/YY"
    );
    return formattedDate;
  }
  return params.value;
};
export const dayGDCCFormatter = (params: IStockBoardValueFormatterParams) => {
  if (params.value) {
    dayjs.extend(advancedFormat);
    const formattedDate = dayjs(String(params.value), "YYYYMMDD").format(
      "DD/MM/YY"
    );
    return formattedDate;
  }
  return params.value;
};

export const ratePriceGetter = (params: IStockBoardValueGetterParams) =>
  params.data?.CHP ?? 0;

export const changePriceGetter = (params: IStockBoardValueGetterParams) =>
  params.data?.CH ?? 0;
