import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";

import { type IDropdown } from "./interface";

export default function Dropdown(props: IDropdown.Props) {
  const label = props?.activeItem?.name;

  const handleClickItem = (item: IDropdown.Item) => {
    props.onChange(item);
  };

  return (
    <Menu
      as="div"
      className={clsx(
        props.classNames?.className,
        "relative inline-block text-left"
      )}
    >
      <>
        <Menu.Button
          className={clsx(
            props.classNames?.button,
            "inline-flex w-full justify-between items-center rounded-sm bg-gray-006 px-4 py-2 text-white focus:outline-none"
          )}
        >
          <div className="flex items-center">
            {!props.activeItem && !props.title ? (
              <p
                className={clsx(
                  props.classNames?.placeholder,
                  "text-gray-009 text-14px"
                )}
              >
                {props.placeholder}
              </p>
            ) : (
              <>
                {props.title && (
                  <p className={clsx("mr-1", props.classNames?.title)}>
                    {props.title}
                  </p>
                )}
                <p className={clsx(props.classNames?.label)}>{label}</p>
              </>
            )}
          </div>
          <ArrowDown2
            className={clsx(props.classNames?.icon, "ml-18px")}
            size="16"
            variant={props.variant}
          />
        </Menu.Button>
      </>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            props.classNames?.items,
            "absolute left-0 z-10 mt-1 focus:outline-none w-full"
          )}
        >
          <div className="bg-gray-006 rounded-sm w-full">
            {props?.listItems?.map((item: IDropdown.Item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <div
                    onClick={() => handleClickItem(item)}
                    className={clsx(
                      props.classNames?.item,
                      "cursor-pointer bg-gray-006 hover:bg-gray-009 px-4 py-2 rounded-sm whitespace-nowrap",
                      item.id === props.activeItem?.id &&
                        clsx("bg-gray-009", props.classNames?.itemActive)
                    )}
                  >
                    {item.name}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
