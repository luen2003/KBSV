import clsx from "clsx";
import { MinusSquare, Record, RecordCircle, TickSquare } from "iconsax-react";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  type?: "square" | "circle" | "disable" | "minus" | string;
  classNames?: {
    wrap?: string;
  };
}

const Checkbox = ({
  checked,
  onChange = () => {},
  type = "square",
  classNames
}: CheckboxProps) => {
  return (
    <div>
      {type === "square" ? (
        checked ? (
          <TickSquare
            onClick={() => onChange(!checked)}
            variant="Bold"
            className={clsx(
              "w-18px h-18px text-color-primary",
              classNames?.wrap
            )}
          />
        ) : (
          <div className="w-18px h-18px flex items-center justify-center">
            <div
              onClick={() => onChange(!checked)}
              className="w-16px h-16px bg-transparent text-transparent border-[1.5px] border-gray-009 rounded"
            />
          </div>
        )
      ) : type === "disable" ? (
        <div
          className={clsx(
            "w-18px h-18px flex items-center justify-center relative",
            classNames?.wrap
          )}
        >
          <div className="w-16px h-16px bg-transparent text-transparent border-[1.5px] border-gray-009 rounded" />
          <div className="absolute w-[10px] h-[10px] bg-gray-009 rounded-sm" />
        </div>
      ) : type === "minus" ? (
        <MinusSquare
          onClick={() => onChange(!checked)}
          className={clsx(
            "w-18px h-18px",
            checked ? "text-color-primary" : "text-gray-009"
          )}
          variant="Bold"
        />
      ) : checked ? (
        <div
          onClick={() => onChange(!checked)}
          className="relative flex items-center justify-center"
        >
          <RecordCircle
            className={clsx(
              "w-18px h-18px text-color-primary",
              classNames?.wrap
            )}
          />
          <div className="absolute w-6px h-6px rounded-full bg-color-primary" />
        </div>
      ) : (
        <Record
          onClick={() => onChange(!checked)}
          className="w-18px h18px text-gray-009"
        />
      )}
    </div>
  );
};

export default Checkbox;
