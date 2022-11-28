import { Shape, Svg } from "@svgdotjs/svg.js";
import { dragItem } from "./Drag";

export const clickTri = (item: Shape, draw: Svg) => {
  document.querySelectorAll(".vertex").forEach((node) => node.remove());
  let box = item.bbox();
  const group = draw.group();
  group.add(item);

  const array = [
    [box.cx, box.y],
    [box.x, box.y2],
    [box.x2, box.y2],
  ];

  for (let i = 0; i < array.length; i++) {
    const vertex = draw
      .circle(10)
      .cx(array[i][0])
      .cy(array[i][1])
      .addClass("vertex")
      .data("index", i)
      .attr({ fill: "black" });
    group.add(vertex);

    vertex.draggable().on("dragmove", ((e: CustomEvent) => {
      e.preventDefault();
      const index = e.detail.handler.el.node.dataset.index;
      const offsetX = e.detail.event.offsetX;
      const offsetY = e.detail.event.offsetY;
      const box2 = item.bbox();

      if (index === "0" && offsetX <= box2.x2 && offsetY <= box2.y2) {
        item.y(offsetY).height(box2.y2 - offsetY);
      }
      if (index === "1" && offsetX <= box2.x2 && box2.y <= offsetY) {
        item
          .x(offsetX)
          .width(box2.x2 - offsetX)
          .height(offsetY - box2.y);
      }
      if (index === "2" && box2.x <= offsetX && box2.y <= offsetY) {
        item.width(offsetX - box2.x).height(offsetY - box2.y);
      }

      const circleArray = draw.find(".vertex");
      for (let i = 0; i < 3; i++) {
        const arr = [
          [box2.cx, box2.y],
          [box2.x, box2.y2],
          [box2.x2, box2.y2],
        ];
        circleArray[i].cx(arr[i][0]).cy(arr[i][1]);
      }
    }) as EventListener);
    group.add(vertex);
  }

  group.draggable().on("dragmove", ((e: CustomEvent) => {
    e.preventDefault();
    dragItem(e);
  }) as EventListener);

  const g = draw.find("g");
  g.forEach((node) => {
    if (node.node.childNodes.length === 0) {
      node.remove();
    }
  });
};