import { Shape } from "@svgdotjs/svg.js";

export const getBox = (item: Shape) => {
  const box = item.bbox();
  const array =
    item.type === "polygon"
      ? [[box.cx, box.y], [box.x, box.y2], [box.x2, box.y2]]
      : [[box.x, box.y], [box.x2, box.y], [box.x, box.y2], [box.x2, box.y2]];
  return array;
};