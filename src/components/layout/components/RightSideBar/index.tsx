import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import {
  storeUpdateBreadcrumbLevel1,
  storeUpdateBreadcrumbLevel2
} from "@store/slices/breadcrumbSlice";
import { storeToggleSideBar } from "@store/slices/commonSlice";
import clsx from "clsx";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useLocation, useNavigate } from "react-router-dom";

import { ElMenu } from "./components";
import useRightSideBar from "./hooks/useRightSideBar";
import { PATH_REQUEST_ORDER } from "@router/router.constants";

export interface IMenu {
  id: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  name: any;
  href?: string;
  children?: IMenu[];
  isNeedLogin?: boolean;
  handleClick?: () => void;
  hide?: boolean;
}

const RightSideBar = () => {
  const [active, setActive] = useState<IMenu>();
  const sidebar = useAppSelector((state) => state.common.sidebar);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { menuSidebar } = useRightSideBar();

  const onChange = (menu: IMenu) => setActive(menu);
  const toggleSidebar = (is: boolean) => dispatch(storeToggleSideBar(is));
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(PATH_REQUEST_ORDER);
  };

  useEffect(() => {
    menuSidebar.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.children && child.children.length > 0) {
            child.children.forEach((childOfChild) => {
              if (location.pathname === childOfChild.href)
                setActive(childOfChild);
            });
          } else {
            if (location.pathname === child.href) {
              setActive(child);
              dispatch(storeUpdateBreadcrumbLevel1(item));
              dispatch(storeUpdateBreadcrumbLevel2(child));
            }
          }
        });
      } else {
        if (location.pathname === item.href) {
          setActive(item);
        }
      }
    });
    return () => {
      // setActive(undefined);
    };
  }, [location.pathname, menuSidebar]);

  return (
    <nav className="h-[calc(100%)]">
      <div
        className={clsx(
          "bg-gray-002 h-full relative flex flex-col",
          !sidebar.isOpen ? "w-0" : "w-[33%+15vh]"
        )}
      >
        <div
          className={clsx(
            "flex py-2 items-center justify-center",
            !sidebar.isOpen ? "hidden" : ""
          )}
        >
          <div
            onClick={handleNavigation}
            className="cursor-pointer flex items-center"
          >
            <img src="/LogoKB.png" className="me-3" alt="Logo" />
            <div className="text-lg font-semibold text-color-whiteHeader">
              KB
            </div>
          </div>
        </div>
        <ul className="flex flex-col flex-1 overflow-auto">
          <div className="h-full">
            {menuSidebar.map((menuEl) => (
              <ElMenu
                key={menuEl.id}
                data={menuEl}
                activeMenu={active}
                onChangeMenu={onChange}
                className="w-full h-full flex flex-col justify-center items-center"
              />
            ))}
          </div>
        </ul>
        {sidebar.isOpen ? (
          <div
            onClick={() => toggleSidebar(!sidebar.isOpen)}
            className="flex py-2 items-center justify-center bg-[#051E39] cursor-pointer"
          >
            <ArrowLeft2 size={24} color="#FFFFFF" />
          </div>
        ) : (
          <div
            className="absolute top-2/3 left-0 z-10 w-5 h-10 bg-[#051E39] overflow-auto rounded-r-[4px] cursor-pointer flex items-center justify-center"
            aria-hidden
            onClick={() => toggleSidebar(!sidebar.isOpen)}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-001 opacity-0 hover:opacity-30" />
            <ArrowRight2 className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default RightSideBar;
