import { Shape, Svg } from "@svgdotjs/svg.js";
import { dragItem } from "./Drag";

export const clickItem = (group: Shape, draw: Svg, item: Shape) => {
  document.querySelectorAll(".vertex").forEach((node) => node.remove());
  document.querySelector(".rotate")?.remove();
  let box = item.bbox();

  const rotate = draw
    .circle(20)
    .cx(box.cx)
    .cy(box.cy)
    .addClass("rotate")
    .attr({ fill: "#CCCCFF" });
  group.add(rotate);

  const array = [
    [box.x, box.y],
    [box.x2, box.y],
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

    vertex.draggable().on("dragmove", ((e: CustomEvent) => {
      document.querySelector(".rotate")?.remove();
      e.preventDefault();
      const index = e.detail.handler.el.node.dataset.index;
      const offsetX = e.detail.event.offsetX;
      const offsetY = e.detail.event.offsetY;
      const box2 = item.bbox();

      if (index === "0" && offsetX <= box2.x2 && offsetY <= box2.y2) {
        item
          .x(item.type === "rect" ? offsetX : box2.x)
          .y(item.type === "rect" ? offsetY : box2.y)
          .width(box2.x2 - offsetX)
          .height(box2.y2 - offsetY);
      }
      if (index === "1" && box2.x <= offsetX && offsetY <= box2.y2) {
        item
          .y(item.type === "rect" ? offsetY : box2.y)
          .width(offsetX - box2.x)
          .height(box2.y2 - offsetY);
      }
      if (index === "2" && offsetX <= box2.x2 && box2.y <= offsetY) {
        item
          .x(item.type === "rect" ? offsetX : box2.x)
          .width(box2.x2 - offsetX)
          .height(offsetY - box2.y);
      }
      if (index === "3" && box2.x <= offsetX && box2.y <= offsetY) {
        item.width(offsetX - box2.x).height(offsetY - box2.y);
      }
      rotate.cx(box2.cx).cy(box2.y - 50);

      const circleArray = draw.find(".vertex");
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
    document.querySelector(".rotate")?.remove();
    e.preventDefault();
    dragItem(e);
  }) as EventListener);

  rotate.draggable().on("dragmove", ((e: CustomEvent) => {
    const boxCenter = {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
    };
    const angle =
      Math.atan2(
        e.detail.event.offsetX - boxCenter.x - 30,
        -(e.detail.event.offsetY - boxCenter.y)
      ) *
      (180 / Math.PI);
    group.transform({ rotate: angle });
  }) as EventListener);

  const g = draw.find("g");
  g.forEach((node) => {
    if (node.node.childNodes.length === 0) {
      node.remove();
    }
  });
};
