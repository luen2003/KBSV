import { type Data } from "@types";

import api from ".";

export interface IMenuItemPermission {
  id: number;
  deleted: number;
  props: string | null;
  name: string;
  code: string;
}

export interface IMenuItem {
  id: 13;
  name: string;
  webElementId: string | null;
  ord: string | null;
  icon: string | null;
  parentId: number | null;
  code: string;
  inActive: string | null;
  description: string | null;
  hide: number;
  href: string | null;
  settings: string | null;
  children: IMenuItem[];
  permissions: IMenuItemPermission[];
}

interface IGetAllMenuRes {
  code: number;
  message: string;
  value: IMenuItem[];
}

export interface IRole {
  authority: string;
  name: string;
  status: boolean;
  description: string;
  users: any;
  menuPermissions: any;
  id: number;
  version: number;
  uuid: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deleted: number;
  deletedAt: string;
  deletedBy: string;
}

interface IUpdatePermissionMenu {
  param: {
    role: IRole;
    menu: IMenuItem[];
  };
}

export interface IRoleInfo {
  id: number;
  name: string;
  authority: string;
  description: null | string;
  ownRole: boolean;
}

export interface IUserInfo {
  createAt: null | string;
  createBy: null | string;
  deleted: number;
  email: string;
  fullName: string;
  id: number;
  updateAt: null | string;
  updateBy: null | string;
  username: string;
}

export interface IListUserByRoleRes {
  code: number;
  message: string;
  value: {
    inList: IUserInfo[];
    outList: IUserInfo[];
  };
}

interface IUpdateUserByRoleParam {
  role: IRole;
  user: IUserInfo[]
}

export const getAllMenu = async (): Promise<
  Data.AxiosResponse<IGetAllMenuRes>
> => {
  try {
    const url = `/api/v1/menu/get-all`;
    const response = await api.withAuth.get(url);
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

export const getMenuByRole = async (
  role: string
): Promise<Data.AxiosResponse<IGetAllMenuRes>> => {
  try {
    const url = `/api/v1/menu/get-by-role?role=${role}`;
    const response = await api.withAuth.get(url);
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

export const updatePermissionMenu = async (
  params: IUpdatePermissionMenu["param"]
): Promise<Data.AxiosResponse<IGetAllMenuRes>> => {
  try {
    const url = `/api/v1/role-menu-permission/update-by-role`;
    const response = await api.withAuth.post(url, {
      role: params.role,
      menu: params.menu
    });
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

export const getListUserByRole = async (
  roleId: number
): Promise<Data.AxiosResponse<IListUserByRoleRes>> => {
  try {
    const url = `/api/v1/user/get-by-role/${roleId}`;
    const response = await api.withAuth.get(url);
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

export const updateUserbyRole = async (
  params: IUpdateUserByRoleParam
): Promise<Data.AxiosResponse<IListUserByRoleRes>> => {
  try {
    const url = `/api/v1/user/update-by-role`;
    const response = await api.withAuth.post(url, {
      role: params.role,
      users: params.user
    });
    return { status: "success", data: response.data };
  } catch (e) {
    return { status: "error", message: "error" };
  }
};

const systemService = {
  getMenuByRole,
  getAllMenu,
  updatePermissionMenu,
  getListUserByRole,
  updateUserbyRole
};

export default systemService;
