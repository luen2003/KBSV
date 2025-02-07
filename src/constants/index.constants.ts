import { type ISymbolSearch } from "@interfaces/board.interfaces";

export const INDEXS = ["HOSE", "30", "HNX", "HNX30", "UPCOM"];
export const MAP_INDEXS_SHOW = {
  HOSE: "VNINDEX",
  "30": "VN30",
  HNX30: "HNX30",
  UPCOM: "UPCOM",
  HNX: "HNX"
};
export const MAP_INDEXS_API = {
  HOSE: "VNINDEX",
  "30": "VN30",
  HNX30: "HNX30",
  UPCOM: "UPCOMINDEX",
  HNX: "HNXINDEX"
};

export const INDEXS_INFO: ISymbolSearch[] = [
  {
    symbol: "VNINDEX",
    exchange: "HOSE",
    name: "",
    nameEn: "",
    re: 0,
    ceiling: 0,
    floor: 0,
    type: ""
  },
  {
    symbol: "VN30",
    exchange: "HOSE",
    name: "",
    nameEn: "",
    re: 0,
    ceiling: 0,
    floor: 0,
    type: ""
  },
  {
    symbol: "HNX30",
    exchange: "HNX",
    name: "",
    nameEn: "",
    re: 0,
    ceiling: 0,
    floor: 0,
    type: ""
  },
  {
    symbol: "UPCOMINDEX",
    exchange: "UPCOM",
    name: "",
    nameEn: "",
    re: 0,
    ceiling: 0,
    floor: 0,
    type: ""
  },
  {
    symbol: "HNXINDEX",
    exchange: "HNX",
    name: "",
    nameEn: "",
    re: 0,
    ceiling: 0,
    floor: 0,
    type: ""
  }
];
