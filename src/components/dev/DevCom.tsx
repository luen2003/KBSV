import { useState } from "react";

import { BiCode, BiCollapseHorizontal } from "react-icons/bi";

import { UIforDev } from "./elements";

export default function DevCom() {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleToggle = () => setIsShow(!isShow);

  const isDev = import.meta.env.DEV;

  if (!isDev) return null;

  return (
    <>
      {isShow && <UIforDev />}
      <div>
        {!isShow ? (
          <BiCode
            onClick={handleToggle}
            className="fixed bottom-10 left-1 z-[100] h-10 w-10 cursor-pointer"
          />
        ) : (
          <BiCollapseHorizontal
            onClick={handleToggle}
            className="fixed bottom-10 left-1 z-[100] h-10 w-10 cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
