import { Shape } from "@svgdotjs/svg.js";
import "../css/color.css";

export default class colorList {
  section;
  constructor(public shape: Shape) {
    this.section = document.querySelector("section");
    document.querySelector(".container")?.remove();
    this.render();
  }
  render() {
    const colorList = [
      "#3e5f97",
      "#FFC6E0",
      "#f4c17b",
      "#EDAA7D",
      "#77af9c",
      "#96B1D0",
      "#C8707E",
    ];

    const container = document.createElement("div");
    container.className = "container";
    this.section?.appendChild(container);

    colorList.forEach((colorName: string) => {
      const color = document.createElement("div");
      color.className = "color";
      color.style.backgroundColor = colorName;
      container?.appendChild(color);

      color.addEventListener("click", () => {
        this.shape.attr({ fill: color.style.backgroundColor });
      });
    });
  }
}
