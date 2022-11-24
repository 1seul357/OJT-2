import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import { dragItem } from "../utils/Drag";

export default class Rectangle {
  constructor(public data: any, public draw: any, public flag: boolean) {
    this.data = data;
    this.draw = draw;
    this.flag = flag;
    this.render();
  }
  render() {
    const rect = this.draw
      .rect(this.data.width, this.data.height)
      .x(this.data.x)
      .y(this.data.y)
      .attr({ fill: this.data.fill });

    rect.click(function () {
      clickItem(rect);
    });
    const clickItem = (obj: Object) => {
      let itemTmp = obj;
      this.flag = true;
      const g = this.draw.find("g");
      g.forEach((node: any) => {
        if (node.node.children.length == 0) {
          node.remove();
        }
      });
      const group = this.draw.group();
      if (this.flag == true) {
        document.querySelectorAll(".vertex").forEach((node) => node.remove());
        const item = SVG(itemTmp);
        let box = item.bbox();
        group.add(item);

        const array = [
          [box.x, box.y],
          [box.x2, box.y],
          [box.x, box.y2],
          [box.x2, box.y2],
        ];

        for (let i = 0; i < array.length; i++) {
          const vertex = this.draw
            .circle(10)
            .cx(array[i][0])
            .cy(array[i][1])
            .addClass("vertex")
            .data("index", i)
            .attr({ fill: "black" });

          vertex.draggable().on("dragmove", ((e: CustomEvent) => {
            e.preventDefault();
            const index = e.detail.handler.el.node.dataset.index;
            const offsetX = e.detail.event.offsetX;
            const offsetY = e.detail.event.offsetY;
            const box2 = item.bbox();

            if (index == 0 && offsetX <= box2.x2 && offsetY <= box2.y2) {
              item
                .x(offsetX)
                .y(offsetY)
                .width(box2.x2 - offsetX)
                .height(box2.y2 - offsetY);
            }
            if (index == 1 && box2.x <= offsetX && offsetY <= box2.y2) {
              item
                .y(offsetY)
                .width(offsetX - box2.x)
                .height(box2.y2 - offsetY);
            }
            if (index == 2 && offsetX <= box2.x2 && box2.y <= offsetY) {
              item
                .x(offsetX)
                .width(box2.x2 - offsetX)
                .height(offsetY - box2.y);
            }
            if (index == 3 && box2.x <= offsetX && box2.y <= offsetY) {
              item.width(offsetX - box2.x).height(offsetY - box2.y);
            }

            const circleArray = this.draw.find(".vertex");
            for (let i = 0; i < 4; i++) {
              const arr = [
                [box2.x, box2.y],
                [box2.x2, box2.y],
                [box2.x, box2.y2],
                [box2.x2, box2.y2],
              ];
              circleArray[i].cx(arr[i][0]).cy(arr[i][1]);
            }
          }) as EventListener);
          group.add(vertex);
        }
        group.draggable().on("dragmove", ((e: CustomEvent) => {
          dragItem(e);
        }) as EventListener);
      }
      this.flag = false;
    };
  }
}
