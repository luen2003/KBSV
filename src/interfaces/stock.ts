export interface Stock {
  A: string;
  H: string;
  Q: string;
  RE: string;
  S: string;
  T: string;
  CL: string;
  FL: string;
  color?: string;
}

export interface IMsgSendSocket {
  event: string;
  type: string;
  data: any;
}
