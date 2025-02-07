import { type ReactNode } from "react";

import { useAppSelector } from "@hooks/useStore";
import { PATH_LOGIN } from "@router/router.constants";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const isLogin = useAppSelector((state) => state.common.isLogin);
  const location = useLocation();
  return isLogin ? (
    children
  ) : (
    <Navigate to={PATH_LOGIN} replace state={{ from: location }} />
  );
};

export default AuthRoute;
