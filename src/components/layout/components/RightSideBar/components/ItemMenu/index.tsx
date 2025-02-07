import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { type IMenu } from "../..";
import IconSidebar from "../IconSidebar";

const ItemMenu = ({
  activeMenu,
  menu,
  onChangeMenu
}: {
  activeMenu: IMenu | undefined;
  menu: IMenu;
  onChangeMenu: (menu: IMenu) => void;
}) => {
  const navigate = useNavigate();
  const activeChild = activeMenu ? activeMenu.id === menu.id : false;
  return (
    <>
      {menu?.children && menu?.children?.length > 0 ? (
        <div key={menu.id}>
          <div
            className={clsx(
              "w-full h-full flex items-center gap-2 px-4 py-1",
              activeChild
                ? "bg-color-blueActive text-color-Textbutton"
                : "text-color-whiteHeader"
            )}
          >
            {activeChild ? (
              <IconSidebar icon={menu.iconActive} />
            ) : (
              <IconSidebar icon={menu.icon} />
            )}
            <p>{menu.name}</p>
          </div>

          {menu?.children?.map((child) => {
            const activeChildChild = activeMenu
              ? activeMenu.id === child.id
              : false;
            return (
              <div
                key={child.id}
                className={clsx(
                  "w-full h-full cursor-pointer",
                  activeChildChild
                    ? "bg-color-primary text-color-Textbutton"
                    : "text-gray-012 hover:bg-gray-009"
                )}
                {...(!(child?.children && child?.children?.length > 0) && {
                  onClick: () => {
                    if (child.href) {
                      navigate(child.href, { state: { menu } });
                      onChangeMenu(child);
                    }
                  }
                })}
              >
                <div className="pl-10 w-full h-full flex items-center gap-2 px-4 py-1">
                  {activeChildChild ? (
                    <IconSidebar icon={child.iconActive} />
                  ) : (
                    <IconSidebar icon={child.icon} />
                  )}
                  <p>{child.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          key={menu.id}
          className={clsx(
            "cursor-pointer pl-9",
            activeChild ? "!bg-color-blue !text-white" : ""
          )}
          {...(!(menu?.children && menu?.children?.length > 0) && {
            onClick: () => {
              if (menu.href) {
                navigate(menu.href, { state: { menu } });
                onChangeMenu(menu);
              }
            }
          })}
        >
          <div className="w-full flex justify-start items-center cursor-pointer py-1 gap-1 px-3 text-color-whiteHeader text-14px h-[49px]">
            {activeChild ? (
              <IconSidebar icon={menu.iconActive} />
            ) : (
              <IconSidebar icon={menu.icon} />
            )}
            <p>{menu.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemMenu;
