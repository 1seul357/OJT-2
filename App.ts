import Index from "./src/pages/Index";
import "./src/css/style.css";

export default class App {
  constructor(public $target: HTMLElement) {
    const section = document.createElement("section");
    this.$target.appendChild(section);
  }
  render() {
    new Index(this.$target);
  }
}
