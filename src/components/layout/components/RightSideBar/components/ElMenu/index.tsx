import {
  type DetailedHTMLProps,
  Fragment,
  type HTMLAttributes,
  useEffect,
  useState
} from "react";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";

import { type IMenu } from "../..";
import IconSidebar from "../IconSidebar";
import ItemMenu from "../ItemMenu";

const ElMenu = ({
  data,
  activeMenu,
  onChangeMenu,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  data: IMenu;
  activeMenu?: IMenu;
  onChangeMenu: (menu: IMenu) => void;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(true);
  const navigate = useNavigate();
  const toggleHide = () => setIsHide(!isHide);
  useEffect(() => {
    if (activeMenu) {
      let listKeyInMenu = [data.id];
      if (data.children) {
        const keys = data.children.map((item) => item.id);
        listKeyInMenu = [...listKeyInMenu, ...keys];
        data.children.forEach((child) => {
          if (child.children) {
            const keysChild = child.children.map((item) => item.id);
            listKeyInMenu = [...listKeyInMenu, ...keysChild];
          }
        });
      }
      setActive(listKeyInMenu.includes(activeMenu.id));
    } else {
      setActive(false);
    }
  }, [activeMenu, data]);

  return (
    <li key={data.id}>
      {data.children ? (
        <>
          <div
            {...rest}
            className="w-full h-full flex items-center cursor-pointer py-2 justify-between px-3 text-color-whiteHeader"
            onClick={toggleHide}
          >
            <div className="flex items-center py-1 gap-1">
              <IconSidebar icon={data.icon} />
              <p className={clsx("text-14px text-center")}>{data.name}</p>
            </div>

            {isHide ? (
              <ArrowDown2 className="w-6 p-1 rounded cursor-pointer" />
            ) : (
              <ArrowUp2 className="w-6 p-1 rounded cursor-pointer" />
            )}
          </div>
          <Transition
            show={!isHide}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <div>
              <div className="bg-gray-008 flex flex-col py-2 overflow-auto">
                {data.children.map((child) => {
                  return (
                    <ItemMenu
                      key={child.id}
                      activeMenu={activeMenu}
                      menu={child}
                      onChangeMenu={onChangeMenu}
                    />
                  );
                })}
              </div>
            </div>
          </Transition>
        </>
      ) : (
        <div
          className={`w-full flex justify-between items-center h-[49px] py-1 gap-1 cursor-pointer text-gray-013 ${
            active ? "bg-color-blue" : ""
          }`}
          onClick={() => {
            if (data.href) {
              navigate(data.href);
              onChangeMenu(data);
            }
            if (data.handleClick) {
              data.handleClick();
            }
          }}
        >
          <div
            {...rest}
            className="w-full h-full flex justify-start items-center cursor-pointer py-1 gap-1 px-3"
          >
            <IconSidebar icon={data.icon} />
            <p className={clsx("text-14px text-center")}>{data.name}</p>
          </div>
        </div>
      )}
    </li>
  );
};

export default ElMenu;
