import TableParam from '@components/common/Table/interface/TableParam';
import * as api from './index';
import { TableParam2BackendQuery } from '@components/common/Table/interface/TableParam2BackendQuery';

export const getReconciliationDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/reconciliation/loadDataTable`;
        const response = await api.default.withAuth.get(url, {
            params: params
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getDetailReconciliation = async (id: Number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/reconciliation/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const generateReconciliation = async (body: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/reconciliation/generateReconciliation`;
        const response = await api.default.withAuth.post(url, body);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const downloadReconciliation = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/reconciliation/download/${id}`;
        const response = await api.default.withAuth.get(url, {
            responseType: 'blob',
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}