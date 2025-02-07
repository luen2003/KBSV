import { type ReactNode } from "react";

export interface IPropsModalCustom {
  open?: boolean;
  setOpen?: (e: boolean) => void;
  children?: ReactNode;
  classWrap?: string;
  classPanel?: string;
  className?: string;
  classBg?: string;
}
