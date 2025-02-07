import { TableParam2BackendQuery } from '@components/common/Table/interface/TableParam2BackendQuery';
import * as api from './index';

export const getCitadAccountMaster = async () => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank`;

        const response = await api.default.withAuth.get(url);

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getCitadAccountDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const createCitadAccount = async (data: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account`;
        const response = await api.default.withAuth.post(url, {
            bankId: data.bankId,
            accountNumber: data.accountNumber,
            customerName: data.customerName,
            afAccountNumber: data.afAccountNumber,
            fullAfAccountNumber: data.fullAfAccountNumber,
            description: data.description ? data.description : undefined
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteCitadAccount = async (data: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account/${data.id}`;
        delete data.id;
        const response = await api.default.withAuth.delete(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getCitadAccountDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getCitadAccountDetailAll = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account/allRecords/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const approveCitadAccount = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account/approve/${id}`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const rejectCitadAccount = async (id: number, reasonReject: string) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/temporary/citad-account/reject/${id}`;
        const response = await api.default.withAuth.post(url, {
            reason: reasonReject
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}