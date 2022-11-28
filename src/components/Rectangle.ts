import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";
import colorList from "./ColorList";

interface dataType {
  key: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fill: string;
}

export default class Rectangle {
  constructor(public data: dataType, public draw: Svg) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;

    const rect = draw
      .rect(data.width, data.height)
      .x(data.x)
      .y(data.y)
      .attr({ fill: data.fill });

    rect.click(function () {
      clickItem(rect, draw);
      new colorList(rect);
    });
  }
}
