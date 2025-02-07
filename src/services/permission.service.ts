import * as api from "./index";
import { ResponseCode } from "@constants/response-code.constants";

// Định nghĩa interface PermissionInfoDto
export interface PermissionInfoDto {
  id: number;
  deleted: number;
  props: string;
  name: string;
  code: string;
}

// Dữ liệu mock cho mockUser
const mockPermissions: PermissionInfoDto[] = [
  {
    id: 1,
    deleted: 0,
    props: "{}",
    name: "Xem",
    code: "VIEW",
  },
  {
    id: 5,
    deleted: 0,
    props: "{}",
    name: "Phê duyệt",
    code: "APPROVE",
  },
];

const getByMenuAndUser = async (menuId: number): Promise<PermissionInfoDto[]> => {
  try {
    const username = localStorage.getItem("mockUsername");

    if (username) {
      // Nếu là mock user, trả về dữ liệu giả lập
      console.log("Using mock permissions for", username);
      return mockPermissions;
    }

    // Nếu không phải mock user, gọi API thật
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = `${BASE_URL}/api/v1/permission/get-by-menu-and-user/${menuId}`;

    const response = await api.default.withAuth.get(url);
    console.log(response.data);
    
    const resBody = response.data;
    if (resBody.code !== ResponseCode.SUCCESS) {
      throw new Error(resBody.message);
    }

    return resBody.value;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const permissionService = {
  getByMenuAndUser,
};

export default permissionService;
