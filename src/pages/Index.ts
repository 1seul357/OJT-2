import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import Circle from "../components/Circle";
import Rectangle from "../components/Rectangle";

export default class Index {
  section;
  constructor(public $target: HTMLElement) {
    this.section = this.$target.querySelector("section")!;
    this.$target.appendChild(this.section);
    this.render();
  }

  render() {
    const data = [
      { key: "rect", width: 150, height: 150, x: 100, y: 100, fill: "#3e5f97" },
      { key: "rect", width: 300, height: 300, x: 500, y: 500, fill: "#FFC6E0" },
      { key: "circle", width: 150, x: 250, y: 250, fill: "#f4c17b" },
    ];
    let draw = SVG().addTo(this.section).size(1200, 900);
    let flag = true;

    data.forEach((el, i) => {
      if (el.key === "rect") {
        new Rectangle(data[i], draw, flag);
      } else {
        new Circle(data[i], draw, flag);
      }
    });

    this.section.addEventListener("dblclick", ((e: PointerEvent) => {
      if (
        e.target instanceof SVGRectElement ||
        e.target instanceof SVGCircleElement ||
        Array.from(document.querySelectorAll(".vertex")).some(
          (el) => el === e.target
        )
      )
        return;
      flag = true;
      document.querySelectorAll(".vertex").forEach((node) => node.remove());
    }) as EventListener);
  }
}
