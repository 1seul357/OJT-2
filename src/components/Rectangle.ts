import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";

interface dataType {
  key: string;
  width: number;
  height?: number;
  x: number;
  y: number;
  angle: number;
  fill: string;
}

export default class Rectangle {
  constructor(public data: dataType, public draw: Svg) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;
    const g = draw.group();

    const rect = draw
      .rect(data.width, data.height)
      .x(data.x)
      .y(data.y)
      .transform({ rotate: data.angle })
      .attr({ fill: data.fill });
    const group = g.add(rect);

    rect.click(function () {
      clickItem(group, draw, rect);
    });
  }
  // fillcolor(){
  //   this.rect.fill('#')
  // }
}
