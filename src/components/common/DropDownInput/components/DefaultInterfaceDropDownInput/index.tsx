import { type ControlProps, components } from "react-select";

import { type OptionTypeControlComponent } from "../..";

export default function DefaultInterfaceDropDownInputComponent(
  props: ControlProps<OptionTypeControlComponent, false>
) {
  return (
    <components.Control {...props} className="w-[19.5rem]">
      {props.children}
    </components.Control>
  );
}
