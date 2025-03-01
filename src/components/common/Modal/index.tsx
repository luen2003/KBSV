import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Add } from "iconsax-react";

import { type IPropsModal } from "./interfaces";

const WithTitle = ({
  setOpen,
  children,
  title,
  classNames
}: IPropsModal & { title: string }) => {
  return (
    <div
      className={clsx(
        classNames?.className,
        "bg-gray-004 w-[39rem] flex flex-col gap-5 relative"
      )}
    >
      <div className={clsx(classNames?.classTitle, "bg-gray-006 py-3 px-6")}>
        <p className="font-bold text-base">{title}</p>
      </div>
      <Add
        size={24}
        onClick={() => setOpen(false)}
        className="rotate-45 absolute top-3 right-2 cursor-pointer"
      />
      {children}
    </div>
  );
};

Modal.WithTitle = WithTitle;

export default function Modal({
  isOpen = false,
  setOpen,
  children,
  classNames,
  isCloseClickWrap = true
}: IPropsModal) {
  function closeModal() {
    if (isCloseClickWrap) setOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={clsx(
            classNames?.className,
            "relative z-[100] text-gray-012 text-base font-roboto font-normal"
          )}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx("fixed inset-0 bg-black/75", classNames?.bg)}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={clsx(
                classNames?.trans,
                "flex min-h-full items-center justify-center text-center"
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    classNames?.classPanel,
                    "w-full transform overflow-auto rounded-2xl text-left align-middle shadow-xl transition-all flex justify-center"
                  )}
                >
                  <div className={classNames?.classWrap}>{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
