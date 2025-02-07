import clsx from "clsx";

interface ListTypeCommandProps {
  commandTypes: any[];
  activeCommandType: any;
  onChange: (data: any) => void;
  formatItemLable?: (item: any) => any;
  disabled?: boolean;
}

const ListTypeCommand = ({
  commandTypes,
  activeCommandType,
  onChange,
  formatItemLable,
  disabled
}: ListTypeCommandProps) => {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      {commandTypes.map((item, i) => {
        return (
          <button
            disabled={disabled}
            type="button"
            onClick={() => {
              onChange(item);
            }}
            key={i}
            className={clsx(
              "cursor-pointer select-none",
              commandTypes?.length === 6 ? "w-[1.938rem]" : "w-[3.095rem]"
            )}
          >
            <div
              className={clsx(
                "h-1 rounded w-full",
                activeCommandType === item ? "bg-color-primary" : "bg-gray-009"
              )}
            />
            <p
              className={clsx(
                "text-sm font-normal text-center mt-[0.188rem]",
                activeCommandType === item
                  ? "text-color-primary"
                  : "text-gray-009"
              )}
            >
              {formatItemLable ? formatItemLable(item) : item}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ListTypeCommand;
