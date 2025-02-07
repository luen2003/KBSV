import React from "react";

import { ToastCommon } from "@components/common";
import { store } from "@store/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";

import "./i18n";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@availity/block-ui/dist/index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastCommon />
    </Provider>
  </React.StrictMode>
);
