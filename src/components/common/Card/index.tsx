import { type ICardProps } from "./interface";

const Card = (props: ICardProps) => {
  return (
    <div className={`inline-block ${props?.className}`}>
      <div className="flex px-3 pt-1.5 pb-1.5 rounded-t-lg bg-color-brown2 min-h-32px text-start">
        {props?.title}
      </div>
      <div className="border border-solid border-color-yellow20 rounded-b-lg overflow-auto">
        {props?.children}
      </div>
    </div>
  );
};

export default Card;
