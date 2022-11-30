import { Shape, Svg } from "@svgdotjs/svg.js";
import { dragItem } from "./Drag";
import { getBox } from "./getBox";

export const clickItem1 = (item: Shape, draw: Svg) => {
  document.querySelectorAll(".vertex").forEach((node) => node.remove());
  const group = draw.group();
  const array = getBox(item);
  group.add(item);

  window.addEventListener("keyup", (e) => {
    if (e.key === "Delete") {
      if (group.node.childElementCount >= 4) {
        group.remove();
      }
    }
  });

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

      if (item.type === "polygon") {
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
      } else {
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
      }

      const circleArray = draw.find(".vertex");
      for (let i = 0; i < circleArray.length; i++) {
        const arr = getBox(item);
        circleArray[i].cx(arr[i][0]).cy(arr[i][1]);
      }
    }) as EventListener);
    group.add(vertex);
  }

  group.draggable().on("dragmove", ((e: CustomEvent) => {
    e.preventDefault();
    dragItem(e);
  }) as EventListener);
};

// const rotate = draw
//   .circle(20)
//   .cx(box.cx)
//   .cy(box.cy)
//   .addClass("rotate")
//   .attr({ fill: "#CCCCFF" });

// group.add(rotate);
// rotate.cx(box2.cx).cy(box2.y - 50);

// rotate.draggable().on("dragmove", ((e: CustomEvent) => {
//   const boxCenter = {
//     x: box.x + box.width / 2,
//     y: box.y + box.height / 2,
//   };
//   const angle =
//     Math.atan2(
//       e.detail.event.offsetX - boxCenter.x - 30,
//       -(e.detail.event.offsetY - boxCenter.y)
//     ) *
//     (180 / Math.PI);
//   group.transform({
//     rotate: angle,
//   });
// }) as EventListener);
