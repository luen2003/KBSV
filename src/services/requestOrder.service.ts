import { RequestOrderType } from "@constants/RequestOrderType";
import * as api from "./index";
import { requestApproveInternalTransferAccount } from "./InternalTransferAccountServices";
import { requestCreditNote } from "./CreditNoteService";
import { approveCitadAccount, rejectCitadAccount } from "./CitadAccountService";
import { approveBankConfig, rejectBankConfig } from "./BankService";
import {
  approveUncompletedWithdrawRequest,
  rejectUncompletedWithdrawRequest,
} from "./TransferService";
import { requestApproveBlacklistAccount } from "./BlacklistAccountService";
import managePaymentIdService from "./managePaymentId.service";
import { requestApproveWithdrawRejectByBank } from "./withdraw-refused-by-bank.service";

// Dữ liệu giả lập khi dùng mockUser
const mockRequestOrders = {
  totalRows: 2,
  first: 0,
  rows: 2,
  items: [
    {
      id: "12345",
      sourceId: 55,
      type: "INTERNAL_TRANSFER_ACCOUNT",
      status: "PENDING",
      transDate: "2025-02-06T11:00:37.163+07:00",
      createdBy: "mockUser",
      createdAt: "2025-02-06T11:00:37.163+07:00",
      approvedBy: null,
      approvedAt: null,
      description: "Mock data request order",
      action: "CREATE",
    },
    {
      id: "67890",
      sourceId: 77,
      type: "BANK_CONFIG",
      status: "APPROVED",
      transDate: "2025-02-06T11:10:45.123+07:00",
      createdBy: "mockUser",
      createdAt: "2025-02-06T11:10:45.123+07:00",
      approvedBy: "admin",
      approvedAt: "2025-02-06T11:12:30.567+07:00",
      description: "Mock bank config request",
      action: "UPDATE",
    },
  ],
};

export const getRequestOrderDataTable = async (params: any) => {
  try {
    const mockUsername = localStorage.getItem("mockUsername");

    if (mockUsername) {
      console.log("Using mock data for request orders");
      return mockRequestOrders;
    }

    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/request-order/loadDataTable`;

    const response = await api.default.withAuth.get(url, { params });
    console.log(response.data);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getRequestOrderDetail = async (id: string) => {
  try {
    const mockUsername = localStorage.getItem("mockUsername");

    if (mockUsername) {
      console.log(`Using mock data for request order ID: ${id}`);
      return mockRequestOrders.items.find((item) => item.id === id);
    }

    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/request-order/${id}`;
    const response = await api.default.withAuth.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// Xử lý phê duyệt yêu cầu theo type
export const approveRequest = async (data: any) => {
  try {
    if (localStorage.getItem("mockUsername")) {
      console.log(`Mock approve request: ${data?.id}`);
      return { success: true, message: "Mock request approved" };
    }

    switch (data?.type) {
      case RequestOrderType.INTERNAL_TRANSFER_ACCOUNT:
        return requestApproveInternalTransferAccount(data.sourceId, true);
      case RequestOrderType.TRANSFER_ACCOUNTING_ERROR:
        return requestCreditNote(data?.id, true);
      case RequestOrderType.CITAD_ACCOUNT:
        return approveCitadAccount(data?.sourceId);
      case RequestOrderType.BANK_CONFIG:
        return approveBankConfig(data?.sourceId);
      case RequestOrderType.UNCOMPLETED_PAYMENT_TRANSACTION:
        return approveUncompletedWithdrawRequest(data?.sourceId);
      case RequestOrderType.BLACKLIST_ACCOUNT:
        return requestApproveBlacklistAccount(data?.sourceId, true);
      case RequestOrderType.BANK_AMOUNT_SETTING:
        return managePaymentIdService.approveManagePaymentId(data?.sourceId);
      case RequestOrderType.REJECTED_PAYMENT_TRANSACTION:
        return requestApproveWithdrawRejectByBank(data?.id, true);
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

// Xử lý từ chối yêu cầu theo type
export const rejectRequest = async (data: any, reason: string) => {
  try {
    if (localStorage.getItem("mockUsername")) {
      console.log(`Mock reject request: ${data?.id}`);
      return { success: true, message: "Mock request rejected", reason };
    }

    switch (data?.type) {
      case RequestOrderType.INTERNAL_TRANSFER_ACCOUNT:
        return requestApproveInternalTransferAccount(data.sourceId, false, reason);
      case RequestOrderType.TRANSFER_ACCOUNTING_ERROR:
        return requestCreditNote(data?.id, false, reason);
      case RequestOrderType.CITAD_ACCOUNT:
        return rejectCitadAccount(data?.sourceId, reason);
      case RequestOrderType.BANK_CONFIG:
        return rejectBankConfig(data?.sourceId, reason);
      case RequestOrderType.UNCOMPLETED_PAYMENT_TRANSACTION:
        return rejectUncompletedWithdrawRequest(data?.sourceId, reason);
      case RequestOrderType.BLACKLIST_ACCOUNT:
        return requestApproveBlacklistAccount(data?.sourceId, false, reason);
      case RequestOrderType.BANK_AMOUNT_SETTING:
        return managePaymentIdService.rejectManagePaymentId(data?.sourceId, reason);
      case RequestOrderType.REJECTED_PAYMENT_TRANSACTION:
        return requestApproveWithdrawRejectByBank(data?.id, false, reason);
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
};
