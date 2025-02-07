import { type ISymbolSearch } from "@interfaces/board.interfaces";

import HighlightText from "../HighlightText";
interface IProps extends ISymbolSearch {
  active?: boolean; // hover
  isSole?: boolean;
  search?: string;
}
export default function SymbolSearchItem({
  symbol,
  search,
  exchange,
  name
}: IProps) {
  return (
    <div className="flex flex-col gap-2 py-ten">
      <h1 className="max-laptop:text-[13px]">
        <HighlightText
          text={symbol}
          searchText={search ?? ""}
          classNames={{ highlight: "bg-transparent text-color-primary" }}
        />{" "}
        <b className="rounded-[14px] bg-gray-600/50 px-1 py-2px text-10px font-normal text-gray-400">
          {exchange}
        </b>
      </h1>
      <p className="text-11px text-gray-400">{name}</p>
    </div>
  );
}
