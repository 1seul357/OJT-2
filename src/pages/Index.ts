import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
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
    const multipleSelection = (item: any) => {
      const items: any = item;
      document.querySelector(".colorContainer")?.remove();
      document.querySelectorAll(".circles").forEach((node) => node.remove());
      group.add(items).addClass("group");
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

    new ItemList(this.$target, this.draw, multipleSelection);
    this.draw.addTo(this.section);

    group.draggable().on("dragmove", ((e: CustomEvent) => {
      e.preventDefault();
      if (document.querySelector(".group")) {
        dragItem(e);
      }
    }) as EventListener);

    this.section.addEventListener("dblclick", ((e: PointerEvent) => {
      document.querySelectorAll(".select").forEach((node) => node.remove());
      document.querySelectorAll(".circles").forEach((node) => node.remove());
      document.querySelector(".colorContainer")?.remove();
      if (document.querySelector(".group")) {
        removeGroup();
      }
    }) as EventListener);
  }
}
