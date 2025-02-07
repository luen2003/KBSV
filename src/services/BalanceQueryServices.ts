import * as api from './index';

export const getBalanceQueryAccount = async (body: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/balance-query`;

        // Make the POST request with body
        const response = await api.default.withAuth.post(url, body);

        return response.data;
    } catch (e) {
        console.error('Error fetching balance query:', e);
        throw e;
    }
};

export const getAllBanks = async () => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank/getAll`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

