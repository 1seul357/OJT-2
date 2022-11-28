import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { clickTri } from "../utils/ClickTri";
import colorList from "./ColorList";

interface dataType {
  key: string;
  point: string;
  fill: string;
}

export default class Triangle {
  constructor(public data: dataType, public draw: Svg) {
    this.render();
  }
  render() {
    const data = this.data;
    const draw = this.draw;

    const triangle = draw.polygon(data.point).attr({ fill: data.fill });

    triangle.click(function () {
      clickTri(triangle, draw);
      new colorList(triangle);
    });
  }
}
