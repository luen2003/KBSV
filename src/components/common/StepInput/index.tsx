import React, { useState } from "react";

import { formatMoney } from "@helpers/stockStatistics";
import clsx from "clsx";
import { Add, Minus } from "iconsax-react";

interface StepInputProps {
  value?: number | string;
  step?: number;
  min?: number;
  max?: number;
  decimal?: boolean;
  onChange: (value?: string | number) => void;
  classNames?: { wrap?: string };
  name?: string | undefined;
  divisor?: number;
  disabled?: boolean;
  suggestOptions?: number[];
  fraction?: number;
}

const StepInput: React.FC<StepInputProps> = ({
  value,
  step = 1,
  min = 1,
  max = 1000000000,
  decimal,
  classNames,
  name,
  divisor = 1,
  onChange = () => {},
  disabled,
  suggestOptions,
  fraction = 2
}) => {
  const [openSuggest, setOpenSuggest] = useState(false);
  const valueChanged =
    typeof value === "string"
      ? value
      : value === undefined
      ? value
      : value / divisor;

  const minChanged = min / divisor;
  const maxChanged = max / divisor;

  const handleIncrement = () => {
    if (typeof valueChanged === "number" && !disabled) {
      const newValue = valueChanged + step;
      if (maxChanged === undefined || newValue <= maxChanged) {
        onChange(parseFloat(newValue.toFixed(fraction)) * divisor);
      }
    }
  };

  const handleDecrement = () => {
    if (typeof valueChanged === "number" && !disabled) {
      const newValue = valueChanged - step;
      if (minChanged === undefined || newValue >= minChanged) {
        onChange(parseFloat(newValue.toFixed(fraction)) * divisor);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value.replace(/,/g, ""));
    if (newValue !== valueChanged && !isNaN(newValue) && newValue >= 0) {
      onChange(parseFloat(newValue.toFixed(fraction)) * divisor);
    } else if (isNaN(newValue)) {
      onChange(undefined);
    }
  };
  const handSuggestItem = (item: number) => {
    setOpenSuggest(false);
    onChange(item);
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    event.stopPropagation();
    setOpenSuggest(false);
  };

  const handleFocus = () => {
    setOpenSuggest(true);
  };

  return (
    <div
      className={clsx(
        "relative px-2.5 py-3.5 flex items-center rounded justify-between border border-gray-009 text-14px font-normal text-gray-012 select-none",
        disabled && "bg-gray-009",
        classNames?.wrap
      )}
    >
      <Minus
        className="w-[1.125rem] h-[1.125rem] cursor-pointer"
        onClick={handleDecrement}
      />
      <input
        name={name}
        disabled={typeof value === "string" || disabled}
        type={typeof value === "string" ? "text" : decimal ? "number" : "text"}
        value={name === "price" ? valueChanged : valueChanged?.toLocaleString()}
        onChange={handleInputChange}
        className="outline-none bg-transparent text-center text-14px text-gray-012"
        onClick={handleFocus}
        onBlur={handleBlur}
      />
      <Add
        className="w-[1.125rem] h-[1.125rem] cursor-pointer"
        onClick={handleIncrement}
      />
      {suggestOptions && (
        <div
          className={clsx(
            "absolute top-full left-0 right-0 grid grid-cols-3 gap-0.5 rounded overflow-hidden bg-gray-004",
            !openSuggest && "hidden"
          )}
        >
          {suggestOptions?.map((item, index) => {
            return (
              <div
                className="col-span-1 py-2 px-3 text-14px font-normal text-gray-012 bg-gray-006 cursor-pointer text-center"
                key={item + index}
                onMouseDown={() => handSuggestItem(item)}
              >
                {formatMoney(item)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StepInput;
