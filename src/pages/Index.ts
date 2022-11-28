import "@svgdotjs/svg.draggable.js";
import { Svg } from "@svgdotjs/svg.js";
import { dragItem } from "../utils/Drag";
import ItemList from "../components/ItemList";

export default class Index {
  section;
  svg;
  constructor(public $target: HTMLElement, public draw: Svg) {
    this.section = this.$target.querySelector("section")!;
    this.svg = this.$target.querySelector(".svg")!;
    this.render();
  }

  render() {
    new ItemList(this.$target, this.draw);
    this.draw.addTo(this.section);
    this.svg = this.$target.querySelector(".svg")!;
    const group = this.draw.group();

    this.section.addEventListener("dblclick", ((e: PointerEvent) => {
      if (
        e.target instanceof SVGRectElement ||
        e.target instanceof SVGCircleElement ||
        Array.from(document.querySelectorAll(".vertex")).some(
          (el) => el === e.target
        )
      )
        return;
      document.querySelectorAll(".vertex").forEach((node) => node.remove());
      document.querySelector(".rotate")?.remove();
      document.querySelector(".colorContainer")?.remove();
    }) as EventListener);

    // let flag = 0;
    // const array = ["circle", "rect", "polygon"];
    // let ans: Element[] = [];
    // console.log(this.svg);
    // this.svg?.addEventListener("mouseover", ((e: PointerEvent) => {
    //   if (flag === 1) {
    //     console.log("mouseover");
    //     const groupping = document.elementsFromPoint(e.clientX, e.clientY);
    //     groupping.forEach((el) => {
    //       if (array.includes(el.nodeName)) {
    //         ans.push(el);
    //       }
    //     });
    //     ans.forEach((el: any) => {
    //       group.add(el);
    //     });
    //   }
    // }) as EventListener);

    // this.svg?.addEventListener("mousedown", ((e: PointerEvent) => {
    //   e.preventDefault();
    //   flag = 1;
    // }) as EventListener);

    // this.svg?.addEventListener("mouseup", ((e: PointerEvent) => {
    //   e.preventDefault();
    //   flag = 0;
    // }) as EventListener);

    // group.draggable().on("dragmove", ((e: CustomEvent) => {
    //   e.preventDefault();
    //   dragItem(e);
    // }) as EventListener);
  }
}
