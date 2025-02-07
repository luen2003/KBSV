import { formatNumber } from "./board";

export const formatNumberKMB = (number: number) => {
  if (number >= 1000000000) {
    // Số lớn hơn hoặc bằng 1 tỷ
    return formatNumber(number, 1, 1000000000, true, "") + "B";
  } else if (number >= 1000000) {
    // Số lớn hơn hoặc bằng 1 triệu
    return formatNumber(number, 1, 1000000, true, "") + "M";
  } else if (number >= 1000) {
    // Số lớn hơn hoặc bằng 1 nghìn
    return formatNumber(number, 1, 1000, true, "") + "K";
  } else {
    return number.toString();
  }
};
