import { useState } from "react";

import { useAppSelector } from "@hooks/useStore";

import { UserInfoComponent } from "./components";
import UserInfoHeaderMore from "./components/UserInfoHeaderMore";

export default function UserInfoHeader() {
  const [isOpenUserInfoMore, setIsOpenUserInfoMore] = useState<boolean>(false);
  const userInfo = useAppSelector((state) => state.common.accountsInfo);

  return (
    <div
      className="flex cursor-pointer items-center"
      aria-hidden
      onClick={() => {
        setIsOpenUserInfoMore(true);
      }}
    >
      <UserInfoComponent
        props={{
          accountId: userInfo?.custname,
          userName: userInfo?.custname ?? userInfo?.username
        }}
      />
      <UserInfoHeaderMore
        isShow={isOpenUserInfoMore}
        setIsShow={setIsOpenUserInfoMore}
      />
    </div>
  );
}
