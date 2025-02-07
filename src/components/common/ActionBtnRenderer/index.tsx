import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ReactNode
} from "react";

import { type RowNode } from "ag-grid-community";
import clsx from "clsx";

import Buttons from "../Buttons";

interface IProps {
  listButton: Array<
    {
      lable: string;
      onClickButton: (node: RowNode) => void;
      icon?: ReactNode;
    } & DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > & {
        size?: "XS" | "S" | "M" | "L" | "XL";
        prop: "Outlined" | "Filled 1" | "Filled 2" | "Mua" | "Bán" | "";
      }
  >;
  node: RowNode;
  classNames?: { wrap?: string; button?: string };
}

export default function ActionBtnRenderer(props: IProps) {
  return (
    <div className={clsx("flex gap-2", props.classNames?.wrap)}>
      {props.listButton.map((item) => {
        return (
          <Buttons
            className={props.classNames?.button}
            key={item.lable}
            onClick={() => item.onClickButton(props?.node)}
            prop={item.prop}
            size={item.size}
          >
            {item.icon}
            {item.lable}
          </Buttons>
        );
      })}
    </div>
  );
}
