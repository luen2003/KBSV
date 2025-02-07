import { LIST_THEME } from "@constants/common";
import { storeCommonChangeTheme } from "@store/slices/commonSlice";
import type { Data } from "@types";

import { useAppDispatch, useAppSelector } from "./useStore";

const useTheme = () => {
  const theme = useAppSelector((state) => state.common.theme);
  const dispatch = useAppDispatch();

  const handleChangeTheme = (newTheme: Data.Theme) => {
    if (newTheme) dispatch(storeCommonChangeTheme(newTheme));
  };

  return {
    theme: LIST_THEME.find((tL) => theme.id === tL.id) ?? LIST_THEME[1],
    handleChangeTheme
  };
};

export default useTheme;
