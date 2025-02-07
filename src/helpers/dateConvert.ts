/* eslint-disable @typescript-eslint/no-unsafe-argument */
import "dayjs/locale/vi";

import { type TypesCommon } from "@types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const setDayVi = (crLang: TypesCommon.ILanguage = "vi") => {
  if (crLang === dayjs.locale()) return;

  dayjs.locale(crLang);

  dayjs.updateLocale(
    crLang,
    crLang === "en"
      ? {
          relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
          }
        }
      : {
          relativeTime: {
            future: "trong %s",
            past: "%s trước",
            s: "vài giây",
            m: "1 phút",
            mm: "%d phút",
            h: "1 giờ",
            hh: "%d giờ",
            d: "1 ngày",
            dd: "%d ngày",
            M: "1 tháng",
            MM: "%d tháng",
            y: "1 năm",
            yy: "%d năm"
          }
        }
  );
};
const timeFromNow = (
  s: string,
  configs?: { locale?: TypesCommon.ILanguage }
) => {
  setDayVi(configs?.locale);

  // Số sê-ri của chuỗi
  const dateSerial = Date.parse(s);
  // Số sê-ri của ngày hiện tại
  const todaySerial = Date.now();
  // Số ngày cách biệt
  const diffDays = (todaySerial - dateSerial) / 86400000;

  if (diffDays > 7) {
    return dayjs(s).format("DD/MM/YYYY");
  }
  return dayjs(s).fromNow();
};

const timestampFromDateTime = (date: string, time: string) => {
  const [day, month, year] = date.split("/");
  const [hour, minute, second] = time.split(":");
  const cvt = new Date(
    +Number(year),
    +Number(month) - 1,
    +Number(day),
    +Number(hour),
    +Number(minute),
    +Number(second)
  );
  const d = cvt.getTime();
  const timestamp: number = Math.floor(d / 1000);
  return timestamp;
};

const formatTimeStampToDDMMYYYY = (val: Date, hasTime: boolean) => {
  const timestamp = val;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = date.toLocaleTimeString("en-US", {
    timeStyle: "medium"
  });
  let result = `${formattedTime} ${formattedDate}`;
  if (!hasTime) {
    result = formattedDate;
    return result;
  }
  return result;
};

const createAtToTimeStamp = (sd: string) => {
  // định dạng ISO 8601
  return new Date(sd).getTime() * 1000; // trả về timestamp trong mili giây
};

const dateComparator = (date1: string | null, date2: string | null): number => {
  const format = "DD/MM/YYYY";

  const date1Dayjs = date1 ? dayjs(date1, format) : null;
  const date2Dayjs = date2 ? dayjs(date2, format) : null;

  if (!date1Dayjs?.isValid() && !date2Dayjs?.isValid()) {
    return 0;
  }

  if (!date1Dayjs?.isValid()) {
    return -1;
  }

  if (!date2Dayjs?.isValid()) {
    return 1;
  }

  return date1Dayjs.valueOf() - date2Dayjs.valueOf();
};

function formatDateYYYYMMDD(date: number) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = "" + d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

const dateConvert = {
  timeFromNow,
  timestampFromDateTime,
  formatTimeStampToDDMMYYYY,
  createAtToTimeStamp,
  dateComparator,
  formatDateYYYYMMDD
};
export default dateConvert;
