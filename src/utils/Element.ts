export default class Element {
    node;
    constructor(tag: any) {
        if (tag instanceof HTMLElement) {
            this.node = tag;
        } else {
            this.node = document.createElement(tag);
        }
    }
    appendTo(parent: any) {
        parent.node.appendChild(this.node);
        return this;
    }
    append(el: Object) {
        this.node.appendChild(el);
        return this;
    } 
    addClass(className: string) {
        this.node.classList.add(className);
        return this;
    }
    removeClass(className: string) {
        this.node.classList.remove(className);
        return this;
    }
    isContainClass(className: string) {
        return this.node.classList.contains(className);
    }
    src(url: string) {
        this.node.src = url;
        return this;
    }
    remove() {
        this.node.remove();
        return this;
    }
    select(selector: string) {
        return new Element(this.node.querySelector(selector));
    }
    selectAll(selector: string) {
        return [...this.node.querySelectorAll(selector)].map(el => new Element(el));
    }
    style(color: string) {
        this.node.style.backgroundColor = color;
        return this;
    }
    on(eventName: string, callbackFn: Function) {
        this.node.addEventListener(eventName, callbackFn);
        return this;
    }
}

export const createElement = (tagName: string) => {
    return new Element(tagName)
}