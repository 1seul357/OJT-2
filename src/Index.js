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
    let draw = SVG().addTo(this.section).size(1200, 900);
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
          [box.x, box.y],
          [box.x2, box.y],
          [box.x, box.y2],
          [box.x2, box.y2],
        ];

        for (let i = 0; i < array.length; i++) {
          const circle = draw
            .circle(10)
            .cx(array[i][0])
            .cy(array[i][1])
            .addClass("vertex")
            .data("index", i)
            .attr({ fill: "black" });

          circle.draggable().on("dragmove", (e) => {
            e.preventDefault();
            const index = e.detail.handler.el.node.dataset.index;
            const offsetX = e.detail.event.offsetX;
            const offsetY = e.detail.event.offsetY;
            const box2 = rect.bbox();

            if (index == 0 && offsetX <= box2.x2 && offsetY <= box2.y2) {
              rect
                .x(offsetX)
                .y(offsetY)
                .width(box2.x2 - offsetX)
                .height(box2.y2 - offsetY);
            }
            if (index == 1 && box2.x <= offsetX && offsetY <= box2.y2) {
              rect
                .y(offsetY)
                .width(offsetX - box2.x)
                .height(box2.y2 - offsetY);
            }
            if (index == 2 && offsetX <= box2.x2 && box2.y <= offsetY) {
              rect
                .x(offsetX)
                .width(box2.x2 - offsetX)
                .height(offsetY - box2.y);
            }
            if (index == 3 && box2.x <= offsetX && box2.y <= offsetY) {
              rect.width(offsetX - box2.x).height(offsetY - box2.y);
            }

            let circleArray = draw.find(".vertex");
            for (let i = 0; i < 4; i++) {
              // handler.move(box.x, box.y);
              const arr = [
                [box2.x, box2.y],
                [box2.x2, box2.y],
                [box2.x, box2.y2],
                [box2.x2, box2.y2],
              ];
              circleArray[i].cx(arr[i][0]).cy(arr[i][1]);
            }
          });
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
