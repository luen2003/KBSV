import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  type CSSProperties
} from "react";

import { Portal } from "@headlessui/react";
import { onStopPropagation } from "@helpers/utils";
import useClickOutside from "@hooks/useClickOutside";
import { useDebounce } from "@hooks/useDebounce";
import clsx from "clsx";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

type PlaceTypes = "top" | "right" | "bottom" | "left";
interface HoverTpoltipProps {
  children: React.ReactNode;
  content:
    | (({ onMouseLeave }: { onMouseLeave: () => void }) => React.ReactNode)
    | React.ReactNode;
  eventClose?: {
    click?: boolean;
    leaveMouseWrap?: boolean;
    leaveMouseContent?: boolean;
  };
  eventOpen?: { click?: boolean; hover?: boolean };
  place?: PlaceTypes;
  customStylePlace?: CSSProperties;
  classNames?: {
    content?: string;
    contentWrap?: string;
    icon?: string;
    wrap?: string;
  };
  fitWitdh?: boolean;
}

const SPACE_BETWEEN = 5; // 5px

const HoverTooltip: React.FC<HoverTpoltipProps> = ({
  content,
  children,
  eventClose = { leaveMouseWrap: true, click: true, leaveMouseContent: true },
  eventOpen = { hover: true },
  place = "top",
  classNames,
  customStylePlace,
  fitWitdh = false
}) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [placeCalc, setPlaceCalc] = useState(place);
  const [childRectState, setChildRectState] = useState<DOMRect>();
  const showDebounce = useDebounce(show, 200);

  useEffect(() => {
    if (childRef.current && showDebounce && contentRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      setChildRectState(childRect);
      const contentRect = contentRef.current.getBoundingClientRect();
      const vH = window.innerHeight;
      const vW = window.innerWidth;

      const newPlace: PlaceTypes = (() => {
        switch (place) {
          case "bottom":
            if (vW - (childRect.right + contentRect.width / 2) < 0) {
              return "left";
            } else if (vH - childRect.top < 60) {
              return "top";
            }
            return place;
          case "top":
            if (vW - (childRect.right + contentRect.width / 2) < 0) {
              return "left";
            }
            return place;
          case "right":
          case "left":
          default:
            return place;
        }
      })();

      setPlaceCalc(newPlace);

      const newPosistion = (() => {
        switch (newPlace) {
          case "top":
            return {
              x: childRect.left + childRect.width / 2,
              y: childRect.top - SPACE_BETWEEN // Adjust this value to move tooltip up
            };
          case "bottom":
            return {
              x: childRect.left + childRect.width / 2,
              y: childRect.bottom + contentRect.height + SPACE_BETWEEN // Adjust this value to move tooltip up
            };
          case "right":
            return {
              x:
                childRect.left +
                contentRect.width / 2 +
                childRect.width +
                SPACE_BETWEEN,
              y: childRect.top + contentRect.height / 2 + childRect.height / 2
            };
          default:
            return {
              x: childRect.left - contentRect.width / 2 - SPACE_BETWEEN,
              y: childRect.top + contentRect.height / 2 + childRect.height / 2
            };
        }
      })();

      setPosition(newPosistion);
    }
  }, [place, showDebounce]);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  useClickOutside({
    ref: contentRef,
    onOutsideClick: () => {
      if (eventClose?.click) {
        handleMouseLeave();
      }
    }
  });

  // Create a portal for the tooltip content
  const tooltipContent = useMemo(
    () =>
      showDebounce ? (
        <div
          ref={contentRef}
          className={clsx(
            "fixed z-[100] -translate-x-1/2 -translate-y-full",
            classNames?.contentWrap
          )}
          style={{
            ...(customStylePlace ?? {
              left: `${position.x}px`,
              top: `${position.y}px`
            }),
            ...(fitWitdh ? { maxWidth: childRectState?.width } : {})
          }}
          onMouseLeave={() => {
            if (eventClose?.leaveMouseContent) handleMouseLeave();
          }}
        >
          <div
            className={clsx(
              "text-sm text-gray-012 font-normal bg-gray-009 px-4 py-2 rounded relative",
              classNames?.content
            )}
          >
            {typeof content === "function"
              ? content({ onMouseLeave: handleMouseLeave })
              : content}
            {placeCalc === "bottom" && (
              <div
                className={clsx(
                  classNames?.icon,
                  "absolute w-full h-full flex justify-center items-center bottom-1/2 left-0"
                )}
              >
                <ArrowDown2
                  variant="Bold"
                  className="w-4 text-gray-009 rotate-180"
                />
              </div>
            )}
            {placeCalc === "top" && (
              <div
                className={clsx(
                  classNames?.icon,
                  "absolute w-full h-full flex justify-center items-center top-1/2 left-0"
                )}
              >
                <ArrowUp2
                  variant="Bold"
                  className="w-4 text-gray-009 rotate-180"
                />
              </div>
            )}
            {placeCalc === "left" && (
              <div
                className={clsx(
                  classNames?.icon,
                  "absolute w-3 h-3 flex justify-center items-center top-1/2 -translate-y-1/2 -right-[7px]"
                )}
              >
                <ArrowDown2
                  variant="Bold"
                  className="w-4 text-gray-009 -rotate-90"
                />
              </div>
            )}
            {placeCalc === "right" && (
              <div
                className={clsx(
                  classNames?.icon,
                  "absolute w-3 h-3 flex justify-center items-center top-1/2 -translate-y-1/2 -left-[7px]"
                )}
              >
                <ArrowDown2
                  variant="Bold"
                  className="w-4 text-gray-009 rotate-90"
                />
              </div>
            )}
          </div>
        </div>
      ) : null,
    [
      classNames,
      content,
      customStylePlace,
      eventClose?.leaveMouseContent,
      placeCalc,
      position.x,
      position.y,
      showDebounce
    ]
  );

  return (
    <div
      ref={childRef}
      onClick={(e) => {
        if (!eventOpen?.click) return;
        onStopPropagation(e);
        handleMouseEnter();
      }}
      onMouseEnter={(e) => {
        if (!eventOpen?.hover) return;
        onStopPropagation(e);
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        if (eventClose.leaveMouseWrap) {
          handleMouseLeave();
        }
      }}
      className={clsx(classNames?.wrap)}
    >
      {children}
      <Portal>{tooltipContent}</Portal>
    </div>
  );
};

export default HoverTooltip;
