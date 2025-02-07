import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { KEY_BREADCRUMB, KEY_COMMON } from "./constants";
import { breadcrumbSlice, commonSlice } from "./slices";

const persistCommon = {
  key: KEY_COMMON,
  storage
};

const persistedCommonReducer = persistReducer(persistCommon, commonSlice);

const reducer = {
  [KEY_COMMON]: persistedCommonReducer,
  [KEY_BREADCRUMB]: breadcrumbSlice
};
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
