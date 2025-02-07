import { Portal } from "@headlessui/react";
import { Add, TickCircle, CloseCircle } from "iconsax-react";
import { ToastBar, Toaster, toast } from "react-hot-toast";

export default function ToastCommon() {
  return (
    <Portal>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#25B770",
              minWidth: "400px",
              display: "flex",
              alignItems: "center"
            },
            icon: (
              <TickCircle className="w-6 h-6 text-gray-013" variant="Bold" />
            )
          },
          error: {
            style: {
              background: "#FF453A",
              minWidth: "400px",
              display: "flex",
              alignItems: "center"
            },
            icon: (
              <CloseCircle className="w-6 h-6 text-gray-013" variant="Bold" />
            )
          }
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className="flex items-center justify-between w-full relative">
                <div className="flex items-center">
                  <div>{icon}</div>
                  <div className="text-gray-013 text-14px">{message}</div>
                </div>
                {t.type !== "loading" && (
                  <button
                    className="cursor-pointer bg-gray-013 bg-inherit text-gray-013"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <Add size={24} className="rotate-45" />
                  </button>
                )}
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </Portal>
  );
}
