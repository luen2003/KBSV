export interface INewSymbolData {
  t: number;
  SB: string;
  SI: string;
  TD: string;
  ST: string;
  CL: number;
  FL: number;
  RE: number;
  CP: number;
  CV: number;
  CH: number;
  TT: number;
  TV: number;
  AP: number;
  OP: number;
  HI: number;
  LO: number;
  FB: number;
  FS: number;
  FR: number;
  FO: number;
  TO: number;
  TB: number;
  PP: number;
  SS: string;
  PMQ: number;
  PMP: number;
  PTQ: number;
  PTV: number;
  FC: string;
  ULS: string;
  B3: number;
  V3: number;
  B2: number;
  V2: number;
  B1: number;
  V1: number;
  S1: number;
  U1: number;
  S2: number;
  U2: number;
  S3: number;
  U3: number;
  LS: string;
  CWT: string;
  EX: string;
  EP: string;
  IT: string;
  RA: number;
  LTD?: string;
  DI?: number;
  OI?: number;
  CHP?: number;
  IN?: string;
  ER?: string;
  CPCS?: INewSymbolData;
  TSI?: "AVAILABLE" | "CALL_AUCTION_OPENING" | "OPEN" | "CALL_AUCTION_CLOSING";
}

export interface IBoardData {
  symbols?: string[];
  data?: INewSymbolData[];
}

export interface ISymbolInfoColorItem {
  data: INewSymbolData;
  color: string;
}

export type ISymbolInfoColor = Record<string, ISymbolInfoColorItem>;

export interface ISymbolSearch {
  symbol: string;
  name: string;
  nameEn: string;
  exchange: string;
  re: number;
  ceiling: number;
  floor: number;
  type: "future" | string;
}

export interface INewIndexData {
  TD?: string;
  t?: number;
  MI?: string;
  IT?: string;
  IC: string;
  ICH: string;
  IPC: string;
  TV: string;
  TVA: string;
  MS: string;
  ADV: string;
  DE: string;
  NC: string;
  MID?: string;
  MC: string;
  NOC: string;
  NOF: string;
  LO: string;
  TT?: string;
  OTV?: string;
  PTT?: string;
  PTV?: string;
  OTVA?: string;
  PPMI?: string;
  VO?: number;
}

export interface INewTradeData {
  FCV: number;
  FV: number;
  FMP: number;
  TD?: string;
  LC?: string;
  SM?: string;
  AVO?: string;
  AVA?: string;
  FT?: string;
  SB?: string;
}
