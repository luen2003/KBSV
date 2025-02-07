import type TableParam from '@components/common/Table/interface/TableParam';

import * as api from './index';

export const getRoleDataTable = async (params: TableParam) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/role/loadDataTable`;

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getRoleDetail = async (id: number) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/role/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const saveRole = async (body: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/role`;
        const response = await api.default.withAuth.post(url, body);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteRole = async (data: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/role/${data.id}`;
        delete data.id;
        const response = await api.default.withAuth.delete(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateRole = async (data: any) => {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/role/${data.id}`;
    delete data.id;
    const response = await api.default.withAuth.put(url, data);
    return response.data;
}

export const getRoleAndCheckPermissionByUser = async (userId: number) => {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/role/list-by-user/${userId}`;
    const response = await api.default.withAuth.get(url);
    return response.data;
}
