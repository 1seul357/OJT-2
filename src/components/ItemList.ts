import { Svg } from "@svgdotjs/svg.js";
import { colorData, itemData } from "../utils/Data";
import Circle from "../components/Circle";
import Rectangle from "../components/Rectangle";
import Polygon from "../components/Polygon";
import polygonImg from "../assets/polygon.png";
import circleImg from "../assets/circle.png";
import rectImg from "../assets/rect.png";
import "../css/ItemList.css";
import Element, { createElement } from "../utils/Element";

export default class ItemList {
  section;
  constructor(
    public $target: HTMLElement,
    public draw: Svg,
    public multipleSelection: Function
  ) {
    this.section = new Element(document.querySelector("section"));
    this.render();
  }
  render() {
    const draw = this.draw;
    const multipleSelection = this.multipleSelection;

    const container = createElement("div")
      .addClass("container")
      .appendTo(this.section);

    const array = ["rect", "circle", "polygon"];
    const arrayImg = [rectImg, circleImg, polygonImg];

    for (let index = 0; index < array.length; index++) {
      const image = createElement("img")
        .src(arrayImg[index])
        .addClass(array[index])
        .appendTo(container);

      image.on("drag", ((e: PointerEvent) => {
        image.addClass("dragging");
      }) as EventListener);
    }

    this.section.on("drop", ((e: PointerEvent) => {
      const dragging = this.section.select(".dragging");
      const random = Math.floor(Math.random() * colorData.length);
      itemData.x = e.offsetX - 150 / 2;
      itemData.y = e.offsetY - 150 / 2;
      itemData.fill = colorData[random];

      if (dragging.isContainClass("circle")) {
        new Circle(itemData, draw, multipleSelection);
      } else if (dragging.isContainClass("rect")) {
        new Rectangle(itemData, draw, multipleSelection);
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
        new Polygon(itemData, draw, multipleSelection);
      }
      e.preventDefault();
      dragging.removeClass("dragging");
    }) as EventListener);

    this.section.on("dragover", ((e: PointerEvent) => {
      e.preventDefault();
    }) as EventListener);
  }
}
