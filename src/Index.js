import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import "../src/Index.css";

export default class Index {
  constructor({ $target }) {
    this.$target = $target;
    this.section = document.querySelector("section");
    this.render();
    $target.appendChild(this.section);
  }
  render() {
    var draw = SVG().addTo(this.section).size(800, 800);
    var rect = draw.rect(150, 150).x(100).y(100).attr({ fill: "#3e5f97" });
    var circle = draw.circle(150).x(250).y(250).attr({ fill: "#f4c17b" });
    let flag = true;

    const dragItem = (e) => {
      const { handler, box } = e.detail;
      e.preventDefault();
      handler.move(box.x, box.y);
    };

    circle.draggable().on("dragmove", (e) => {
      dragItem(e);
    });

    rect.click(function (e) {
      if (flag == true) {
        const box = rect.bbox();
        const group = draw.group();
        group.add(rect);

        const array = [
          [box.x - 2, box.y - 2],
          [box.x2 - 6, box.y - 2],
          [box.x - 2, box.y2 - 6],
          [box.x2 - 6, box.y2 - 6],
        ];

        for (let i = 0; i < array.length; i++) {
          const circle = draw
            .circle(8)
            .x(array[i][0])
            .y(array[i][1])
            .attr({ fill: "black" });
          group.add(circle);
        }
        group.draggable().on("dragmove", (e) => {
          dragItem(e);
        });
      }
      flag = false;
    });
  }
}
