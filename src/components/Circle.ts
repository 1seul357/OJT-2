import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";

interface dataType {
  key: string;
  width: number;
  x: number;
  y: number;
  angle: number;
  fill: string;
}

export default class Circle {
  constructor(public data: dataType, public draw: Svg) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;
    const g = draw.group();

    const circle = draw
      .circle(data.width)
      .x(data.x)
      .y(data.y)
      .rotate(data.angle)
      .attr({ fill: data.fill });
    const group = g.add(circle);

    circle.click(function () {
      clickItem(group, draw, circle);
    });
  }
}
