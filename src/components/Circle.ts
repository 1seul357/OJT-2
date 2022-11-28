import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";
import colorList from "./ColorList";

interface dataType {
  width: number;
  x: number;
  y: number;
  fill: string;
}

export default class Circle {
  constructor(public data: dataType, public draw: Svg) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;

    const circle = draw
      .circle(data.width)
      .x(data.x)
      .y(data.y)
      .attr({ fill: data.fill });

    circle.click(function () {
      clickItem(circle, draw);
      new colorList(circle);
    });
  }
}
