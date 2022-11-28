import "@svgdotjs/svg.draggable.js";
import ItemList from "../components/ItemList";

export default class Index {
  section;
  constructor(public $target: HTMLElement) {
    this.section = this.$target.querySelector("section")!;
    this.$target.appendChild(this.section);
    this.render();
  }

  render() {
    new ItemList(this.$target);

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
  }
}
