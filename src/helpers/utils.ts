import { type KeyboardEvent, type MouseEventHandler } from "react";

import { type IMenu } from "@components/layout/components/RightSideBar";
import { type IMsgSendSocket } from "@interfaces/stock";
import { type ICommon } from "@types";
import dayjs from "dayjs";
import { v4 } from "uuid";

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const generateRandomNumbers = ({
  min,
  max,
  times
}: {
  min: number;
  max: number;
  times: number;
}) => {
  const randoms = [];

  for (let i = 0; i < times; i++) {
    randoms.push(Math.floor(Math.random() * (max - min) + min));
  }

  return randoms;
};

export function extractVideoID(url: string): string | null {
  // Sử dụng URL API để phân tích cú pháp URL
  try {
    const urlObj = new URL(url);
    // Kiểm tra hostname để đảm bảo đó là một URL YouTube
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com" ||
      urlObj.hostname === "youtu.be"
    ) {
      // Lấy giá trị của tham số 'v' cho các URL dạng www.youtube.com
      if (urlObj.searchParams.has("v")) {
        return urlObj.searchParams.get("v");
      } else if (urlObj.hostname === "youtu.be") {
        // Đối với URL rút gọn (youtu.be), ID là phần của pathname
        return urlObj.pathname.substring(1);
      }
    }
    return null; // Trả về null nếu URL không phải YouTube hoặc không tìm thấy ID
  } catch (error) {
    return null; // Trả về null nếu URL không hợp lệ
  }
}

export const mId = v4;

export const onStopPropagation: MouseEventHandler<any> = (e) => {
  e?.stopPropagation();
};

export const onKeyUpEnter = (
  event: KeyboardEvent<HTMLInputElement>,
  callback: () => void
) => {
  if (event.key === "Enter") {
    callback();
  }
};

export function isNumber(value: any): boolean {
  return typeof value === "number" && !isNaN(value);
}

export function getUrlThumnailYoutube(url: string) {
  return `https://img.youtube.com/vi/${extractVideoID(url)}/0.jpg`;
}

export function lamTron(so: number, viTriLamTron: number): number {
  // Chuyển đổi số thành chuỗi
  const chuoiSo: string = so.toString();

  // Xác định vị trí dấu phẩy
  const viTriDauPhẩy: number = chuoiSo.indexOf(".");

  // Kiểm tra xem số có phần thập phân hay không
  if (viTriDauPhẩy === -1) {
    return so; // Số nguyên, không cần làm tròn
  }

  // Cắt chuỗi thành phần nguyên và phần thập phân
  const phanNguyen: string = chuoiSo.substring(0, viTriDauPhẩy);
  const phanThapPhan: string = chuoiSo.substring(viTriDauPhẩy + 1);

  // Làm tròn phần thập phân
  let phanThapPhanLamTron: string;
  if (phanThapPhan.length > viTriLamTron) {
    // Cắt phần thập phân theo vị trí làm tròn
    phanThapPhanLamTron = phanThapPhan.substring(0, viTriLamTron);

    // Xác định chữ số hàng làm tròn
    const chuSoHangLamTron: string = phanThapPhan[viTriLamTron];

    // Áp dụng quy tắc làm tròn
    const chuSoDu: number = parseInt(chuSoHangLamTron);
    if (chuSoDu >= 5) {
      // Làm tròn lên
      phanThapPhanLamTron += "1";
    }
  } else {
    // Giữ nguyên phần thập phân
    phanThapPhanLamTron = phanThapPhan;
  }

  // Ghép phần nguyên và phần thập phân làm tròn thành chuỗi mới
  const chuoiSoLamTron: string = phanNguyen + "." + phanThapPhanLamTron;

  // Chuyển đổi chuỗi thành số và trả về kết quả
  return parseFloat(chuoiSoLamTron);
}

export function roundToFiveDecimalPlacesAndSumTo100(
  numbers: number[],
  decimalPlaces = 4
): number[] {
  try {
    const factor = Math.pow(10, decimalPlaces);
    const sum = numbers.reduce((acc, num) => acc + num, 0);

    const percentages = numbers.map((num) => {
      return Math.round((num / sum) * 100 * factor) / factor;
    });

    const totalPercentage = percentages.reduce((acc, num) => acc + num, 0);
    const difference = Math.round((100 - totalPercentage) * factor) / factor;

    // Điều chỉnh số cuối cùng để đảm bảo tổng cộng bằng 100
    percentages[percentages.length - 1] += difference;

    return percentages.map((item) => (Number.isNaN(item) ? 0 : item));
  } catch (error) {
    return [];
  }
}

export const formatNumberWithCommas = (
  value?: string | number,
  /** position - lấy sau dấu phảy  = 2 -> 0.01 */
  position = 0,
  defaultV = ""
) => {
  const newValue = lamTron(Number(value), position - 1);
  const numericValue = String(newValue).replace(/,/g, ""); // Loại bỏ dấu phẩy cũ để đảm bảo tính hợp lệ của số
  if (!isNaN(+numericValue)) {
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Thêm dấu phẩy
    return formattedValue;
  }
  return defaultV || value || "-";
};
// convert số dương
export function formatToPositiveNumber(
  num?: number | string
): number | undefined {
  if (num !== undefined)
    if (!isNaN(+num)) {
      return Math.abs(+num);
    }
  return undefined;
}

export const extractNumbers = (str: string | number) => {
  return Number(`${str}`.replace(/\D/g, ""));
};

export function getCurrentDateTime() {
  const currentDate = dayjs().format("YYYYMMDDhhmmss");
  return currentDate;
}

type NumberToWords = Record<number, string>;

const units: Record<string, NumberToWords> = {
  vi: {
    0: "không",
    1: "một",
    2: "hai",
    3: "ba",
    4: "bốn",
    5: "năm",
    6: "sáu",
    7: "bảy",
    8: "tám",
    9: "chín"
  },
  en: {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine"
  }
};

const levels: Record<string, string[]> = {
  vi: ["", "nghìn", "triệu", "tỷ"],
  en: ["", "thousand", "million", "billion"]
};

export function convertNumberToWords(
  number: number,
  locale: ICommon.ILanguage = "vi"
): string {
  if (number === 0) return units[locale][0] + " đồng";

  let words: string = "";
  let level = 0;

  while (number > 0) {
    const thousand = number % 1000;
    if (thousand > 0) {
      const hundred = Math.floor(thousand / 100);
      const ten = Math.floor((thousand % 100) / 10);
      const unit = thousand % 10;

      let part: string = "";
      if (locale === "vi") {
        part += hundred > 0 ? units[locale][hundred] + " trăm " : "";
        part +=
          ten > 1 ? units[locale][ten] + " mươi " : ten === 1 ? "mười " : "";
        part +=
          unit > 0
            ? ten === 0
              ? units[locale][unit]
              : unit === 1
              ? "mốt"
              : unit === 5
              ? "lăm"
              : units[locale][unit]
            : "";
      } else if (locale === "en") {
        part += hundred > 0 ? units[locale][hundred] + " hundred " : "";
        part +=
          ten > 0
            ? ten === 1 && unit !== 0
              ? [
                  "eleven",
                  "twelve",
                  "thirteen",
                  "fourteen",
                  "fifteen",
                  "sixteen",
                  "seventeen",
                  "eighteen",
                  "nineteen"
                ][unit - 1] + " "
              : units[locale][ten * 10] + " "
            : "";
        part += ten !== 1 && unit > 0 ? units[locale][unit] + " " : "";
      }

      words =
        part +
        (levels[locale][level] ? " " + levels[locale][level] + " " : " ") +
        words;
    }

    number = Math.floor(number / 1000);
    // eslint-disable-next-line no-plusplus
    level++;
  }

  return words.trim() + " đồng";
}

export const copyToClipboard = async ({
  textToCopy,
  handleCallback = () => {}
}: {
  textToCopy?: string;
  handleCallback?: (success: boolean) => void;
}) => {
  if (!textToCopy) return handleCallback(false);
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
    handleCallback(true);
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      handleCallback(false);
    } finally {
      handleCallback(true);
      textArea.remove();
    }
  }
};
/**
 * Hàm sinh ra mã màu ngẫu nhiên ở định dạng hex
 * @returns mã màu ngẫu nhiên
 */
export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function removeVietnameseDiacritics(str?: string) {
  if (str) return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return "";
}

interface DataHasDate {
  date: string;
}

export function findNearestDateFeature<T extends DataHasDate>(
  data: T[]
): T | null {
  if (data.length === 0) {
    return null;
  }

  const today: Date = new Date();

  // Lọc ra các ngày trong tương lai
  const futureDates = data.filter((item) => new Date(item.date) > today);

  if (futureDates.length === 0) {
    return null;
  }

  return futureDates.reduce((nearest: T, current: T): T => {
    const currentDelistDate: Date = new Date(current.date);

    if (!nearest) {
      return current;
    }

    const nearestDelistDate: Date = new Date(nearest.date);
    return currentDelistDate.getTime() < nearestDelistDate.getTime()
      ? current
      : nearest;
  }, futureDates[0]);
}

export interface IColumnsExportingPdf {
  labelName: string;
  key: string;
}

export type ILayoutExportingPdf =
  | "lightHorizontalLines"
  | "headerLineOnly"
  | "noBorders";

export interface IStyleHeaderExportingPdf {
  backgroundColor?: string;
  textColor?: string;
  fontBold: boolean;
  textAlign?: string;
  fontSize?: number;
  height?: number[] | number;
}
export interface IStyleExportingPdf {
  layout: ILayoutExportingPdf | "";
  styleHeader: IStyleHeaderExportingPdf;
}

export interface IStyleTextExportingPdf {
  font?: string;
  fontSize?: number;
  lineHeight?: number;
  bold?: boolean;
  italics?: boolean;
  alignment?: string;
  color?: string;
  background?: string;
}

export interface ITextHeaderExportingPdf {
  text: string;
  style?: IStyleTextExportingPdf;
}

export interface IHeaderCustomExtend {
  text?: string;
  colSpan?: number;
  rowSpan?: number;
  style?: IStyleTextExportingPdf;
}

export interface IFooterCustomExtend extends IHeaderCustomExtend {}

export function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  // str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}

export const calculatorFeeTransMoney = (fee: number) => {
  const calculatorFee = fee + (fee * 10) / 100;
  return calculatorFee;
};

export const removeFDSPrefix = (strings: string) => {
  return strings.startsWith("FDS") ? strings.slice(3) : strings;
};

type TypeSortArrByDate = "dec" | "asc";
export const sortArrByDate = (
  arr: any[],
  typeSort: TypeSortArrByDate,
  keyValue: string,
  isNotTypeDDMMYYY?: boolean
) => {
  return arr.sort((a: any, b: any) => {
    const parseDate = (dateStr: string) =>
      dayjs(dateStr, "DD/MM/YYYY").valueOf();

    if (typeSort === "dec") {
      return parseDate(b[keyValue]) - parseDate(a[keyValue]);
    } else {
      return parseDate(a[keyValue]) - parseDate(b[keyValue]);
    }
  });
};

export const removeEnterKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

export const toFixedTwoNumber = (num: number) => {
  if (typeof num !== "number") return "";

  const roundedNum = Math.round(num * 100) / 100;

  const numString = roundedNum.toString();
  const decimalIndex = numString.indexOf(".");

  if (decimalIndex !== -1) {
    const integerPart = numString.slice(0, decimalIndex);
    const decimalPart = numString.slice(decimalIndex + 1, decimalIndex + 3);
    return `${integerPart}.${decimalPart.padEnd(2, "0")}`;
  } else {
    return numString;
  }
};

export const roundNumber = (num: number) => {
  if (typeof num !== "number") return num;
  // Tách phần nguyên và phần thập phân của số
  const integerPart = Math.floor(num);
  const decimalPart = num - integerPart;

  // Kiểm tra phần thập phân nếu lớn hơn hoặc bằng 0.5 thì làm tròn lên, nếu không thì làm tròn xuống
  if (decimalPart >= 0.5) {
    return integerPart + 1;
  } else {
    return integerPart;
  }
};

export const removeHideMenu = (menus: IMenu[]): IMenu[] => {
  return menus
    .filter((item) => !item.hide)
    .map((item) => {
      const children = item.children;
      if (children) {
        return {
          ...item,
          children: removeHideMenu(children)
        };
      } else {
        return item;
      }
    });
};

export const msgToSocket = (msg: IMsgSendSocket) => {
  let sendData = "sub+";
  if (msg?.type && msg.type === "sub") {
    sendData = "sub+";
  } else if (msg?.type && msg.type === "unsub") {
    sendData = "unsub+";
  }

  const arCodeList = msg.data;
  const count = arCodeList.length;
  if (count <= 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    sendData += msg.event.toUpperCase() + ":" + arCodeList[i] + "+";
  }

  sendData = sendData.substring(0, sendData.length - 1);
  return sendData;
};

export const formatCurrency = (value: number | string, digit: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digit
  });
};
