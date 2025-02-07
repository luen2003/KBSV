import { HoverTooltip } from "@components/common";

const TooltipDev = () => {
  return (
    <>
      <div className="flex flex-col gap-10 w-fit">
        <HoverTooltip place="top" content={<div>tooltip content</div>}>
          <div>Parent content</div>
        </HoverTooltip>
        <HoverTooltip place="bottom" content={<div>tooltip content</div>}>
          <div>Parent content</div>
        </HoverTooltip>
        <HoverTooltip place="left" content={<div>tooltip content</div>}>
          <div>Parent content</div>
        </HoverTooltip>
        <HoverTooltip place="right" content={<div>tooltip content</div>}>
          <div className="border h-20">Parent content</div>
        </HoverTooltip>
      </div>
    </>
  );
};
const renderSource = ``;

const iProps = ``;

const tooltip = { ui: <TooltipDev />, renderSource, iProps };

export default tooltip;
