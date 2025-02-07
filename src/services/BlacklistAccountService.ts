import TableParam from '@components/common/Table/interface/TableParam';
import * as api from './index';

export const getAccountBlacklistDataTable = async (params: TableParam) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/blacklist-account/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getAccountBlackListDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/blacklist-account/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const createAccountBlacklist = async (params: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/blacklist-account`;
        const response = await api.default.withAuth.post(url, params);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateAccountBlacklist = async (id: number, params: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/blacklist-account/${id}`;
        const response = await api.default.withAuth.put(url, params);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteAccountBlacklist = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/blacklist-account/${id}`;
        const response = await api.default.withAuth.delete(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const requestApproveBlacklistAccount = async (id: number, accepted: boolean, reason?: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/blacklist-account/approve-request/${id}`;
        const response = await api.default.withAuth.put(url, { accepted, reason });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}