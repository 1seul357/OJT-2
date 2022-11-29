import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";
import colorList from "./ColorList";

interface dataType {
  width: number;
  height: number;
  x: number;
  y: number;
  fill: string;
}

export default class Rectangle {
  constructor(
    public data: dataType,
    public draw: Svg,
    public multipleSelection: Function,
    public isFlag: Function
  ) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;
    const multipleSelection = this.multipleSelection;
    const isFlag = this.isFlag;

    const rect = draw
      .rect(data.width, data.height)
      .x(data.x)
      .y(data.y)
      .attr({ fill: data.fill });

    rect.click(function (e: MouseEvent) {
      const flag = isFlag();
      if (e.shiftKey) {
        document.querySelectorAll(".vertex").forEach((node) => node.remove());
        multipleSelection(rect);
      } else {
        if (flag == 0) {
          clickItem(rect, draw);
          new colorList(rect);
        }
      }
    });
  }
}
