import { useEffect, useMemo, useState } from "react";

import { removeHideMenu } from "@helpers/utils";
import useLogout from "@hooks/useLogout";
import menuService from "@services/menu.service";
import { Logout } from "iconsax-react";

import { type IMenu } from "..";
import { useDispatch } from "react-redux";
import { storeMenus } from "@store/slices/commonSlice";
const flatten: any = ({ children }: { children: any[] }) =>
  children.flatMap(({ children = [], ...rest }) => [
    rest,
    ...flatten({ children })
  ]);

export default function useRightSideBar() {
  const [menu, setMenu] = useState<IMenu[]>();
  const { handleLogout } = useLogout();
  const dispatch = useDispatch();
  const getData = async () => {
    const response: IMenu[] = await menuService.getMenu();
    const businessFeatureMenu: IMenu = {
      id: "1323",
      name: "Quản lý khách hàng ",
      icon: "/iconMenu/money-3.png",
      iconActive: "",
      children: [
        {
          id: "14",
          name: "Quản lý DowJones watchlist",
          icon: null,
          iconActive: null,
          href: "/dashboard"
        },
        {
          id: "41",
          name: "Quản lý DS nhân viên KBSV",
          icon: null,
          iconActive: null,
          href: "/manage"
        },
        {
          id: "15",
          name: "Kiểm tra KH mới",
          icon: null,
          iconActive: null,
          href: "/checkEmployee"
        },
        {
          id: "16",
          name: "Tra cứu y/c kiểm tra KH mới",
          icon: null,
          iconActive: null,
          href: "/checkNewEmployee"
        },
        {
          id: "17",
          name: "Kiểm tra KH cũ/ nhân viên ",
          icon: null,
          iconActive: null,
          href: "/checkOldEmployee"
        }
      ]
    };

    // Add logout item
    const logoutMenu: IMenu = {
      id: "qrCode",
      name: "Logout",
      icon: <Logout size="24" color="#FFFFFF" />,
      iconActive: "",
      handleClick: () => handleLogout()
    };

    // Combine fetched data and the new items
    const updatedMenu = [...response, businessFeatureMenu, logoutMenu];

    setMenu(updatedMenu);
    const menus: any[] = flatten({ children: response });
    dispatch(storeMenus(menus));
  };

  useEffect(() => {
    getData();
  }, []);

  const menuSidebar: IMenu[] = useMemo(() => {
    if (menu) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return removeHideMenu(menu);
    } else {
      return [];
    }
  }, [menu]);

  return { menuSidebar };
}
