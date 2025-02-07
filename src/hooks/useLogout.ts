import { PATH_LOGIN } from "@router/router.constants";
import loginService from "@services/login.service";
import { storeClearBreadcrumb } from "@store/slices/breadcrumbSlice";
import {
  storeCommonUpdateAuth,
  storeUpdateAccountInfo
} from "@store/slices/commonSlice";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "./useStore";
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(storeUpdateAccountInfo());
    dispatch(storeCommonUpdateAuth());
    dispatch(storeClearBreadcrumb());
    /**
     * Logout
     */
    loginService.logout();
    navigate(PATH_LOGIN);
  };
  return {
    handleLogout
  };
};

export default useLogout;
