import { config } from "@configs";
import axios from "axios";
import * as api from './index';

export interface ILoginSuccess {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number | null;
  token_type: string;
  username: string;
  roles: string[];
}

export interface ILoginError {
  code: number;
  errorCode: string;
  message: string;
  transactionTime: number;
}

const login = async (
  username: string,
  password: string
): Promise<ILoginSuccess | ILoginError | null> => {
  try {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/auth/login`;
    const response = await axios.post(url, {
      username,
      password
    });
    console.log(response.data)
    return response.data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

const logout = async () => {
  try {
    const baseURL_API = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL_API}/api/v1/auth/logout`;
    const response = await api.default.withAuth.post(url, {});
    return response.data;
  } catch (e: any) {
    return e?.response?.data;
  }
}

const loginService = {
  login,
  logout,
};

export default loginService;
