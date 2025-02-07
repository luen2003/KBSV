import { CloseCircle } from "iconsax-react";
import { components, type ClearIndicatorProps } from "react-select";

const ClearInputBtn = (props: ClearIndicatorProps<any, false>) => {
  const {
    innerProps: { ref, ...restInnerProps }
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <CloseCircle size="16" variant="Bold" />
    </div>
  );
};

export default ClearInputBtn;
