import { LIST_THEME } from "@constants/common";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { type IAccountInfo } from "@services/account.service";
import { type ILoginSuccess } from "@services/login.service";
import { KEY_COMMON } from "@store/constants";
import type { Data } from "@types";

export interface ICommonState {
  theme: Data.Theme;
  isLogin: boolean;
  sidebar: {
    isOpen: boolean;
  };
  auth: ILoginSuccess;
  accountsInfo?: IAccountInfo | undefined;
  permissions?: string[];
  menus?: {
    id: number,
    name: string,
    href: string,
  }[];
  selectedMenu?: {
    id: number,
    name: string,
    href: string,
  } | null,
}

const initialState: ICommonState = {
  theme: LIST_THEME[0],
  isLogin: false,
  sidebar: {
    isOpen: true
  },
  auth: {
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    refresh_token_expires_in: null,
    token_type: "",
    username: "",
    roles: [""]
  },
  permissions: [],
  menus: [],
  selectedMenu: null,
};

export const storeCommonChangeTheme =
  createAction<Data.Theme>("common/changeTheme");

export const storeCommonUpdateAuth = createAction<ILoginSuccess | undefined>(
  "common/storeCommonUpdateAuth"
);

export const storePermissionsInMenu = createAction<string[] | undefined>(
  "common/storePermissionsInMenu"
);

export const storeSelectedMenu = createAction<any | undefined>(
  "common/storeSelectedMenu"
);

export const storeMenus = createAction<any[] | undefined>(
  "common/storeMenus"
);

export const storeToggleSideBar = createAction<boolean>("common/toggleSideBar");

export const storeUpdateAccountInfo = createAction<IAccountInfo | undefined>(
  "common/updateAccountInfo"
);

export const commonSlice = createSlice({
  initialState,
  name: KEY_COMMON,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(storeCommonChangeTheme, (state, { payload }) => {
      state.theme = payload;
    });
    builder.addCase(storeToggleSideBar, (state, { payload }) => {
      state.sidebar.isOpen = payload;
    });
    builder.addCase(storeCommonUpdateAuth, (state, { payload }) => {
      if (payload?.access_token && payload?.access_token !== "") {
        state.auth = {
          access_token: payload.access_token,
          refresh_token: "",
          expires_in: 0,
          token_type: "",
          roles: payload.roles,
          refresh_token_expires_in: payload.refresh_token_expires_in,
          username: payload.username
        };
        state.isLogin = true;
      } else {
        state.auth = { ...initialState.auth };
        state.isLogin = false;
      }
    });
    builder.addCase(storeUpdateAccountInfo, (state, { payload }) => {
      if (payload) {
        state.accountsInfo = { ...payload };
      } else {
        state.accountsInfo = { ...initialState.accountsInfo };
      }
    });
    builder.addCase(storePermissionsInMenu, (state, { payload }) => {
      state.permissions = payload || [];
    });
    builder.addCase(storeMenus, (state, { payload }) => {
      state.menus = payload || [];
    });
    builder.addCase(storeSelectedMenu, (state, { payload }) => {
      state.selectedMenu = payload || null;
    });
  }
});

export default commonSlice.reducer;
