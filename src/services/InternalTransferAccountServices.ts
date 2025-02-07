import * as api from './index';

export const getInternalTransferAccountMaster = async () => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/internal-transfer-account`;

        const response = await api.default.withAuth.get(url);
        
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const saveInternalTransferAccount = async (body: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/internal-transfer-account`;
        const response = await api.default.withAuth.post(url, body);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getInternalTransferAccountDataTable = async (params: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/internal-transfer-account/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const getInternalTransferAccountDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/internal-transfer-account/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteInternalTransferAccountById = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/internal-transfer-account/${id}`;
        const response = await api.default.withAuth.delete(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


export const requestApproveInternalTransferAccount = async (id: number, accepted: boolean, reason?: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/internal-transfer-account/approve-request/${id}`;
        const response = await api.default.withAuth.put(url, { accepted, reason });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}