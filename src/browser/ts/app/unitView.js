export default class unitView {

    constructor(tagName, u) {
        this.u = u
        this.dom = document.createElement(tagName)
        this.blinkingInterval = false
    }

    setGlobal(u) {
        this.u = u
        return this
    }

    getDOM() {
        return this.dom
    }

    setDom(dom) {
        this.dom = dom
        return this
    }

    getId() {
        return this.dom.id
    }

    setId(id) {
        this.dom.id = id
        return this
    }

    removeFromDOM() {
        this.dom.parentNode.removeChild(this.dom)
    }

    setType(type) {
        this.dom.type = type
        return this
    }

    disableSpellcheck() {
        this.dom.spellcheck = false
        return this
    }

    disableSelection() {
        this.addClass('disable_selection')
        return this
    }

    select() {
        this.addClass('selected')
        return this
    }

    unselect() {
        this.removeClass('selected');
        return this;
    }

    clear() {
        this.dom.innerHTML = '';
        this.dom.innerText = '';
    }

    enableEdit() {
        this.dom.contentEditable = 'true';
        return this;
    }

    disableEdit() {
        this.dom.contentEditable = 'false';
        return this;
    }

    addClass(...className) {
        if (className.length === 1) {
            this.dom.classList.add(className);
            return this
        }

        this.u.f.iterate(className, (index, name) => this.dom.classList.add(name))

        return this
    }

    addClassIfTrue(className, bool) {
        if (!bool) {
            return this;
        }

        this.addClass(className);

        return this;
    }

    hasClass(className) {
        return this.dom.classList.contains(className);
    }

    toggleClass(className) {
        return this.dom.classList.toggle(className);
    }

    removeClass(className) {
        this.dom.classList.remove(className);
        return this;
    }

    addLineBreak() {
        //this.insert(u.unitViewCreator('br'));
    }

    on(eventName, callback) {

        if (typeof eventName === 'object') {

            this.u.f.iterate(eventName, (index, eName) => {
                this.dom.addEventListener(eName, callback);
            });

        } else {
            this.dom.addEventListener(eventName, callback);
        }

        return this;
    }

    off(eventName, callback) {
        this.dom.removeEventListener(eventName, callback);
        return this;
    }

    setOpenOnNewPage() {
        this.dom.setAttribute('target', '_blank');
        return this;
    }

    setAttribute(k, v) {
        this.dom.setAttribute(k, v);
        return this;
    }

    getAttribute(k) {
        return this.dom.getAttribute(k);
    }

    setText(text) {
        this.dom.innerText = text;
        return this;
    }

    getText() {
        return this.dom.innerText;
    }

    setInnerHtml(html) {
        this.dom.innerHTML = html;
        return this;
    }

    setStyle(style) {
        for (let property in style) {
            if (!style.hasOwnProperty(property)) {
                continue;
            }
            this.dom.style[property] = style[property];
        }

        return this;
    }

    setPlaceholder(val) {
        this.dom.placeholder = val;
        return this;
    }

    insert(...unitViews) {
        let dom = this.dom;

        this.u.f.iterate(unitViews, (arrayIndex, unitView) => dom.appendChild(unitView.getDOM()));

        return this;
    }

    insertBefore(...unitViews) {
        let dom = this.dom;

        this.u.f.iterate(unitViews, (arrayIndex, unitView) => {
            dom.parentNode.insertBefore(unitView.getDOM(), dom)
        });
    }

    show() {
        this.removeClass('hidden');
        return this;
    }

    hide() {
        this.addClass('hidden');
        return this;
    }

    hideIfTrue(bool) {
        if (bool) {
            this.addClass('hidden');
        }

        return this;
    }

    setValue(value) {
        this.dom.value = value;
        return this;
    }

    getValue() {
        return this.dom.value;
    }

    setUrl(url) {
        this.dom.src = url;
        return this;
    }

    getPosition() {
        return {x: this.dom.style.left, y: this.dom.style.top};
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

    resetPosition() {
        this.setStyle({
            left: 'auto',
            top: 'auto',
        });

        return this;
    }

    setUnit(unit) {
        this.unit = unit;
        return this;
    }

    blinkingStart() {
        let i = this;

        i.setStyle({border: '2px solid red'});
        setTimeout(() => i.setStyle({border: '0px solid white'}), 450);

        i.blinkingInterval = setInterval(() => {
            i.setStyle({border: '2px solid red'});
            setTimeout(() => i.setStyle({border: '0px solid white'}), 450);
        }, 900);
    }

    blinkingStop() {
        let i = this;

        i.setStyle({border: '2px solid white'});
        clearInterval(i.blinkingInterval);
    }

    showControls() {
        this.dom.controls = true;
    }

    focus() {
        this.dom.focus();
    }

    setPosition(x, y) {
        if (x) this.dom.style.left = x;
        if (y) this.dom.style.top = y;
    }

    moveUnder(unit) {
        let sizes = unit.getView().getSizesAbsolute();
        sizes.y += sizes.height + 2;

        this.setPosition(sizes.x, sizes.y);

        return {x: sizes.x, y: sizes.y};
    }

    moveRight(unit) {
        let sizes = unit.getView().getSizesAbsolute();
        let x = sizes.right + 2;

        this.setPosition(x, sizes.y);

        return {x: x, y: sizes.y};
    }
}

