import { useEffect, useRef, useState } from "react";

import { REGEX_ONLY_AZ09 } from "@constants/common";
import { type ISymbolSearch } from "@interfaces/board.interfaces";
import clsx from "clsx";
import { SearchNormal1 } from "iconsax-react";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import { FixedSizeList as List } from "react-window";

import SymbolSearchItem from "../SymbolSearchItem";

interface IProps {
  symbol: string;
  allSymbolSearch: ISymbolSearch[];
  onChange: (value: ISymbolSearch) => void;
  onOutsideClick?: () => void;
  menuIsOpen?: boolean;
  iconSearch?: boolean;
  isClearable?: boolean;
  showEntityToAll?: boolean;
  classNames?: {
    wrap?: string;
  };
  label?: string;
  isFocus?: boolean;
  isClearOnFocus?: boolean;
}

export default function SymbolSearchFilter({
  symbol,
  allSymbolSearch,
  onChange,
  onOutsideClick,
  menuIsOpen,
  iconSearch,
  isClearable,
  showEntityToAll,
  classNames,
  label,
  isFocus,
  isClearOnFocus
}: IProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const selectRef = useRef<any>(null);
  const [query, setQuery] = useState(symbol);
  const [value, setValue] = useState<any>();
  const [filtered, setFiltered] = useState<ISymbolSearch[]>([]);

  useEffect(() => {
    if (selectRef.current && isFocus) {
      selectRef.current.focus();
    } else {
      onFocusOut();
    }
  }, [selectRef, isFocus]);

  useEffect(() => {
    let filter: ISymbolSearch[] = [];
    if (query !== "") {
      filter = allSymbolSearch.filter(
        (item: ISymbolSearch) =>
          item.symbol
            .toLowerCase()
            .includes(query.toLowerCase().replace(/\s+/g, "")) &&
          (item.type === "stock" ||
            item.type === "cw" ||
            item.type === "bond" ||
            item.type === "future")
      );
      setFiltered(filter);
    } else {
      setFiltered(allSymbolSearch);
    }
  }, [allSymbolSearch, query]);

  const onFocusOut = () => {
    if (showEntityToAll && query === "" && !value?.symbol) {
      const symbol = {
        symbol: "ALL",
        isSearch: true,
        name: "",
        nameEn: "",
        exchange: "",
        re: 0,
        ceiling: 0,
        floor: 0,
        type: ""
      };
      setValue(symbol);
      onChange(symbol);
    }
    if (onOutsideClick) onOutsideClick();
  };

  const handleOnFocus = () => {
    if (isClearOnFocus) setValue("");
  };

  const onChangeSelect = (newValue: ISymbolSearch) => {
    setValue({ ...newValue, isSearch: true });
    onChange(newValue);
  };

  return (
    <div ref={ref} className={clsx(classNames?.wrap)}>
      <Select
        ref={selectRef}
        value={value}
        menuIsOpen={menuIsOpen}
        inputValue={query}
        onInputChange={(val) => setQuery(val.replace(REGEX_ONLY_AZ09, ""))}
        options={filtered}
        onBlur={onFocusOut}
        blurInputOnSelect
        onFocus={handleOnFocus}
        formatOptionLabel={(props) => {
          return (
            <div>
              <div className={clsx("flex pr-4 items-center text-gray-012")}>
                {props.isSearch ? (
                  props.symbol === "ALL" ? (
                    t("stockDetail:all")
                  ) : (
                    props.symbol
                  )
                ) : (
                  <SymbolSearchItem {...props} search={query} />
                )}
              </div>
            </div>
          );
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: (props) => {
            return (
              components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                  {iconSearch ? (
                    <SearchNormal1 className="h-4 w-4 text-gray-009" />
                  ) : (
                    <div className="h-4 w-full text-gray-011">
                      {label ? `${label}:` : `${t("orderBook:mack")}:`}
                    </div>
                  )}
                </components.DropdownIndicator>
              )
            );
          },
          MenuList: (props) => {
            const { options, children, maxHeight, getValue } = props;

            return (
              <div>
                {children && Array.isArray(children) && (
                  <List
                    height={200}
                    width={250}
                    itemCount={children?.length}
                    itemSize={60}
                    initialScrollOffset={0}
                  >
                    {({ index, style }) => {
                      return (
                        <div
                          className={clsx(
                            "",
                            index % 2 === 0 ? "!bg-gray-005" : "!bg-gray-004"
                          )}
                          style={style}
                        >
                          {children[index]}
                        </div>
                      );
                    }}
                  </List>
                )}
              </div>
            );
          }
        }}
        onChange={onChangeSelect}
        filterOption={null}
        isMulti={false}
        isClearable={isClearable}
        isSearchable={true}
        closeMenuOnSelect={true}
        placeholder={""}
        classNames={{
          control: (state) =>
            clsx(
              "!border-[1px] !border-gray-006 !flex-row-reverse !bg-transparent !min-h-[2.25rem] !shadow-none",
              state.isFocused ? "!bg-gray-004" : "!bg-gray-002"
            ),
          option: (state) =>
            clsx(
              "!padding-0 h-full",
              state.isFocused ? "!bg-gray-006" : "!bg-transparent"
            ),
          clearIndicator: (state) => clsx("!absolute right-0"),
          input: (state) => clsx("!text-gray-013"),
          menuList: (state) => clsx("!padding-0 !bg-gray-002"),
          menu: (state) => clsx("!bg-gray-004 !w-[250px] !h-[200px] !z-20")
        }}
      />
    </div>
  );
}
