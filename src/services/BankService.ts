import { TableParam2Backend } from '@components/common/Table/interface/TableParam2Backend';
import * as api from './index';
import { TableParam2BackendQuery } from '@components/common/Table/interface/TableParam2BackendQuery';

// Bank
export const getBankMaster = async () => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank`;

        const response = await api.default.withAuth.get(url);

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getBankDataTable = async (params: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}
// Bank Config
export const getBankConfigDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank-config/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// Temporary Bank Config
export const getTempBankConfigDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/bank-config/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateTempBankConfig = async (data: any) => {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/temporary/bank-config/${data.id}`;
    delete data.id;
    const response = await api.default.withAuth.put(url, data);
    return response.data;
}

export const getTempBankConfigDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/bank-config/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
export const approveBankConfig = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/bank-config/approve/${id}`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const rejectBankConfig = async (id: number, reasonReject: string) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/bank-config/reject/${id}`;
        const response = await api.default.withAuth.post(url, {
            reason: reasonReject
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getBankConfigMaster = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank-config/load`;
        let filters: TableParam2Backend['filters'] = params?.filters ? JSON.parse(params?.filters) : {};
        if (!filters.hasOwnProperty('isSupportTransfer')) {
            filters['isSupportTransfer'] = {
                matchMode: 'equals',
                value: 1
            };
        }
        params.filters = JSON.stringify(filters);
        const response = await api.default.withAuth.get(url, {
            params: params,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}