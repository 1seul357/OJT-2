import './style.css';
import { Matrix, Path, Shape, Svg, SVG } from '@svgdotjs/svg.js';

const draw = SVG().addTo('#app');
const g = draw.group();
g.rect(300, 150).fill('transparent').stroke('#ff0000');
const rect = g.rect(50, 100).cx(0).cy(0).rotate(-15).translate(150, 75);

const makeController = (el: Shape) => {
    const clone = el.clone().stroke('red').fill('transparent').addTo(g);
    const x1 = Number(el.x());
    const x2 = x1 + Number(el.width());
    const y1 = Number(el.y());
    const y2 = y1 + Number(el.height());
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const pts = [
        [x1, y1],
        [x2, y1],
        [x1, y2],
        [x2, y2]
    ];

    const r = ((el.transform().rotate ?? 0) * Math.PI) / 180;
    const inverse = el.matrix().multiply(el.matrix().inverse());

    const circles = pts.map(pt => {
        const circle = g
            .circle(10)
            .cx(pt[0])
            .cy(pt[1])
            .transform(el.transform())
            .fill('red')
            .mousedown(() => {
                draw.mousemove((e: MouseEvent) => {
                    const point = draw.point(e.clientX, e.clientY);
                    const rotatedPoint = point.transform(el.matrix().inverse());

                    const dx = rotatedPoint.x - pt[0];
                    const dy = rotatedPoint.y - pt[1];

                    clone.width(Number(el.width()) + dx);
                    clone.height(Number(el.height()) + dy);
                    clone.x(el.x()).y(el.y());
                });
                draw.mouseup(() => {
                    el.size(clone.width(), clone.height()).x(clone.x()).y(clone.y());
                    // .translate((_a * dx) / 2 + (_c * dy) / 2, (_b * dx) / 2 + (_d * dy) / 2);

                    remove();

                    draw.mousemove(null);
                    draw.mouseup(null);
                    clone.remove();
                    makeController(el);
                });
            });
        return circle;
    });
    const remove = () => {
        circles.forEach(el => el.remove());
    };
};
makeController(rect);
