import { config } from "@configs";
import {
  storeCommonUpdateAuth,
  storeUpdateAccountInfo
} from "@store/slices/commonSlice";
import { store } from "@store/store";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { t } from "i18next";
import _ from "lodash";
import toast from "react-hot-toast";

const CONTENT_TYPE = "application/json";
const CONTENT_TYPE_XML = "text/xml";

const baseURL = import.meta.env.VITE_API_URL_PUBLIC;
const baseURL_SAS = import.meta.env.VITE_API_URL_PUBLIC_SAS;
const baseURL_OPENAPI = import.meta.env.VITE_API_URL_PUBLIC_OPENAPI;
const token = import.meta.env.VITE_API_URL_PUBLIC_TOKEN;
const transtime = import.meta.env.VITE_API_URL_PUBLIC_TRANSTIME;
const otpSmsUrl = import.meta.env.VITE_SMS_API_URL;
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const requestConfig = async (config: InternalAxiosRequestConfig<any>) => {
  return config;
};

const setToken = async (config: InternalAxiosRequestConfig<any>) => {
  const token = store.getState().common.auth.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const setExtendInfo = async (config: InternalAxiosRequestConfig<any>) => {
  const menu = store.getState().common.selectedMenu;
  if (menu) {
    config.headers.menuId = menu?.id;
  }
  return config;
};

const errorRes = async (error: any) => {
  if (error.code === "ERR_NETWORK") {
    toast.error(`${t("toastErrorException:base")}`);
  }
  if (error?.response?.status) {
    if (error.response.status === 400 || error.response.status === 500) {
      const errorCode = _.get(error, "response.data.errorCode", "");
      const message = `admin.${errorCode}` != t(`toastErrorException:admin:${errorCode}`) ?
        t(`toastErrorException:admin:${errorCode}`) :
        _.get(error, "response.data.message", "");
      toast.error(t(message));
      return await Promise.resolve(error.response);
    }
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        store.dispatch(storeUpdateAccountInfo());
        store.dispatch(storeCommonUpdateAuth());
      }
      return await Promise.resolve(error.response);
    }
    if (error.response.status === 403) {
      toast.error(t("toastErrorException:forbiddenResource"));
      return await Promise.resolve(error.response);
    }

    toast.error(`${t("toastErrorException:base")}`);
    return await Promise.resolve(error.response);
  }
  return await Promise.reject(error);
};

const unAuthen = axios.create({
  baseURL,
  headers: {
    "Content-Type": CONTENT_TYPE
  }
});

const unAuthenSAS = axios.create({
  baseURL: baseURL_SAS,
  headers: {
    "Content-Type": CONTENT_TYPE
  }
});

const otpSms = axios.create({
  baseURL: otpSmsUrl,
  headers: {
    "Content-Type": CONTENT_TYPE_XML,
    SOAPAction: ""
  }
});

unAuthen.interceptors.request.use(requestConfig);

const unAuthenWithToken = axios.create({
  baseURL,
  headers: {
    "Content-Type": CONTENT_TYPE,
    token,
    transtime
  }
});

const authenOpenApi = axios.create({
  baseURL: baseURL_OPENAPI,
  headers: {
    "Content-Type": CONTENT_TYPE,
    token,
    transtime,
    "x-via": config.xVia
  }
});

const authenSAS = axios.create({
  baseURL: baseURL_SAS,
  headers: {
    "Content-Type": CONTENT_TYPE,
    token,
    transtime,
    "x-via": config.xVia
  }
});

const unAuthenOpenApi = axios.create({
  baseURL: baseURL_OPENAPI,
  headers: {
    "Content-Type": CONTENT_TYPE,
    transtime,
    "x-via": config.xVia
  }
});

const withAuth = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": CONTENT_TYPE,
    transtime,
    "x-via": config.xVia
  }
});

authenSAS.interceptors.request.use(setToken);
authenSAS.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  errorRes
);
authenSAS.interceptors.request.use(requestConfig);

authenOpenApi.interceptors.request.use(setToken);

authenOpenApi.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  errorRes
);

withAuth.interceptors.request.use(setToken);
withAuth.interceptors.request.use(setExtendInfo);
withAuth.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  errorRes
);
const api = {
  unAuthen,
  unAuthenWithToken,
  unAuthenSAS,
  authenSAS,
  unAuthenOpenApi,
  authenOpenApi,
  otpSms,
  withAuth
};

export default api;
