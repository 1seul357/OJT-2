import { SVG } from "@svgdotjs/svg.js";

export default class Index {
  constructor({ $target }) {
    this.$target = $target;
    this.section = document.querySelector("section");
    this.render();
    $target.appendChild(this.section);
  }
  render() {
    var rect = SVG().addTo(this.section).size(300, 300);
    rect.rect(150, 150).x(100).y(100).attr({ fill: "#3e5f97" });

    var circle = SVG().addTo(this.section).size(300, 300);
    circle.circle(150).x(100).y(100).attr({ fill: "#f4c17b" });

    var polygon = SVG().addTo(this.section).size(300, 300);
    polygon
      .polygon("50, 0 60, 40 100, 50 60, 60 50, 100 40, 60 0, 50 40, 40")
      .x(100)
      .y(125);
    polygon.fill("#f06").move(20, 20);
  }
}
