import { config } from "@configs";
import axios from "axios";
import * as api from "./index";

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
    const url = `http://10.100.20.99/authentication-be-v1.0.1/api/v1/authenticate`;
    const response = await axios.post(url, {
      username,
      password,
      clientId: "aml" // Thêm clientId vào nếu cần thiết
    });

    console.log(response.data); // Kiểm tra dữ liệu trả về
    localStorage.setItem("token", response.data.access_token);
    return response.data; // Trả về tất cả dữ liệu từ API
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
};

const loginService = {
  login,
  logout
};

export default loginService;
