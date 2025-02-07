import { type Data } from "@types";

import api from ".";
import { type IBankInfo } from "./common.service";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";

interface IPaymentIdItem {
  bank: IBankInfo;
  amountMin: number;
  amountMax: number;
  description: string;
  status: string;
  id: number;
  version: number;
  uuid: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deleted: number;
  deletedAt: string;
  deletedBy: string;
}

export interface IParamAddPaymentId {
  bankId: number | string;
  amountMin: number;
  amountMax: number;
  description: string;
  id?: number;
}

interface IAddPaymentIdRes {
  code: number;
  errorCode: any;
  message: string;
  value: IPaymentIdItem[];
}

const getListManagePaymentId = async (params: TableParam2BackendQuery) => {
  try {
    const url = `/api/v1/temporary/bank-amount-setting/loadDataTable`;
    const response = await api.withAuth.get(url, { params });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getDetailManagePaymentId = async (id: number) => {
  try {
    const url = `/api/v1/temporary/bank-amount-setting/${id}`;
    const response = await api.withAuth.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getDetailAllManagePaymentId = async (id: number) => {
  try {
    const url = `/api/v1/temporary/bank-amount-setting/allRecords/${id}`;
    const response = await api.withAuth.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const addManagePaymentId = async (
  params: IParamAddPaymentId
): Promise<Data.AxiosResponse<IAddPaymentIdRes>> => {
  try {
    const url = `/api/v1/temporary/bank-amount-setting`;
    const response = await api.withAuth.post(url, {
      bankId: params.bankId,
      amountMin: params.amountMin,
      amountMax: params.amountMax,
      description: params.description
    });
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

const deleteManagePaymentId = async (
  id: number
): Promise<Data.AxiosResponse<IAddPaymentIdRes>> => {
  try {
    const url = `/api/v1/temporary/bank-amount-setting/${id}`;
    const response = await api.withAuth.delete(url);
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

export const approveManagePaymentId = async (id: number) => {
  try {
      const baseURL_API = import.meta.env.VITE_API_BASE_URL;
      const url = `${baseURL_API}/api/v1/temporary/bank-amount-setting/approve/${id}`;
      const response = await api.withAuth.post(url);
      return response.data;
  } catch (e) {
      console.log(e);
  }
}

export const rejectManagePaymentId = async (id: number, reasonReject: string) => {
  try {
      const baseURL_API = import.meta.env.VITE_API_BASE_URL;
      const url = `${baseURL_API}/api/v1/temporary/bank-amount-setting/reject/${id}`;
      const response = await api.withAuth.post(url, {
          reason: reasonReject
      });
      return response.data;
  } catch (e) {
      console.log(e);
  }
}

const managePaymentIdService = {
  getListManagePaymentId,
  getDetailManagePaymentId,
  getDetailAllManagePaymentId,
  addManagePaymentId,
  deleteManagePaymentId,
  approveManagePaymentId,
  rejectManagePaymentId
};

export default managePaymentIdService;
