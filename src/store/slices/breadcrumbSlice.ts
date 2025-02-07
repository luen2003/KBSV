import { createAction, createSlice } from "@reduxjs/toolkit";
import { KEY_BREADCRUMB } from "@store/constants";

interface InitialState {
  level1: any;
  level2: any;
}

const initialState: InitialState = {
  level1: null,
  level2: null
};

export const storeUpdateBreadcrumbLevel1 = createAction<any>(
  "breadcrumb/updateBreadcrumbLevel1"
);

export const storeUpdateBreadcrumbLevel2 = createAction<any>(
  "breadcrumb/updateBreadcrumbLevel2"
);
export const storeClearBreadcrumb = createAction("breadcrumb/clearBreadcrumb");

export const breadcrumbSlice = createSlice({
  initialState,
  name: KEY_BREADCRUMB,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(storeUpdateBreadcrumbLevel1, (state, { payload }) => {
      state.level1 = payload;
    });
    builder.addCase(storeUpdateBreadcrumbLevel2, (state, { payload }) => {
      state.level2 = payload;
    });
    builder.addCase(storeClearBreadcrumb, (state) => {
      state.level1 = null;
      state.level2 = null;
    });
  }
});

export default breadcrumbSlice.reducer;
