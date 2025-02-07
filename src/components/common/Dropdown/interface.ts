export declare namespace IDropdown {
  interface Props {
    listItems: Array<Item<any, any>>;
    activeItem?: Item<any, any>;
    onChange: (activeItem: Item<any, any>) => void;
    classNames?: {
      className?: string;
      button?: string;
      items?: string;
      item?: string;
      itemActive?: string;
      icon?: string;
      label?: string;
      title?: string;
      placeholder?: string;
    };
    variant?:
      | "Bold"
      | "Linear"
      | "Outline"
      | "Broken"
      | "Bulk"
      | "TwoTone"
      | undefined;
    title?: string;
    placeholder?: string;
  }

  interface Item<N = string, T = string> {
    name: N;
    id: T;
  }
}
