import { SVG } from "@svgdotjs/svg.js";
import Index from "./src/pages/Index";
import "./src/css/style.css";

export default class App {
  draw;
  constructor(public $target: HTMLElement) {
    const section = document.createElement("section");
    this.$target.appendChild(section);
    this.draw = SVG().size(1200, 600).addClass("svg");
  }
  render() {
    new Index(this.$target, this.draw);
  }
}
