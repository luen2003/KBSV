import { type ReactNode } from "react";

export declare namespace IDropdownBoard {
  interface DropDownBoardProps {
    tabId: string;
    tabName: string;
    screenId: string;
    listItems?: SubTab[];
    onChange?: (active: ActiveInfo) => void;
    activeTabId?: string;
    activeSubTabId?: string;
    renderTitle?: ReactNode;
  }

  interface SubTab {
    subTabName: string;
    subTabId: string;
    screenId: string;
  }

  interface ActiveInfo {
    activeTabId: "DANH_MUC" | string;
    activeSubTabId?: string;
    activeScreenId: string;
    activeTabName?: string;
  }
}
