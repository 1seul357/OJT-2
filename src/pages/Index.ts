import "@svgdotjs/svg.draggable.js";
import { Shape, Svg } from "@svgdotjs/svg.js";
import { dragItem } from "../utils/Drag";
import ItemList from "../components/ItemList";

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
      flag = 1;
      group.add(item).addClass("group");
    };

    const isFlag = () => {
      return flag;
    };

    new ItemList(this.$target, this.draw, multipleSelection, isFlag);
    this.draw.addTo(this.section);

    group.draggable().on("dragmove", ((e: CustomEvent) => {
      document.querySelectorAll(".vertex").forEach((node) => node.remove());
      e.preventDefault();
      if (document.querySelector(".group")) {
        dragItem(e);
      }
    }) as EventListener);

    this.section.addEventListener("dblclick", ((e: PointerEvent) => {
      flag = 0;
      // this.draw.find("g").forEach((node) => {
      //   if (node.node.childNodes.length === 0) {
      //     node.remove();
      //   }
      // });
      document.querySelector(".group")?.classList.remove("group");
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
