import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";

interface dataType {
  point: string;
  fill: string;
}

export default class Polygon {
  constructor(
    public data: dataType,
    public draw: Svg,
    public multipleSelection: Function
  ) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;
    const multipleSelection = this.multipleSelection;

    const polygon = draw.polygon(data.point).attr({ fill: data.fill });
    clickItem(polygon, draw, multipleSelection);
  }
}
