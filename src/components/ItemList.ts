import { SVG } from "@svgdotjs/svg.js";
import Circle from "../components/Circle";
import Rectangle from "../components/Rectangle";
import Polygon from "../components/Polygon";
import polygonImg from "../assets/polygon.png";
import circleImg from "../assets/circle.png";
import rectImg from "../assets/rect.png";
import "../css/ItemList.css";

export default class ItemList {
  section;
  constructor(public $target: any) {
    this.section = $target.querySelector("section");
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "container";
    this.section.appendChild(container);

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

    let draw = SVG().addTo(this.section).size(1200, 900);

    const data = {
      width: 150,
      height: 150,
      x: 0,
      y: 0,
      fill: "#fffb7a",
      point: "0",
    };

    const colorList = [
      "#3e5f97",
      "#FFC6E0",
      "#f4c17b",
      "#EDAA7D",
      "#fffb7a",
      "#77af9c",
      "#96B1D0",
      "#d8ceff",
      "#C8707E",
      "#ff4f70",
    ];

    this.section.addEventListener("drop", ((e: PointerEvent) => {
      const dragging = document.querySelector(".dragging");
      const random = Math.floor(Math.random() * colorList.length);
      data.x = e.offsetX - 150 / 2;
      data.y = e.offsetY - 150 / 2;
      data.fill = colorList[random];

      if (dragging?.classList.contains("circle")) {
        new Circle(data, draw);
      } else if (dragging?.classList.contains("rect")) {
        new Rectangle(data, draw);
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
        data.point = point;
        new Polygon(data, draw);
      }
      e.preventDefault();
      dragging?.classList.remove("dragging");
    }) as EventListener);

    this.section.addEventListener("dragover", ((e: PointerEvent) => {
      e.preventDefault();
    }) as EventListener);
  }
}
