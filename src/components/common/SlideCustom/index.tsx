import type { ReactNode } from "react";

import type { Settings } from "react-slick";
import Slider from "react-slick";

interface IProps extends Settings {
  children?: ReactNode[];
}

const SlideCustom = ({ children, ...props }: IProps) => {
  if (!children) {
    return null;
  }

  return (
    <Slider {...props}>
      {children.map((el, i) => (
        <div key={i}>
          <div
            style={{
              marginLeft: props.centerPadding,
              marginRight: props.centerPadding
            }}
          >
            {el}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SlideCustom;
