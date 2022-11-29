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
  constructor(public data: dataType, public draw: Svg, public multipleSelection: Function, public isFlag: Function) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;
    const multipleSelection = this.multipleSelection;
    const isFlag = this.isFlag;

    const circle = draw.circle(data.width).x(data.x).y(data.y).attr({ fill: data.fill });

    circle.click(function (e: MouseEvent) {
      const flag = isFlag();
      if (e.shiftKey) {
        document.querySelectorAll(".vertex").forEach((node) => node.remove());
        multipleSelection(circle);
      } else {
        if (flag == 0) {
          clickItem(circle, draw);
          new colorList(circle);
        }
      }
    });
  }
}
