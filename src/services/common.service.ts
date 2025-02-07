import { type Data } from "@types";

import api from ".";

export interface IBankInfo {
  id: number;
  version: number;
  uuid: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: any;
  deleted: number;
  deletedAt: any;
  deletedBy: any;
  props: string;
  bankNo: number;
  bankCode: string;
  napasBankCode: any;
  citadBankCode: any;
  shortName: string;
  name: string;
  description: string;
  isCitadTransfer: number;
  isNapasTransfer: number;
  codeShortName?: string;
  noCodeShortName?: string;
}

interface IGetBankInfoRes {
  code: number;
  errorCode: any;
  message: string;
  value: IBankInfo[];
}
export const getBankInfo = async (): Promise<
  Data.AxiosResponse<IGetBankInfoRes>
> => {
  try {
    const url = `/api/v1/bank`;
    const response = await api.withAuth.get(url);
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};
