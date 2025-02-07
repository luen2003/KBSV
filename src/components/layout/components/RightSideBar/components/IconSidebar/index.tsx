import { type ReactNode } from "react";

const IconSidebar = ({ icon }: { icon: ReactNode }) => {
  return typeof icon === "string" ? (
    <img alt="" src={icon} className="w-[24px] h-[24px]" />
  ) : (
    icon
  );
};

export default IconSidebar;
