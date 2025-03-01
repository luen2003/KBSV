import { type InputHTMLAttributes } from "react";

import { mId } from "@helpers/utils";
import clsx from "clsx";

export default function SwitchButton({
  isOn,
  onToggle,
  id = mId(),
  disabled,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  isOn: boolean;
  onToggle: () => void;
}) {
  const classWrap = "bg-gray-012";
  const clasWrapHover = "hover:bg-gray-011";
  const classWrapActive = "bg-color-primary";
  const classWrapActiveHover = "hover:bg-color-orange";
  const classDefaultDot = "bg-gray-013";
  const classWrapDotDisabled = "!bg-gray-013";

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor={id}
        className={clsx(
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          "flex items-center"
        )}
      >
        {/* Switch Container */}
        <div className="relative overflow-auto">
          {/* Switch */}
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={isOn}
            onChange={onToggle}
            disabled={disabled}
            {...rest}
          />
          <div
            className={clsx(
              "block w-10 h-5 rounded-full",
              isOn ? classWrapActive : classWrap,
              isOn ? classWrapActiveHover : clasWrapHover,
              disabled && "!bg-gray-012"
            )}
          />
          <div
            className={clsx(
              "dot absolute left-0 top-0 transition h-full w-full flex items-center px-0.5 pointer-events-none",
              isOn && "transform translate-x-1/2"
            )}
          >
            <div
              className={clsx(
                classDefaultDot,
                disabled && classWrapDotDisabled,
                "w-14px h-14px rounded-full"
              )}
            />
          </div>
        </div>
      </label>
    </div>
  );
}
