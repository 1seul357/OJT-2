import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";

interface dataType {
  key: string;
  width: number;
  height?: number;
  x: number;
  y: number;
  fill: string;
}

export default class Circle {
  constructor(public data: dataType, public draw: Svg, public flag: boolean) {
    this.data = data;
    this.draw = draw;
    this.flag = flag;
    this.render();
  }
  render() {
    const data = this.data;
    const flag = this.flag;
    const draw = this.draw;

    const circle = draw
      .circle(data.width)
      .x(data.x)
      .y(data.y)
      .attr({ fill: data.fill });

    circle.click(function () {
      clickItem(circle, draw, flag);
    });
  }
}
