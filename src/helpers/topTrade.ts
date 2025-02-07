export const colorTopTrade = (
  CP: number,
  RE: number,
  CL: number,
  FL: number
) => {
  let color;
  if (!CP) {
    color = "text-color-white";
  } else {
    if (CP == CL) {
      color = "text-color-pink";
    } else if (CP == FL) {
      color = "text-color-blue";
    } else if (CP == RE) {
      color = "text-color-yellow";
    } else if (CP != CL && CP != FL && CP > RE) {
      color = "text-color-green";
    } else if (CP != CL && CP != FL && CP < RE) {
      color = "text-color-red";
    } else {
      color = "text-color-white";
    }
  }
  return color;
};
