import { type HTMLProps, useState, type ReactNode } from "react";

import clsx from "clsx";

interface ButtonFooterProps extends HTMLProps<HTMLDivElement> {
  icon?: ReactNode;
  label?: string;
  classNames?: { wrap?: string; label?: string };
}

const ButtonFooter = ({
  icon,
  label,
  classNames,
  ...props
}: ButtonFooterProps) => {
  return (
    <div
      {...props}
      className={clsx(
        "flex items-center gap-2 px-4 rounded-2xl py-1 cursor-pointer text-gray-011 bg-gray-005 select-none",
        classNames?.wrap
      )}
    >
      {icon}
      <span className={clsx("text-sm font-normal", classNames?.label)}>
        {label}
      </span>
    </div>
  );
};

export default ButtonFooter;
