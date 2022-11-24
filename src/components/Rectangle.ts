import "@svgdotjs/svg.draggable.js";
import { clickItem } from "../utils/clickItem";

export default class Rectangle {
  constructor(public data: any, public draw: any, public flag: boolean) {
    this.data = data;
    this.draw = draw;
    this.flag = flag;
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
      clickItem(draw, rect, flag);
    });
  }
}
