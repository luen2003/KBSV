import * as api from "./index";
import { type Data } from "@types";

export const fetchTransferLogs = async (
  params: Data.IQueryParams
): Promise<Data.IDataTableRes | Data.IErrorRes | null> => {
  try {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/transfer-log/loadDataTable`;
    const response = await api.default.withAuth.get(url, { params });
    return response.data;
  } catch (e: any) {
    return e?.response?.data;
  }
};
