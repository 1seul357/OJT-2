import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";
import colorList from "./ColorList";

interface dataType {
  point: string;
  fill: string;
}

export default class Polygon {
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

    const polygon = draw.polygon(data.point).attr({ fill: data.fill });

    polygon.click(function (e: MouseEvent) {
      const flag = isFlag();
      if (e.shiftKey) {
        document.querySelectorAll(".vertex").forEach((node) => node.remove());
        multipleSelection(polygon);
      } else {
        if (flag == 0) {
          clickItem(polygon, draw);
          new colorList(polygon);
        }
      }
    });
  }
}
