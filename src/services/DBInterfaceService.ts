import * as api from './index';

export const getAfAccountNumberByCustodycd = async (custodycd: string) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/customer-info/accNo`;
        const response = await api.default.withAuth.get(url, {
            params: {
                accountNumber: custodycd,
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getBankAccByAfAccountNumber = async (afAccNumber: string) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/bank-account/get-by-account-number`;
        const response = await api.default.withAuth.get(url, {
            params: {
                accountNumber: afAccNumber,
                page: 0,
                rows: 1000,
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}