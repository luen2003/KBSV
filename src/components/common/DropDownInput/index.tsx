import { useCallback, useEffect, useMemo, useState } from "react";

import "./styles.DropDownInput.css";
import { useDebounceCallBackFunction } from "@hooks/useDebounce";
import { ArrowDown2 } from "iconsax-react";
import { type SelectComponents } from "node_modules/react-select/dist/declarations/src/components";
import { useTranslation } from "react-i18next";
import Select, {
  type GroupBase,
  type MenuPlacement,
  type ControlProps,
  type StylesConfig
} from "react-select";

import {
  ClearInputBtn,
  DefaultInterfaceDropDownInputComponent
} from "./components";

export interface OptionTypeControlComponent {
  value: any;
  label: string;
}
export interface IPropsDropDownInput {
  controlComponent?: React.ComponentType<
    ControlProps<OptionTypeControlComponent, false>
  >;
  optionList: OptionTypeControlComponent[]; // danh sách dropdown
  placeholderName?: string; // tên placeholder input
  defaultValue?: OptionTypeControlComponent; // giá trị mặc định
  isDisabled?: boolean; // trạng thái disabled
  valueSelected?: OptionTypeControlComponent; // giá trị được chọn
  isLoading?: boolean; // trạng thái loading của input
  isClearInputBtn?: boolean; // trạng thái component xóa giá trị của input
  onValueChange: (val: OptionTypeControlComponent) => void; // hàm update value thay đổi
  onInputChange?: (val: string) => void; // hàm
  menuPlacement?: MenuPlacement; // vị trí đặt danh sách
  components?:
    | Partial<
        SelectComponents<
          OptionTypeControlComponent,
          false,
          GroupBase<OptionTypeControlComponent>
        >
      >
    | any;
  classNamePrefix?: string;
  handleScrollMenuToBottom?:
    | ((event: WheelEvent | TouchEvent) => void)
    | undefined;
  stylesConfig?:
    | StylesConfig<
        "" | OptionTypeControlComponent,
        false,
        GroupBase<OptionTypeControlComponent>
      >
    | undefined;
}

const DropdownIndicartorCustom = () => {
  return <ArrowDown2 size="16" variant="Bold" />;
};

const DropDownInput = ({ props }: { props: IPropsDropDownInput }) => {
  const { t } = useTranslation();
  const [inputChange, setInputChange] = useState<string>("");
  const [selectedOption, setSelectedOption] =
    useState<OptionTypeControlComponent | null>(null);

  const debounceOnValChange = useDebounceCallBackFunction(
    props.onInputChange,
    500
  );
  const handleClearValue = useCallback(() => {
    setInputChange("");
    setSelectedOption(null);
    props.onValueChange({ value: "", label: "" });
  }, [props]);

  const selectComponents = useMemo(
    () => ({
      Control:
        props?.controlComponent ?? DefaultInterfaceDropDownInputComponent,
      DropdownIndicator: DropdownIndicartorCustom,
      ClearIndicator:
        props.isClearInputBtn && inputChange ? ClearInputBtn : undefined
    }),
    [props?.controlComponent, props.isClearInputBtn, inputChange]
  );

  useEffect(() => {
    if (props.valueSelected) {
      setSelectedOption(props.valueSelected);
      setInputChange(props.valueSelected.label);
    }
  }, [props.valueSelected]);

  return (
    <Select
      menuPlacement={props.menuPlacement}
      components={props?.components ?? selectComponents}
      options={props.optionList.map((item: OptionTypeControlComponent) => ({
        value: item.value,
        label: item.label
      }))}
      defaultValue={props.defaultValue ?? props.optionList[0]}
      isDisabled={props.isDisabled}
      isLoading={props.isLoading}
      isClearable={props.isClearInputBtn}
      placeholder={
        props.placeholderName ?? t("footer:searchPlaceholderDefault")
      }
      classNamePrefix={props.classNamePrefix ?? "defaultInterfaceDropDown"}
      value={
        selectedOption ??
        (inputChange && { value: inputChange, label: inputChange }) ??
        undefined
      }
      onChange={(v) => {
        if (v) {
          props.onValueChange({ value: v.value, label: v.label });
          setInputChange(v.label);
        } else {
          handleClearValue();
        }
      }}
      onInputChange={(v, { action }) => {
        if (action === "input-change") {
          setInputChange(v);
          if (debounceOnValChange) {
            debounceOnValChange(v);
          }
        }
      }}
      onMenuScrollToBottom={props.handleScrollMenuToBottom}
      blurInputOnSelect={false}
      styles={
        props?.stylesConfig ?? {
          placeholder: (provided, state) => ({
            ...provided,
            fontSize: "12px",
            color: "#5F5F5F"
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#2E2E2E"
          }),
          menuList: (provided) => ({
            ...provided,
            padding: 0,
            maxHeight: "9.25rem"
          })
        }
      }
    />
  );
};

export default DropDownInput;
