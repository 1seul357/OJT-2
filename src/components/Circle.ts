import "@svgdotjs/svg.draggable.js";
import { clickItem } from "../utils/clickItem";

export default class Circle {
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

    const circle = draw
      .circle(data.width)
      .x(data.x)
      .y(data.y)
      .attr({ fill: data.fill });

    circle.click(function () {
      clickItem(draw, circle, flag);
    });
  }
}
