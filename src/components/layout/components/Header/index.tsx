// import { THEMES } from "@constants/common";

import { useAppSelector } from "@hooks/useStore";
import useTheme from "@hooks/useTheme";
import { Home } from "iconsax-react";

import { HeaderMore } from "./components";

// import { IconThemeDark, IconThemeLight } from "./components/Icons";

export default function Header() {
  // const userInfo = useAppSelector((state) => state.common.accountsInfo);
  // Function to handle opening the modal

  // const { lang, handleChangeLang } = useLang();

  const { theme, handleChangeTheme } = useTheme();
  const breadcrumb = useAppSelector((state) => state.breadcrumb);

  return (
    <div className="w-full py-1 pl-4 flex justify-between h-[48px]"
      style={{ background: "#FCFCFD" }}>
      {breadcrumb?.level1 ? (
        <div className="flex items-center">
          <Home size="24" className="text-gray-009" />
          <span className="text-14px text-gray-009 mx-1">/</span>
          <span className="text-14px text-gray-003" style={{ fontWeight: 600}}>
            {breadcrumb?.level1?.name}
          </span>
          <span className="text-14px text-gray-009 mx-1">/</span>
          <span className="text-14px text-color-black" style={{ fontWeight: 600}}>
            {breadcrumb?.level2?.name}
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <HeaderMore />
    </div>
  );
}
