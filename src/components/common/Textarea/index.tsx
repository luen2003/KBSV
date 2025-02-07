import { type ReactNode, useState, type TextareaHTMLAttributes } from "react";

import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  iconLeft?: ReactNode;
  iconRight?: boolean;
  status?: "error" | "disable";
  isTextarea?: boolean;
  classNames?: { wrap?: string; textarea?: string };
}

const Textarea = ({ status, classNames, ...props }: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);

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
      <textarea
        {...props}
        onFocus={handleInputFocus}
        onBlur={(e) => {
          handleInputBlur();
          if (props.onBlur) props.onBlur(e);
        }}
        className={clsx(
          "flex-1 outline-none bg-transparent text-14px resize-none",
          classNames?.textarea,
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
    </div>
  );
};

export default Textarea;
