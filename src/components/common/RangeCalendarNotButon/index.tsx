import React, { useRef, useState, type ReactNode } from "react";

import clsx from "clsx";
import { Calendar } from "iconsax-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const RangeCalendarNotButon: React.FC<{
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
  onChangeStart: (d?: Date | null) => void;
  onChangeEnd: (d?: Date | null) => void;
  children?: ReactNode;
  classNames?: { wrap?: string; toDate?: string; calendarStyle?: string };
  isTitleCalender?: boolean;
  rangeCalendarId?: string;
  isSelectedShowCalendar?: boolean; // khi thay đổi input thì không tắt calendar
  isDisabled?: boolean;
}> = ({
  onChangeEnd,
  onChangeStart,
  selectedEnd,
  selectedStart,
  children,
  classNames,
  isTitleCalender,
  rangeCalendarId,
  isSelectedShowCalendar,
  isDisabled
}) => {
  const { t } = useTranslation();
  const [dateStart, setDateStart] = useState(selectedStart);
  const [dateEnd, setDateEnd] = useState(selectedEnd);
  const fromDateRef = useRef<DatePicker>(null);
  const toDateRef = useRef<DatePicker>(null);

  const renderFromDateCal = () => {
    return (
      <>
        <DatePicker
          disabled={isDisabled}
          ref={fromDateRef}
          id={"fromDate" + rangeCalendarId}
          selected={dateStart}
          onChange={(date) => {
            setDateStart(date);
            // onChangeStart(date);
            // if (fromDateRef.current) {
            //   fromDateRef.current.setBlur();
            //   fromDateRef.current.setOpen(false);
            // }
          }}
          onCalendarClose={() => onChangeStart(dateStart)}
          selectsStart
          startDate={selectedStart}
          endDate={selectedEnd}
          // placeholderText="From Date"
          dateFormat="dd/MM/yyyy"
          className={clsx(
            "bg-gray-004 w-48 p-2 border border-gray-008 rounded focus:outline-none text-14px",
            classNames?.calendarStyle,
            isTitleCalender && "pl-[3.625rem]"
          )}
        />
        {isTitleCalender ? (
          <span className="absolute top-[52%] -translate-y-1/2 left-2 text-gray-011">
            {`${t("common:fromDate")}`}
          </span>
        ) : null}
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer">
          <Calendar
            size={isTitleCalender ? "16" : "22"}
            onClick={() => {
              if (!isSelectedShowCalendar && fromDateRef.current)
                fromDateRef.current.setOpen(true);
            }}
          />
        </span>
      </>
    );
  };

  const renderToDateCal = () => {
    return (
      <>
        <DatePicker
          disabled={isDisabled}
          ref={toDateRef}
          id={"toDate" + rangeCalendarId}
          selected={dateEnd}
          onChange={(date) => {
            setDateEnd(date);
            // onChangeEnd(date);
            // if (toDateRef.current) {
            //   toDateRef.current.setBlur();
            //   toDateRef.current.setOpen(false);
            // }
          }}
          onCalendarClose={() => onChangeEnd(dateEnd)}
          selectsEnd
          startDate={selectedStart}
          endDate={selectedEnd}
          minDate={selectedStart}
          // placeholderText="To Date"
          dateFormat="dd/MM/yyyy"
          className={clsx(
            "bg-gray-004 w-48 p-2 border border-gray-008 rounded focus:outline-none text-14px",
            classNames?.calendarStyle,
            isTitleCalender && "pl-16"
          )}
        />
        {isTitleCalender ? (
          <span className="absolute top-[52%] -translate-y-1/2 left-2 text-gray-011">
            {`${t("common:toDate")}`}
          </span>
        ) : null}
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer">
          <Calendar
            size={isTitleCalender ? "16" : "22"}
            onClick={() => {
              if (!isSelectedShowCalendar && toDateRef.current)
                toDateRef.current.setOpen(true);
            }}
          />
        </span>
      </>
    );
  };

  return (
    <div
      className={clsx(
        "flex items-center mb-2 mx-4 relative z-50",
        classNames?.wrap
      )}
    >
      {/* Datepicker for From Date */}
      <div className="relative">
        {isSelectedShowCalendar ? (
          <label htmlFor={"fromDate" + rangeCalendarId}>
            {renderFromDateCal()}
          </label>
        ) : (
          renderFromDateCal()
        )}
      </div>
      {/* Datepicker for To Date */}
      <div className={clsx("relative mx-12px", classNames?.toDate)}>
        {isSelectedShowCalendar ? (
          <label htmlFor={"toDate" + rangeCalendarId}>
            {renderToDateCal()}
          </label>
        ) : (
          renderToDateCal()
        )}
      </div>
      {children}
    </div>
  );
};

export default RangeCalendarNotButon;
