import { type ReactNode } from "react";

import type { ICommon } from "./common";

export declare namespace Data {
  interface SuccessResponse<T> {
    status: "success";
    data: T;
  }

  interface ErrorResponse {
    status: "error";
    message?: string;
  }

  type AxiosResponse<T> = SuccessResponse<T> | ErrorResponse;

  type Theme = {
    id: ICommon.ITheme;
    name: string;
  };
  type CodeLanguage = 1 | 2;

  type Language = {
    id: ICommon.ILanguage;
    name: string;
    image: string;
    code: CodeLanguage;
  };

  type ItemTab = {
    id: string;
    renderTitle: ReactNode;
    key: number;
    renderContent: ReactNode;
  };

  type IQueryParams = {
    filters?: any;
    rows?: number;
    first?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type IDataTableRes = {
    totalRows: number;
    rows: number;
    first: number;
    items: IActionLog[] | [];
    sortOrder?: string;
  };

  type IActionLog = {
    id: string;
    user: string;
    action: string;
    url: string;
    method: string;
    ip: string;
    request: string;
    response: string;
    createdAt: string;
  };

  type IErrorRes = {
    code: number;
    errorCode: string;
    message: string;
    transactionTime: number;
  };
}
