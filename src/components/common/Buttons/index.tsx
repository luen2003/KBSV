import { type DetailedHTMLProps, type ButtonHTMLAttributes } from "react";

import clsx from "clsx";

export default function Buttons({
  className,
  size = "S",
  prop,
  type = "button",
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: "XS" | "S" | "M" | "L" | "XL";
  prop: "Outlined" | "Filled 1" | "Filled 2" | "Mua" | "Bán" | "";
}) {
  const classNameSize = (() => {
    switch (size) {
      case "XS":
        return `px-5px h-26px text-sm font-semibold 
        disabled:bg-gray-012 disabled:pointer-events-none 
        disabled:text-gray-013 disabled:border-none`;
      case "S":
        return `px-22px h-8 text-sm font-semibold 
        disabled:bg-gray-012 disabled:pointer-events-none 
        disabled:text-gray-013 disabled:border-none`;
      case "M":
        return `px-6 h-9 text-sm font-semibold disabled:bg-gray-012 disabled:pointer-events-none 
        disabled:text-gray-013 disabled:border-none`;
      case "L":
        return "px-22px h-12 text-base font-medium disabled:bg-gray-009 disabled:text-gray-011 disabled:border-none";
      case "XL":
        return "px-22px h-12 text-base font-medium disabled:bg-gray-009 disabled:text-gray-011 disabled:border-none";
      default:
        return "";
    }
  })();

  const classNameProp = (() => {
    switch (prop) {
      case "Outlined":
        return `border rounded text-color-primary border-color-primary
         hover:bg-gray-006 bg-gray-005`;
      case "Filled 1":
        return "bg-color-primary text-color-Textbutton rounded hover:text-gray-013";
      case "Filled 2":
        return "bg-gray-008 text-gray-012 rounded hover:bg-gray-009";
      case "Mua":
        return "bg-color-green001 text-gray-013 rounded";
      case "Bán":
        return "bg-color-red rounded";
      default:
        break;
    }
  })();

  return (
    <button
      type={type}
      {...rest}
      className={clsx(
        classNameSize,
        className,
        classNameProp,
        "flex justify-center items-center"
      )}
    />
  );
}
