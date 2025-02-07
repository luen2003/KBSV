import type { ReactNode } from "react";

import { type IComponent } from "../../../../dev.constants";

export default function UIComponent({
  dataComponent,
  children
}: {
  dataComponent: IComponent;
  children?: ReactNode;
}) {
  return (
    <div className="flex w-full justify-center p-10">
      <div className="flex w-full flex-col gap-5">
        <h1 className="uppercase">{dataComponent.name}</h1>
        <div className="relative rounded-3xl border p-20">
          {children}
          {dataComponent?.data.ui}
        </div>
      </div>
    </div>
  );
}
