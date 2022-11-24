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

export default class Rectangle {
  constructor(public data: dataType, public draw: Svg, public flag: boolean) {
    this.render();
  }
  render() {
    const data = this.data;
    const flag = this.flag;
    const draw = this.draw;

    const rect = draw
      .rect(data.width, data.height)
      .x(data.x)
      .y(data.y)
      .attr({ fill: data.fill });

    rect.click(function () {
      clickItem(rect, draw, flag);
    });
  }
  // fillcolor(){
  //   this.rect.fill('#')
  // }
}
