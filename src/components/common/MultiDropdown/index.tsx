import { Fragment, useEffect, useState } from "react";

import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import { useTranslation } from "react-i18next";

import Checkbox from "../Checkbox";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  title?: string;
  variant?:
    | "Bold"
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bulk"
    | "TwoTone"
    | undefined;
  classNames?: {
    dropBox?: string;
    contentDropBox?: string;
    wrapDropDown?: string;
  };
  onBlur?: (options: Option[]) => void;
  optionActive: Option[];
  isBroker?: boolean;
}

const MultiDropdown = (rest: Props) => {
  return (
    <Popover as="div" className={clsx("relative inline-block text-left")}>
      {({ open }) => (
        <>
          <Content open={open} {...rest} />
        </>
      )}
    </Popover>
  );
};

const Content = ({
  open,
  classNames,
  title,
  variant,
  options,
  onBlur,
  optionActive,
  isBroker
}: Props & { open: boolean }) => {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(optionActive);

  const handleOptionChange = (value: Option) => {
    const selectedIndex = selectedOptions.find((x) => x.value === value.value);
    if (selectedIndex) {
      // Option is already selected, remove it
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== value.value)
      );
    } else {
      // Option is not selected, add it
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      // Deselect all options
      setSelectedOptions([]);
    } else {
      // Select all options
      setSelectedOptions(options.map((option) => option));
    }
  };
  useEffect(() => {
    isBroker && optionActive.length && setSelectedOptions(optionActive);
  }, [isBroker, optionActive]);

  useEffect(() => {
    const select =
      selectedOptions.length === options.length ? [] : selectedOptions;
    if (!open && onBlur) {
      onBlur(select);
    }
  }, [open]);

  return (
    <>
      <div>
        <Popover.Button
          className={clsx(
            "flex items-center justify-between rounded bg-transparent px-3 py-[0.469rem] text-[0.875rem] border border-gray-006 focus:outline-none max-w-[13.5rem]",
            classNames?.dropBox
          )}
        >
          <div className="flex items-center">
            {title && <p className={clsx("mr-1 text-gray-011")}>{title}</p>}
            <p
              className={clsx(
                "truncate text-gray-012 max-w-[5rem]",
                classNames?.contentDropBox
              )}
            >
              {selectedOptions.length === options.length
                ? t("stockDetail:all")
                : selectedOptions.map((item) => item.label + ", ")}
            </p>
          </div>
          <ArrowDown2 className={clsx("ml-4")} size="16" variant={variant} />
        </Popover.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel
          className={clsx(
            "absolute left-0 z-10 mt-1 focus:outline-none w-full rounded overflow-auto"
          )}
        >
          <div
            className={clsx(
              "bg-gray-006 rounded w-full",
              classNames?.wrapDropDown
            )}
          >
            <div className="flex items-center px-4 py-2 bg-gray-008">
              <Checkbox
                checked={selectedOptions.length === options.length}
                onChange={handleSelectAll}
              />
              <span className="font-normal text-gray-013 ml-2.5">
                {t("stockDetail:all")}
              </span>
            </div>
            {options?.map((option) => (
              <div className="flex items-center px-4 py-2" key={option.value}>
                <Checkbox
                  checked={selectedOptions.some(
                    (item) => item.value === option.value
                  )}
                  onChange={() => handleOptionChange(option)}
                />
                <span className="font-normal text-gray-013 ml-2.5">
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

export default MultiDropdown;
