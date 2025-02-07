import * as api from './index';

export const getTransferDepositDetail = async (ids?: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_BANK_GATEWAY_URL;
        const apiKey = import.meta.env.VITE_BANK_GATEWAY_API_KEY;

        const url = `${baseURL_API}/api/v1/transfer/requests`;

        const response = await api.default.withAuth.post(url, { ids }, {
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching transfer deposit detail:', error);
        return null;
    }
}



