import { Shape } from "@svgdotjs/svg.js";
import "../css/color.css";
import { colorData } from "./Data";

export default class colorList {
  section;
  constructor(public shape: Shape) {
    this.section = document.querySelector("section");
    document.querySelector(".colorContainer")?.remove();
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "colorContainer";
    this.section?.appendChild(container);

    colorData.forEach((colorName: string) => {
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
