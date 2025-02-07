import { useEffect } from "react";

import Dev from "@components/dev";
import { Outlet } from "react-router-dom";

import { Header, RightSideBar, Footer } from "./components";

function MainLayout(): JSX.Element {
  return (
    <div className="App h-full w-full bg-gray-001 text-color-white text-sm font-roboto font-normal">
      {/* <div className="header z-50 w-full left-0 top-0">
        <Header />
      </div> */}
      <div className="body relative w-full h-full">
        <div className="flex flex-row w-full h-full">
          <RightSideBar />
          <div className="w-full h-full flex flex-col overflow-hidden pr-1">
            <Header />
            <div className="h-full flex-1 overflow-hidden bg-[#ebebeb]">
              <div className="h-full" style={{background: "#FFFFFF" , marginTop: ".05rem"}}>
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <Dev />
    </div>
  );
}

export default MainLayout;
