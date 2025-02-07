import TableParam from '@components/common/Table/interface/TableParam';
import * as api from './index';
import { TableParam2BackendQuery } from '@components/common/Table/interface/TableParam2BackendQuery';

export const getErrorAccountingTransferDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/deposit-fail/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getUncompletedWithdrawTransferDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/withdraw-uncompleted/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getTransferDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const getTransferDepositDataTable = async (params: TableParam) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/deposit/loadDataTable`;
        
        const response = await api.default.withAuth.get(url, {
            params: params,
        });
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const requestCompleteUncompletedWithdraw = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/${id}/request-complete-uncompleted-withdraw`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const requestRefuseUncompletedWithdraw = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/${id}/request-refuse-uncompleted-withdraw`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getWithdrawTransferDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/withdraw/loadDataTable`;
        const response = await api.default.withAuth.get(url, {
            params: params,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const approveUncompletedWithdrawRequest = async (transferId: string) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/${transferId}/approve-uncompleted-withdraw`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const rejectUncompletedWithdrawRequest = async (transferId: string, reason: string) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/${transferId}/reject-uncompleted-withdraw`;
        const response = await api.default.withAuth.post(url, {
            reason,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}