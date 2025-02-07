import { buttons, tooltip, blockui } from "./components";

export interface IComponent {
  name: string;
  data: {
    ui: JSX.Element | JSX.Element[];
    renderSource: string | string[];
    iProps: string | string[];
  };
  mutil?: boolean;
}

export const COMPONENTS: IComponent[] = [
  { name: "buttons", data: buttons },
  { name: "tooltip", data: tooltip },
  { name: "blockUI", data: blockui }
];
