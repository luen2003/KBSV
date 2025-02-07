import { UserInfoHeader } from "./components";
import { Lang } from "./components/Lang";
import { Notification } from "./components/Notification";

export default function HeaderMore() {
  return (
    <div className="py-1 pl-4 flex">
      <Notification />
      <UserInfoHeader />
      <Lang />
    </div>
  );
}
