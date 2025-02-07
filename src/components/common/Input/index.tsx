import { type ReactNode, useState, type InputHTMLAttributes } from "react";

import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-react";

export interface InputPropsC extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: boolean;
  status?: "error" | "disable";
  classNames?: {
    wrap?: string;
    textarea?: string;
    eye?: string;
    input?: string;
  };
}

const Input = ({
  iconLeft,
  iconRight,
  status,
  classNames,
  ...props
}: InputPropsC) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!iconRight);

  const handleShowHideClick = () => {
    setShowPassword(!showPassword);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={clsx(
        "flex items-center pl-4 pr-2.5 py-2 rounded text-14px bg-transparent border",
        classNames?.wrap,
        status === "disable"
          ? "border-gray-005 !bg-gray-005 text-gray-012"
          : status === "error"
          ? "border-color-red text-gray-012"
          : isFocused
          ? "border-color-primary text-gray-012"
          : !isFocused && props.value
          ? "border-gray-009 text-gray-012"
          : "border-gray-009 text-gray-009"
      )}
    >
      {iconLeft}

      <input
        {...props}
        type={showPassword ? "text" : "password"}
        onFocus={handleInputFocus}
        onBlur={(e) => {
          handleInputBlur();
          if (typeof props.onBlur === "function") props.onBlur(e);
        }}
        className={clsx(
          classNames?.input,
          "flex-1 outline-none bg-transparent text-14px",
          status === "disable"
            ? "text-gray-012 placeholder-gray-012 pointer-events-none"
            : status === "error"
            ? "text-gray-012 placeholder-gray-012"
            : isFocused
            ? "text-gray-012 placeholder-gray-012"
            : !isFocused && props.value
            ? "text-gray-012 placeholder-gray-012"
            : "text-gray-009 placeholder-gray-009"
        )}
      />
      {iconRight && (
        <div onClick={handleShowHideClick}>
          {showPassword ? (
            <Eye className={clsx("w-18px h-18px ml-1.5", classNames?.eye)} />
          ) : (
            <EyeSlash className="w-18px h-18px ml-1.5" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
