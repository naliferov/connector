import Unit from "../Unit";
import Pubsub from "../Pubsub";

export default class Button {

    unit: Unit;

    txt: {
        active: string,
        inactive: string,
    } = {
        active: '',
        inactive: '',
    }

    constructor(txt: string, inactiveTxt: string = '') {
        this.unit = new Unit({text: txt, class: ['btn', 'noselect'], style: {display: 'inline-block'}});
        this.txt.active = txt;
        this.txt.inactive = inactiveTxt;
    }

    getUnit() {
        return this.unit;
    }

    on(handlerType, callback) {
        this.unit.on(handlerType, callback);
    }

    click(cb) { this.unit.on('click', cb); }

    toggleStatus(status: boolean) {
        const isNeedChangeTxt = this.txt.inactive;

        if (status) {
            this.unit.addClass('active');
            if (isNeedChangeTxt) this.unit.setText(this.txt.inactive);
        } else {
            this.unit.removeClass('active');
            if (isNeedChangeTxt) this.unit.setText(this.txt.active);
        }
    }

    enable() {
        this.unit.addClass('active');
    }

    disable() {
        this.unit.removeClass('active');
    }
}