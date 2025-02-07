export interface IPropsInfoUserComponent {
  urlImageUser?: string;
  userName?: string;
  accountId?: string;
}

export default function UserInfoComponent({
  props
}: {
  props: IPropsInfoUserComponent;
}) {
  return (
    <>
      <div className="flex items-center bg-gray-200 rounded-2xl py-1 px-2">
        <div className="w-[1.625rem] mr-2">
          <img
            className="w-7 h-7 rounded-full"
            src={props.urlImageUser ?? "/logoDefault/avatar_default.png"}
            alt="logo"
          />
        </div>
        <div className="font-semibold  text-[14px] text-[#344054]">
          {props.userName}
        </div>
      </div>


      {/* <div className="w-[1.625rem] mr-2">
        <img
          className="w-7 h-7"
          src={props.urlImageUser ?? "/logoDefault/avatar_default.png"}
          alt="logo"
        />
      </div>
      <div className="flex flex-col justify-center mt-1">
        <div className="text-sm font-bold h-full">{props.userName}</div>
        <div className="text-gray-010 text-[0.6875rem]">{props.accountId}</div>
      </div> */}
    </>
  );
}
