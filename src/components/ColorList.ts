import { Shape } from "@svgdotjs/svg.js";
import { colorData } from "../utils/Data";
import Element, { createElement } from "../utils/Element";
import "../css/color.css";

export default class ColorList {
  section;
  constructor(public shape: Shape) {
    this.section = new Element(document.querySelector("section"));
    this.render();
  }
  render() {
    const container = createElement("div").addClass("colorContainer").appendTo(this.section);

    colorData.forEach((colorName: string) => {
      const color = createElement("div").addClass("color").style(colorName).appendTo(container);

      color.on("click", () => {
        this.shape.attr({ fill: color.node.style.backgroundColor });
      });
    });
  }
}
