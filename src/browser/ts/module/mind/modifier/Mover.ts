import Unit from "../../../core/Unit";
import Selector from "./Selector";
import State from "../../../core/state/State";
import {MOVER_STATUS_CHANGE} from "../../../core/state/Action";

export default class Mover {

    state: State;
    selector: Selector;

    unit: Unit;

    constructor(selector: Selector, state: State) {

        this.selector = selector;
        this.state = state;

        this.unit = new Unit({text:'move', class: ['btn'], style: {position: 'absolute', border: '1px solid black'}});
        document.body.appendChild(this.unit.getDOM());
        this.unit['.']('noselect');

        this.unit.hide();

        this.state.sub(MOVER_STATUS_CHANGE, (data) => {
            data.status ? this.on() : this.off()
        })
    }

    on() {
        this.unit.show();

        const targetSizes = this.selector.getLefterAndTopperUnit().getSizesAbsolute();
        const unitSizes = this.unit.getSizesAbsolute();
        this.unit.setCoords(targetSizes.x, targetSizes.y - unitSizes.height - 1);

        this.unit.getDOM().onmousedown = (downEvent) => {

            if (this.selector.getSelectedUnitsCount() < 1) return;

            const moverSizes = this.unit.getSizesAbsolute();
            const moverShift = {
                x: (downEvent.clientX + window.scrollX) - moverSizes.x,
                y: (downEvent.clientY + window.scrollY) - moverSizes.y,
            }
            let shifts = {};
            for (const [_, unit] of this.selector.getSelectedUnits()) {
                const sizes = unit.getSizesAbsolute();
                shifts[unit.getId()] = {
                    x: (downEvent.clientX + window.scrollX - sizes.x) - moverShift.x,
                    y: (downEvent.clientY + window.scrollY - sizes.y) - moverShift.y
                };
            }

            let targetUnit = this.selector.getLefterAndTopperUnit();

            window.onmousemove = (e) => {
                let x = e.clientX + window.scrollX - moverShift.x;
                let y = e.clientY + window.scrollY - moverShift.y;
                this.unit.setCoords(x, y);

                for (const [_, unit] of this.selector.getSelectedUnits()) {

                    if (unit.getId() === targetUnit.getId()) {
                        unit.setCoords(x, y + unitSizes.height + 1);
                    } else {
                        const shift = shifts[unit.getId()];
                        unit.setCoords(x - shift.x, y - shift.y);
                    }
                }
            };
            window.onmouseup = (e) => {
                this.state.save();
                window.onmousemove = null;

                this.state
            }
        };
    }

    off() {
        this.unit.hide();
        window.onmousedown = null;
        window.onmouseup = null;
        window.onmousemove = null;
    }
};