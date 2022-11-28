import { SVG } from "@svgdotjs/svg.js";
import Circle from "../components/Circle";
import Rectangle from "../components/Rectangle";
import Polygon from "../components/Polygon";
import "../css/ItemList.css";
import polygonImg from "../assets/polygon.png";
import circleImg from "../assets/circle.png";
import rectImg from "../assets/rect.png";

export default class ItemList {
  section;
  constructor(public $target: any) {
    this.section = $target.querySelector("section");
    this.render();
  }
  render() {
    const data = [
      {
        key: "rect",
        width: 150,
        height: 150,
        x: 100,
        y: 100,
        fill: "#3e5f97",
      },
      {
        key: "rect",
        width: 300,
        height: 300,
        x: 750,
        y: 300,
        fill: "#FFC6E0",
      },
      { key: "circle", width: 150, x: 300, y: 250, fill: "#f4c17b" },
      { key: "circle", width: 250, x: 400, y: 450, fill: "#77af9c" },
      { key: "polygon", point: "200,500 300,700 100,700", fill: "#96B1D0" },
    ];

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

    this.section.addEventListener("drop", ((e: PointerEvent) => {
      const dragging = document.querySelector(".dragging");
      if (dragging?.classList.contains("circle")) {
        new Circle(data[2], draw);
      } else if (dragging?.classList.contains("rect")) {
        new Rectangle(data[0], draw);
      } else {
        new Polygon(data[4], draw);
      }
      e.preventDefault();
      dragging?.classList.remove("dragging");
    }) as EventListener);

    this.section.addEventListener("dragover", ((e: PointerEvent) => {
      e.preventDefault();
    }) as EventListener);
  }
}
