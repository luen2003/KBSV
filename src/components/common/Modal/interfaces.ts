import { type ReactNode } from "react";

export interface IPropsModal {
  isOpen?: boolean;
  isCloseClickWrap?: boolean;
  setOpen: (e: boolean) => void;
  children?: ReactNode;
  classNames?: {
    classWrap?: string;
    classPanel?: string;
    className?: string;
    trans?: string;
    classTitle?: string;
    bg?: string;
  };
}
