import TableParam from '@components/common/Table/interface/TableParam';
import * as api from './index';
import { TableParam2BackendQuery } from '@components/common/Table/interface/TableParam2BackendQuery';
import { TableParam2Backend } from '@components/common/Table/interface/TableParam2Backend';
import { WithDrawRejectByBankStatus } from '@constants/WithDrawRejectByBankStatus';


export const getWithdrawRefusedByBankDataTable = async (params: TableParam2BackendQuery) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/transfer/loadDataTable`;

        let filters: TableParam2Backend['filters'] = params.filters ? JSON.parse(params.filters) : {};
        if (!filters.hasOwnProperty('transferStatus')) {
            filters['transferStatus'] = {
                matchMode: 'inList',
                value: [
                    WithDrawRejectByBankStatus.REJECT_TRANSFER_REQUEST,
                    WithDrawRejectByBankStatus.WAITING_FOR_UPDATE_REJECT_TRANSFER,
                    WithDrawRejectByBankStatus.WAITING_FOR_DELETE_REJECT_TRANSFER,
                ]
            };
        }
        params.filters = JSON.stringify(filters);

        const response = await api.default.withAuth.get(url, {
            params: params,
        });

        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const getWithdrawRefusedByBankDetail = async (id: number) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/transfer/${id}`;
        const response = await api.default.withAuth.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateWithdrawRefuseByBank = async (id: number) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/transfer/update-withdraw-refused-by-bank/${id}`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteWithdrawRefuseByBank = async (id: number) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const url = `${BASE_URL}/api/v1/transfer/refuse-withdraw-refused-by-bank/${id}`;
        const response = await api.default.withAuth.post(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const requestApproveWithdrawRejectByBank = async (id: number, accepted: boolean, reason?: any) => {
    try {
        const baseURL_API = import.meta.env.VITE_API_BASE_URL;
        const url = `${baseURL_API}/api/v1/transfer/withdraw-refused-by-bank/approve-request/${id}`;
        const response = await api.default.withAuth.put(url, { accepted, reason });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
