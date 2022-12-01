import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";

interface dataType {
  width: number;
  height: number;
  x: number;
  y: number;
  fill: string;
}

export default class Rectangle {
  constructor(public data: dataType, public draw: Svg, public multipleSelection: Function) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;
    const multipleSelection = this.multipleSelection;

    const rect = draw.rect(data.width, data.height).x(data.x).y(data.y).attr({ fill: data.fill });
    clickItem(rect, draw, multipleSelection);
  }
}
