import TableParam from '@components/common/Table/interface/TableParam';
import * as api from './index';

export const getUserDataTable = async (params: TableParam) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/user/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getUserDetail = async (id: number) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/user/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateUser = async (id: number, params: any) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/user/${id}`;
        const response = await api.default.withAuth.put(url, params);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const assignRoleForUser = async (body: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/user/assign-roles`;
        const response = await api.default.withAuth.post(url, body);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}