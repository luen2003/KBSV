import clsx from "clsx";

import { type IPropsModalCustom } from "./interfaces";

export default function ModalCustom({
  open = false,
  children,
  classWrap,
  classPanel,
  classBg,
  className
}: IPropsModalCustom) {
  if (!open) return null;
  return (
    <div className={clsx("relative z-[500]", className)}>
      <div>
        <div
          className={clsx(
            classBg,
            "fixed inset-0 bg-gray-014/75 transition-opacity"
          )}
          aria-hidden
        />
        <div className={clsx("fixed inset-0 z-10 overflow-y-auto")} aria-hidden>
          <div
            className={clsx(
              classWrap,
              "flex min-h-full items-end justify-center p-4 text-center max-laptop:p-0 sm:items-center sm:p-0"
            )}
          >
            <div
              className={clsx(
                classPanel,
                "relative overflow-hidden text-left shadow-xl transition-all"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
