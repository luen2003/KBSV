import clsx from "clsx";
import type { PropsCustom } from "src/types/propsCustom";

interface IProps {
  customClassName?: string;
  currentSlide?: string;
  slideCount?: string;
}

export default function ArrowSlice({
  className,
  customClassName,
  currentSlide,
  slideCount,
  ...props
}: PropsCustom<IProps, "button">) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        customClassName,
        "before:!content-none cursor-pointer"
      )}
    >
      {props.children}
    </span>
  );
}
