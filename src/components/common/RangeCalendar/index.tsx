import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import { Calendar } from "iconsax-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

import { type IPropsRangeCalendar } from "./interfaces";

const RangeCalendar: React.FC<IPropsRangeCalendar> = ({
  onDateRangeChange,
  defaultStartDate = null,
  defaultEndDate = null,
  children,
  isHideButton = false,
  onChangeStart = () => {},
  onChangeTo = () => {}
}) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (defaultStartDate) setStartDate(defaultStartDate);
    if (defaultEndDate) setEndDate(defaultEndDate);
  }, [defaultEndDate, defaultStartDate]);

  // Function to handle button click
  const handleButtonClick = () => {
    const dateRangeObject = {
      fromDate: dayjs(startDate).format("YYYY-MM-DD"),
      toDate: dayjs(endDate).format("YYYY-MM-DD")
    };
    onDateRangeChange(dateRangeObject);
  };

  return (
    <div className="flex items-center mb-2 mx-4 relative z-50">
      {/* Datepicker for From Date */}
      <div className="relative">
        <label htmlFor="fromDate">
          <DatePicker
            id="fromDate"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date as Date);
              onChangeStart(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="From Date"
            dateFormat="dd/MM/yyyy"
            className="bg-gray-004 w-48 p-2 border border-gray-008 rounded focus:outline-none text-14px"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer">
            <Calendar size="22" />
          </span>
        </label>
      </div>
      {/* Datepicker for To Date */}
      <div className="relative mx-12px">
        <label htmlFor="toDate">
          <DatePicker
            id="toDate"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date as Date);
              onChangeTo(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="To Date"
            dateFormat="dd/MM/yyyy"
            className="bg-gray-004 w-48 p-2 border border-gray-008 rounded focus:outline-none text-14px"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer">
            <Calendar size="22" />
          </span>
        </label>
      </div>
      {/* Button search action */}
      {children}

      {!isHideButton && (
        <button
          onClick={handleButtonClick}
          className="bg-color-primary text-color-brown font-bold px-4 py-2 rounded focus:outline-none text-sm"
        >
          {t("stockDetail:search")}
        </button>
      )}
    </div>
  );
};

export default RangeCalendar;
