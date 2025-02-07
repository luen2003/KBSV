import { useRef } from "react";

import useClickOutside from "@hooks/useClickOutside";
import useLogout from "@hooks/useLogout";
import { t } from "i18next";
import { LogoutCurve } from "iconsax-react";

export default function UserInfoHeaderMore({
  isShow,
  setIsShow
}: {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
}) {
  const { handleLogout } = useLogout();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref,
    onOutsideClick: () => {
      setIsShow(false);
    }
  });

  if (isShow)
    return (
      <div
        ref={ref}
        className="absolute right-14 top-11 z-[101] bg-gray-007 rounded-lg flex flex-col px-3 min-w-[10.0625rem] text-gray-011"
      >
        {/* <div className="flex items-center gap-2 cursor-pointer min-h-[2.5rem]">
          <ProfileCircle size="16" />
          <span className="text-[0.75rem]">{`${t("header:information")}`}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer min-h-[2.5rem]">
          <Star size={16} />
          <span className="text-[0.75rem]">MyPrime</span>
        </div> */}
        <div
          className="flex items-center gap-2 cursor-pointer min-h-[2.5rem]"
          aria-hidden
          onClick={handleLogout}
        >
          <LogoutCurve size={16} />
          <span className="text-[0.75rem]">{`${t("header:logout")}`}</span>
        </div>
      </div>
    );
}
