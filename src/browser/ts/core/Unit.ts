import {esES} from "@material-ui/core/locale";

export interface UnitData {
    id?: string
    class?: string[]
    tagName?: string
    editable?: boolean
    style?: { [key: string]: string }
    text?: string
    html?: string
    value?: string|number
}

export default class Unit {

    data: UnitData;
    dom: HTMLElement|HTMLInputElement = null;

    observer: MutationObserver;

    constructor(unitData: UnitData) {

        let self = this;
        this.data = unitData;

        self['.'] = (...className) => {
            for (let i = 0; i < className.length; i++) {
                this.dom.classList.add(className[i]);
            }
        }
        self['<'] = (tagName) => {
            //if (!self.data.view) self.data.view = {}
            //self.data.view.tagName = tagName
            return self
        }
        self['>'] = (txt) => {
            //self.setText(txt)
            return self
        }
    }

    on(eventName: string, callback) {
        this.dom.addEventListener(eventName, callback);
    }

    getId(): string {
        return this.data.id;
    }

    getData(): UnitData {
        return this.data;
    }

    setDOM(dom: HTMLElement) {
        this.dom = dom;
    }

    getDOM() {
        if (this.dom) {
            return this.dom;
        }

        this.dom = document.createElement(this.data.tagName || 'div') as HTMLElement|HTMLInputElement;
        if (this.data.style) {
            for (let key in this.data.style) {

                if (key === 'height' && this.data.text) {
                    delete this.data.style[key];
                    continue;
                }
                this.dom.style[key] = this.data.style[key];
            }
        }
        if (this.data.id) {
            this.dom.id = this.data.id;
        }
        if (this.data.class) {
            this.dom.className = this.data.class.join(' ');
        }

        this.addClass('unit');
        this.addClass('noselect');

        if (this.data.html) {
            this.dom.innerHTML = this.data.html;
        } else if (this.data.text) {
            this.dom.innerText = this.data.text;
        }

        if (this.data.value) {
            // @ts-ignore
            this.dom.value = this.data.value;
        }

        return this.dom;
    }

    setText(txt: string) {
        this.getDOM().innerText = txt;
    }

    setHtml(html: string) {
        this.data.html = html;
        this.getDOM().innerHTML = html;
    }

    getHtml(): string {
        return this.getDOM().innerHTML;
    }

    insert(unit: Unit) {
        this.getDOM().append(unit.getDOM());
    }

    addShift() {
        let dom = this.dom;
        let x = dom.style.left ? parseInt(dom.style.left.replace('px', ''), 10) : 0
        let newX = (x + 100) + 'px';

        this.data.style.left = newX;
        dom.style.left = newX;
    }

    setCoords(x: number = 0, y: number = 0) {
        if (x) {
            this.data.style.left = x + 'px';
            this.dom.style.left = x + 'px';
        }
        if (y) {
            this.data.style.top = y + 'px';
            this.dom.style.top = y + 'px';
        }
    }

    getSizes() {
        return this.dom.getBoundingClientRect()
    }

    getSizesAbsolute() {
        let sizes = this.dom.getBoundingClientRect();
        let scrollX = window.scrollX;
        let scrollY = window.scrollY;

        return {
            bottom: sizes.bottom + scrollY,
            height: sizes.height,
            left: sizes.left + scrollX,
            right: sizes.right + scrollX,
            top: sizes.top + scrollY,
            width: sizes.width,
            x: sizes.x + scrollX,
            y: sizes.y + scrollY,
        }
    }

    select() {
        this.dom.style.border = '2px solid black';
        this.dom.style.padding = '4px';
    }

    unselect() {
        this.dom.style.border = '1px solid black';
        this.dom.style.padding = '5px';
    }

    addClass(className) {
        this.dom.classList.add(className);
    }

    removeClass(className) {
        this.dom.classList.remove(className);
    }

    show() {
        this.getDOM().classList.remove('hidden');
    }

    hide() {
        this.getDOM().classList.add('hidden');
    }

    toggleEdit() {
        if (this.dom.contentEditable === 'true') {
            this.dom.contentEditable = 'false';
            this.data.text = this.dom.innerText;

            return false;
        } else {
            this.dom.contentEditable = 'true';
            this.dom.focus();

            return true;
        }
    }

    observeStart() {
        this.observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName !== 'style') {
                    continue;
                }
                const width = this.getDOM().style.width
                const height = this.getDOM().style.height
                if (width) this.data.style.width = width;
                if (height) this.data.style.height = height;
            }
        });
        this.observer.observe(this.getDOM(), { attributes: true });
    }

    observeStop() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    /*disableEdit() {
        this.dom.contentEditable = undefined;
    }*/
}