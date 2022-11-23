import Index from "./Index";
import "./style.css";

export default class App {
  public $target: HTMLElement;
  constructor($target: HTMLElement) {
    this.$target = $target;
    const section = document.createElement("section");
    this.$target.appendChild(section);
    this.render();
  }
  render() {
    new Index(this.$target);
  }
}
