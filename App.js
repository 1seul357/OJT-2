import Index from "./src/Index";

export default class App {
  constructor($target) {
    this.$target = $target;
    this.section = document.createElement("section");
    this.$target.appendChild(this.section);
  }
  start() {
    const $target = this.$target;
    new Index({ $target });
  }
}
