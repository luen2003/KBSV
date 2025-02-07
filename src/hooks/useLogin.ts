import { useAppDispatch, useAppSelector } from "./useStore";

const useLogin = () => {
  const isLogin = useAppSelector((state) => state.common.isLogin);
  const dispatch = useAppDispatch();

  const handleCheckNeedLogin = (callback: () => void) => {
    if (!isLogin) {
      return;
    }
    callback();
  };

  return {
    isLogin,
    handleCheckNeedLogin
  };
};

export default useLogin;
