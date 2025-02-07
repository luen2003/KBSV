import { useEffect, useState } from "react";

import { useDebounce } from "@hooks/useDebounce";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";

import { type IDropdownBoard } from "./interface";

const DropdownBoard = (props: IDropdownBoard.DropDownBoardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(props.tabName);

  const debouncedOpen = useDebounce(isOpen, 100);

  const handleClickMenu = () => {
    setIsOpen(true);
    if (props.tabId !== props.activeTabId) {
      if (props.onChange) {
        if (props.listItems && props.listItems?.length > 0) {
          props.onChange({
            activeTabId: props.tabId,
            activeSubTabId: props.listItems[0].subTabId,
            activeScreenId: props.listItems[0].screenId,
            activeTabName: props.listItems[0].subTabName
          });
        } else {
          props.onChange({
            activeTabId: props.tabId,
            activeScreenId: props.screenId,
            activeTabName: props.tabName
          });
        }
      }
    }
  };

  const handleClickItem = (item: IDropdownBoard.SubTab) => {
    setIsOpen(false);
    if (props.onChange) {
      props.onChange({
        activeTabId: props.tabId,
        activeSubTabId: item.subTabId,
        activeScreenId: item.screenId,
        activeTabName: item.subTabName
      });
    }
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (props.tabId !== props.activeTabId) {
      setLabel(props.tabName);
    } else {
      if (props.activeSubTabId) {
        const subTab = props.listItems?.filter(
          (item) => item.subTabId === props.activeSubTabId
        )[0];
        if (subTab) setLabel(subTab.subTabName);
      }
    }
  }, [props]);

  return (
    <div className="sticky z-[100]">
      {props.renderTitle ? (
        props.renderTitle
      ) : (
        <div
          className={clsx(
            `cursor-pointer flex rounded-md py-2 px-3 top-2 text-center ml-px`,
            props.tabId === props.activeTabId
              ? "bg-color-primary hover:text-color-brown text-color-brown"
              : debouncedOpen
              ? "bg-gray-007 text-gray-013"
              : "hover:bg-gray-007 hover:text-gray-013 text-gray-011"
          )}
          onClick={handleClickMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-2 text-center">
            <span className="font-medium">{label}</span>
          </div>

          {Number(props.listItems?.length) > 0 && (
            <div className="inset-y-1 right-0 flex items-center pointer-events-none ">
              <ArrowDown2 size="16" variant="Bold" />
            </div>
          )}
        </div>
      )}
      {Number(props.listItems?.length) > 0 && debouncedOpen && (
        <div
          className="cursor-pointer bg-gray-007 absolute left-0 top-9 rounded-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={clsx(
              `text-left p-2`,
              Number(props.listItems?.length) > 10 && "grid grid-cols-2 w-96"
            )}
          >
            {props.listItems?.map(
              (item: IDropdownBoard.SubTab, index: number) => (
                <div
                  className={clsx(
                    "p-2 text-gray-011 hover:text-gray-013 whitespace-nowrap",
                    props.tabId === props.activeTabId &&
                      props.activeSubTabId === item.subTabId &&
                      "bg-gray-008"
                  )}
                  key={index}
                  onClick={() => handleClickItem(item)}
                >
                  {item.subTabName}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownBoard;
