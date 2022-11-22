import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";

export default class Index {
  constructor({ $target }) {
    this.$target = $target;
    this.section = document.querySelector("section");
    this.render();
    $target.appendChild(this.section);
  }
  render() {
    var draw = SVG().addTo(this.section).size(800, 800);
    var rect = draw.rect(150, 150).attr({ fill: "#3e5f97" });

    var circle = draw.circle(150).x(200).y(200).attr({ fill: "#f4c17b" });

    var polygon = draw
      .polygon("50, 0 60, 40 100, 50 60, 60 50, 100 40, 60 0, 50 40, 40")
      .x(500)
      .y(200);
    polygon.fill("#f06");

    const dragItem = (e) => {
      const { handler, box } = e.detail;
      e.preventDefault();
      handler.move(box.x, box.y);
    };

    rect.draggable().on("dragmove", (e) => {
      dragItem(e);
    });

    circle.draggable().on("dragmove", (e) => {
      dragItem(e);
    });

    polygon.draggable().on("dragmove", (e) => {
      dragItem(e);
    });
  }
}
