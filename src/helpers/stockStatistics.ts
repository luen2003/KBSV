import { MAP_INDEXS_SHOW } from "@constants/index.constants";
import { type ICommon } from "@types";

export function formatPrice(value: any) {
  // Chuyển giá trị về dạng chuỗi với 2 số sau dấu thập phân
  return (value / 1000).toFixed(2).toString();
}
export function formatValue(value: any) {
  // Chuyển giá trị về dạng chuỗi với định dạng số và 2 số sau dấu thập phân
  return (value / 1000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
export function formatVolume(value: string | number) {
  // Chuyển giá trị về dạng chuỗi với định dạng số không có số thập phân
  const numberVal = Number(value);
  return numberVal.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
export const formatMoney = (number: number | string) => {
  // Chuyển các giá trị tiền về định dạng có dấu phân cách hàng nghìn VD: 31000 => 31,000
  const numberRe = Number(number);
  return numberRe?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatToFixed2 = (number: number | string) => {
  const number1 = String(number);
  const roundedNumber = parseFloat(number1).toFixed(2);
  const trimmedNumber = parseFloat(roundedNumber).toString();
  return trimmedNumber;
};

export function formatLargeNumber(number: number | string): string {
  const numberVal = Number(number);
  const billions = (numberVal / 1000000000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return billions;
}

export function convertIndex(index: ICommon.INDEX) {
  return MAP_INDEXS_SHOW[index];
}

export function convertTextToColor(text: string): string {
  if (text === "down") {
    return "text-color-red";
  } else if (text === "up") {
    return "text-color-green";
  } else {
    return "text-color-yellow";
  }
}
