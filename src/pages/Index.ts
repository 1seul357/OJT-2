import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import Circle from "../components/Circle";
import Rectangle from "../components/Rectangle";
import Triangle from "../components/Triangle";

export default class Index {
  section;
  constructor(public $target: HTMLElement) {
    this.section = this.$target.querySelector("section")!;
    this.$target.appendChild(this.section);
    this.render();
  }

  render() {
    const data = [
      {
        key: "rect",
        width: 150,
        height: 150,
        x: 100,
        y: 100,
        fill: "#3e5f97",
      },
      {
        key: "rect",
        width: 300,
        height: 300,
        x: 750,
        y: 300,
        fill: "#FFC6E0",
      },
      { key: "circle", width: 150, x: 300, y: 250, fill: "#f4c17b" },
      { key: "circle", width: 250, x: 400, y: 450, fill: "#77af9c" },
      { key: "Triangle", point: "200,500 300,700 100,700", fill: "#96B1D0" },
    ];
    let draw = SVG().addTo(this.section).size(1200, 900);

    data.forEach((el, i) => {
      if (el.key === "rect") {
        new Rectangle(data[i], draw);
      } else if (el.key === "circle") {
        new Circle(data[i], draw);
      } else {
        new Triangle(data[i], draw);
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
      document.querySelectorAll(".vertex").forEach((node) => node.remove());
      document.querySelector(".rotate")?.remove();
      document.querySelector(".container")?.remove();
    }) as EventListener);
  }
}
