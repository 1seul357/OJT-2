import "@svgdotjs/svg.draggable.js";
import { Shape, Svg } from "@svgdotjs/svg.js";
import { dragItem } from "../utils/Drag";
import ItemList from "../components/ItemList";
import { removeGroup } from "../utils/removeGroup";

export default class Index {
  section;
  constructor(public $target: HTMLElement, public draw: Svg) {
    this.section = this.$target.querySelector("section")!;
    this.render();
  }

  render() {
    const group = this.draw.group();
    let flag = 0;

    const multipleSelection = (item: Shape) => {
      document.querySelector(".colorContainer")?.remove();
      flag = 1;
      group.add(item).addClass("group");
      const box = group.bbox();
      const select = this.draw
        .rect(box.width, box.height)
        .x(box.x)
        .y(box.y)
        .addClass("select")
        .attr({ fill: "#ffffff66" })
        .stroke({ color: "#00000099" });
      group.add(select);
    };

    new ItemList(this.$target, this.draw, multipleSelection, () => {
      return flag;
    });
    this.draw.addTo(this.section);

    group.draggable().on("dragmove", ((e: CustomEvent) => {
      e.preventDefault();
      if (document.querySelector(".group")) {
        dragItem(e);
      }
    }) as EventListener);

    this.section.addEventListener("dblclick", ((e: PointerEvent) => {
      document.querySelectorAll(".select").forEach((node) => node.remove());
      flag = 0;
      removeGroup();
      if (
        e.target instanceof SVGRectElement ||
        e.target instanceof SVGCircleElement ||
        Array.from(document.querySelectorAll(".vertex")).some(
          (el) => el === e.target
        )
      )
        return;
      document.querySelectorAll(".vertex").forEach((node) => node.remove());
      document.querySelector(".colorContainer")?.remove();
    }) as EventListener);
  }
}

// this.draw.find("g").forEach((node) => {
//   if (node.node.childNodes.length === 0) {
//     node.remove();
//   }
// });
