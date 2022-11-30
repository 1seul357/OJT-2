import { Shape, Svg } from "@svgdotjs/svg.js";
import colorList from "../components/ColorList";

export const clickItem = (
  item: Shape,
  draw: Svg,
  multipleSelection: Function
) => {
  document.querySelectorAll(".circles").forEach((node) => node.remove());
  const g = draw.group();
  let controller: () => void;
  g.add(item).fill("transparent").stroke("#66666699");
  new colorList(item);

  g.mousedown((e: any) => {
    if (e.shiftKey) {
      multipleSelection(g);
      return;
    }
    document.querySelector(".colorContainer")?.remove();
    document.querySelectorAll(".circles").forEach((node) => node.remove());
    new colorList(item);
    const x = Number(g.x());
    const y = Number(g.y());
    const startPoint = draw.point(e.clientX, e.clientY);

    const moveHandler = (e: MouseEvent) => {
      controller();
      const newPoint = draw.point(e.clientX, e.clientY);
      g.x(x + newPoint.x - startPoint.x).y(y + newPoint.y - startPoint.y);
    };

    const upHandler = () => {
      controller();
      draw.off("mousemove", moveHandler);
      draw.off("mouseup", upHandler);
      controller = makeController(item);
    };
    draw.on("mousemove", moveHandler);
    draw.on("mouseup", upHandler);
  });

  const makeController = (el: Shape) => {
    const clone = el
      .clone()
      .stroke("#66666699")
      .addClass("clone")
      .fill("transparent")
      .addTo(g);

    const x1 = Number(g.x());
    const x2 = x1 + Number(el.width());
    const y1 = Number(g.y());
    const y2 = y1 + Number(el.height());
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const pts = [
      [x1, y1],
      [x2, y1],
      [x1, y2],
      [x2, y2],
    ];

    const r = ((el.transform().rotate ?? 0) * Math.PI) / 180;
    const inverse = el.matrix().multiply(el.matrix().inverse());

    const circles = pts.map((pt, i) => {
      const circle = g
        .circle(10)
        .cx(pt[0])
        .cy(pt[1])
        .addClass("circles")
        .transform(el.transform())
        .fill("#666666")
        .mousedown((e: MouseEvent) => {
          e.stopPropagation();
          const moveHandler = (e: MouseEvent) => {
            const point = draw.point(e.clientX, e.clientY);
            const rotatedPoint = point.transform(el.matrix().inverse());

            const dx = rotatedPoint.x - pt[0];
            const dy = rotatedPoint.y - pt[1];

            if (i === 0) {
              clone.width(Number(el.width()) - dx);
              clone.height(Number(el.height()) - dy);
              clone.x(Number(el.x()) + dx).y(Number(el.y()) + dy);
            }
            if (i === 1) {
              clone.width(Number(el.width()) + dx);
              clone.height(Number(el.height()) - dy);
              clone.x(el.x()).y(Number(el.y()) + dy);
            }
            if (i === 2) {
              clone.width(Number(Number(el.width())) - dx);
              clone.height(Number(Number(el.height())) + dy);
              clone.x(Number(el.x()) + dx).y(el.y());
            }
            if (i === 3) {
              clone.width(Number(el.width()) + dx);
              clone.height(Number(el.height()) + dy);
              clone.x(el.x()).y(el.y());
            }
          };
          const upHandler = () => {
            el.size(clone.width(), clone.height()).x(clone.x()).y(clone.y());
            // .translate((_a * dx) / 2 + (_c * dy) / 2, (_b * dx) / 2 + (_d * dy) / 2);
            remove();
            draw.off("mousemove", moveHandler);
            draw.off("mouseup", upHandler);
            controller = makeController(el);
          };
          draw.on("mousemove", moveHandler);
          draw.on("mouseup", upHandler);
        });
      return circle;
    });
    const remove = () => {
      circles.forEach((el) => el.remove());
      clone.remove();
    };
    return remove;
  };

  window.addEventListener("keyup", (e) => {
    if (e.key === "Delete") {
      if (g.node.childElementCount >= 4) {
        g.remove();
      }
    }
  });

  controller = makeController(item);

  // g.draggable().on("dragmove", ((e: CustomEvent) => {
  //   e.preventDefault();
  //   dragItem(e);
  // }) as EventListener);

  //   const rotate = draw
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
};
