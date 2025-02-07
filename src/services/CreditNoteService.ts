import * as api from './index';

export const createCreditNote = async (data: { id: any}) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/credit-note`;

        const response = await api.default.withAuth.post(url, {
            transferId: data.id,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const cancelCreditNote = async (data: { id: any}) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/credit-note/cancel`;

        const response = await api.default.withAuth.post(url, {
            transferId: data.id,
        });

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const requestCreditNote = async (id: number, accepted: boolean, reason?: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/credit-note/approve-request/${id}`;
        const response = await api.default.withAuth.put(url, { accepted, reason });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}