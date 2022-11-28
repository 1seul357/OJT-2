import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickItem } from "../utils/ClickItem";
import colorList from "./ColorList";

interface dataType {
  key: string;
  point: string;
  fill: string;
}

export default class Polygon {
  constructor(public data: dataType, public draw: Svg) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;

    const polygon = draw.polygon(data.point).attr({ fill: data.fill });

    polygon.click(function () {
      clickItem(polygon, draw);
      new colorList(polygon);
    });
  }
}
