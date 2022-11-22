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
    let draw = SVG().addTo(this.section).size(800, 800);
    let rect = draw
      .rect(150, 150)
      .x(100)
      .y(100)
      .addClass("rect")
      .attr({ fill: "#3e5f97" });
    let circle = draw.circle(150).x(250).y(250).attr({ fill: "#f4c17b" });
    let flag = true;
    const group = draw.group();

    // 사각형 클릭하면 꼭지점 나타남, 그룹화해서 드래그 시 같이 움직일 수 있도록 한 코드
    rect.click(function (e) {
      if (flag == true) {
        let box = rect.bbox();
        group.add(rect);

        const array = [
          [box.x - 2, box.y - 2],
          [box.x2 - 6, box.y - 2],
          [box.x - 2, box.y2 - 6],
          [box.x2 - 6, box.y2 - 6],
        ];

        for (let i = 0; i < array.length; i++) {
          const circle = draw
            .circle(10)
            .x(array[i][0])
            .y(array[i][1])
            .addClass("vertex")
            .attr({ fill: "black" });

          circle.mousedown(function (e) {
            // rect.width().height();
            // box = rect.bbox();
            // circle.x(box.x2 - 6).y(box.y2 - 6);
          });
          circle.mousemove(function (e) {});
          circle.mouseup(function (e) {});
          group.add(circle);
        }
        group.draggable().on("dragmove", (e) => {
          dragItem(e);
        });
      }
      flag = false;
    });

    // 사각형 제외 다른 영역 클릭 시 꼭지점 제거
    this.section.addEventListener("click", function (e) {
      if (
        e.target == document.querySelector(".rect") ||
        e.target.className.animVal ==
          document.querySelector(".vertex").className.animVal
      ) {
        return;
      }
      flag = true;
      document.querySelectorAll(".vertex").forEach((node) => node.remove());
    });

    // 드래그 함수
    const dragItem = (e) => {
      const { handler, box } = e.detail;
      e.preventDefault();
      handler.move(box.x, box.y);
    };

    circle.draggable().on("dragmove", (e) => {
      dragItem(e);
    });
  }
}
