import { Svg } from "@svgdotjs/svg.js";
import Circle from "../components/Circle";
import Rectangle from "../components/Rectangle";
import Polygon from "../components/Polygon";
import polygonImg from "../assets/polygon.png";
import circleImg from "../assets/circle.png";
import rectImg from "../assets/rect.png";
import "../css/ItemList.css";
import { colorData, itemData } from "./Data";

export default class ItemList {
  section;
  constructor(
    public $target: HTMLElement,
    public draw: Svg,
    public multipleSelection: Function,
    public isFlag: Function
  ) {
    this.section = $target.querySelector("section");
    this.render();
  }
  render() {
    const draw = this.draw;
    const isFlag = this.isFlag;
    const multipleSelection = this.multipleSelection;

    const container = document.createElement("div");
    container.className = "container";
    this.section?.appendChild(container);

    const array = ["rect", "circle", "polygon"];
    const arrayImg = [rectImg, circleImg, polygonImg];

    for (let index = 0; index < array.length; index++) {
      const image = document.createElement("img");
      image.src = arrayImg[index];
      image.className = array[index];
      container.appendChild(image);

      image.addEventListener("drag", ((e: PointerEvent) => {
        image.classList.add("dragging");
        e.preventDefault();
      }) as EventListener);
    }

    this.section?.addEventListener("drop", ((e: PointerEvent) => {
      const dragging = document.querySelector(".dragging");
      const random = Math.floor(Math.random() * colorData.length);
      itemData.x = e.offsetX - 150 / 2;
      itemData.y = e.offsetY - 150 / 2;
      itemData.fill = colorData[random];

      if (dragging?.classList.contains("circle")) {
        new Circle(itemData, draw, multipleSelection, isFlag);
      } else if (dragging?.classList.contains("rect")) {
        new Rectangle(itemData, draw, multipleSelection, isFlag);
      } else {
        const point =
          e.offsetX +
          "," +
          (e.offsetY - 75) +
          " " +
          (e.offsetX + 75) +
          "," +
          (e.offsetY + 75) +
          " " +
          (e.offsetX - 75) +
          "," +
          (e.offsetY + 75);
        itemData.point = point;
        new Polygon(itemData, draw, multipleSelection, isFlag);
      }
      e.preventDefault();
      dragging?.classList.remove("dragging");
    }) as EventListener);

    this.section?.addEventListener("dragover", ((e: PointerEvent) => {
      e.preventDefault();
    }) as EventListener);
  }
}
