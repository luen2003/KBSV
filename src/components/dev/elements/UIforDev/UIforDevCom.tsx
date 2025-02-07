import { useState } from "react";

import clsx from "clsx";

import { UIComponent } from "./components";
import { SwitchThemes } from "..";
import { COMPONENTS, type IComponent } from "../../dev.constants";

export default function UIforDevCom() {
  const [currentComponent, setIsCurrentComponent] = useState<
    IComponent | undefined
  >(COMPONENTS[0]);

  return (
    <div className="fixed left-0 top-0 z-[100] h-full w-full overflow-y-auto bg-gray-800">
      <div className="fixed right-6 top-6 z-[101] flex items-center gap-4">
        <SwitchThemes />
      </div>

      <div className="relative h-full w-full">
        <div className="flex">
          <div className="sticky top-10 h-fit w-80 p-10 text-sm">
            {COMPONENTS.map((component) => (
              <div
                className={clsx(
                  currentComponent?.name === component.name && "font-bold",
                  "relative z-20 w-full cursor-pointer p-1 uppercase"
                )}
                key={component.name}
                onClick={() => setIsCurrentComponent(component)}
                aria-hidden
              >
                {component.name}
              </div>
            ))}
          </div>
          {Array.isArray(currentComponent?.data?.ui)
            ? currentComponent?.data?.ui && (
                <div>
                  {currentComponent?.data?.ui?.map((uiEl, key) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <UIComponent
                        dataComponent={{
                          data: {
                            ui: uiEl,
                            iProps: currentComponent.data.iProps[key] || "",
                            renderSource:
                              currentComponent.data.renderSource[key] || ""
                          },
                          name: ""
                        }}
                        // eslint-disable-next-line react/no-array-index-key
                        key={key}
                      >
                        <button
                          type="button"
                          className="absolute right-10 top-10 rounded-full bg-gray-500 px-4"
                          onClick={() => {
                            const currentComponentClone = {
                              ...currentComponent
                            };

                            if (Array.isArray(currentComponent.data.ui)) {
                              const newUI = [...currentComponent.data.ui];
                              newUI[key] = <div>reloading..</div>;
                              setIsCurrentComponent({
                                ...currentComponent,
                                data: {
                                  ...currentComponent.data,
                                  ui: newUI
                                }
                              });
                            }
                            setTimeout(() => {
                              setIsCurrentComponent(currentComponentClone);
                            }, 500);
                          }}
                        >
                          Reload
                        </button>
                      </UIComponent>
                    );
                  })}
                </div>
              )
            : currentComponent?.data.ui && (
                <UIComponent dataComponent={currentComponent}>
                  <button
                    type="button"
                    className="absolute right-10 top-10 rounded-full bg-gray-500 px-4"
                    onClick={() => {
                      const currentComponentClone = { ...currentComponent };
                      setIsCurrentComponent({
                        ...currentComponent,
                        data: {
                          ...currentComponent.data,
                          ui: <div>reloading..</div>
                        }
                      });
                      setTimeout(() => {
                        setIsCurrentComponent(currentComponentClone);
                      }, 500);
                    }}
                  >
                    Reload
                  </button>
                </UIComponent>
              )}
        </div>
      </div>
    </div>
  );
}
