import Unit from "../../../core/Unit";
import State, {UnitsType} from "../../../core/state/State";
import {SELECTION_COMPLETE, SELECTOR_STATUS_CHANGE} from "../../../core/state/Action";

export default class Selector {

    allUnits: UnitsType;
    selectedUnits: UnitsType;

    state: State;

    constructor(allUnits: UnitsType, state: State) {
        this.allUnits = allUnits;
        this.selectedUnits = new Map;
        this.state = state;

        this.state.sub(SELECTOR_STATUS_CHANGE, (data) => {
            data.status ? this.on() : this.off();
        });
    }

    on() {
        const self = this;
        window.onmousedown = (downEvent) => {

            if (downEvent.target.classList.contains('btn')) {
                return;
            }

            this.clear();

            let selector = new Unit({style: {position: 'absolute', border: '1px solid black'}});
            let selectorDOM = selector.getDOM();

            document.getElementById('app').appendChild(selector.getDOM());

            let basePosition = {
                x: downEvent.clientX + window.scrollX,
                y: downEvent.clientY + window.scrollY
            };
            selectorDOM.style.left = basePosition.x + 'px';
            selectorDOM.style.top = basePosition.y + 'px';

            window.onmousemove = (e) => {
                let curX = e.clientX + window.scrollX;
                let curY = e.clientY + window.scrollY;

                if (curX < basePosition.x) {
                    selectorDOM.style.left = curX + 'px';
                    selectorDOM.style.width = (basePosition.x - curX) + 'px';
                } else {
                    selectorDOM.style.width = (curX - basePosition.x) + 'px';
                }
                if (curY < basePosition.y) {
                    selectorDOM.style.top = curY + 'px';
                    selectorDOM.style.height = (basePosition.y - curY) + 'px';
                } else {
                    selectorDOM.style.height = (curY - basePosition.y) + 'px';
                }
            };
            window.onmouseup = (e) => {

                let selectorSizes = selector.getSizes();
                let selectorSizesLeft = selectorSizes.left + window.scrollX;
                let selectorSizesRight = selectorSizes.right + window.scrollX;
                let selectorSizesTop = selectorSizes.top + window.scrollY;
                let selectorSizesBottom = selectorSizes.bottom + window.scrollY;

                for (const [_, unit] of self.allUnits) {

                    let unitSizes = unit.getSizes();
                    let unitLeft = unitSizes.left + window.scrollX;
                    let unitTop = unitSizes.top + window.scrollY;

                    if (
                        unitLeft > selectorSizesLeft && unitLeft < selectorSizesRight &&
                        unitTop > selectorSizesTop && unitTop < selectorSizesBottom
                    ) {
                        unit.select();
                        unit.observeStart();
                        self.getSelectedUnits().set(unit.getId(), unit);
                    }
                }

                window.onmousemove = null;
                selectorDOM.remove();

                this.state.dispatch(SELECTION_COMPLETE);
            }
        };
    }

    off() {
        window.onmousedown = null;
    }

    getFirstSelectedUnit(): Unit|null {
        for (const [_, unit] of this.selectedUnits) {
            return unit;
        }
    }

    getLefterAndTopperUnit() {

        let lastUnit = null;
        let min = 0;

        for (const [_, unit] of this.selectedUnits) {
            if (!lastUnit) lastUnit = unit;

            const sizes = unit.getSizesAbsolute();
            if (!min) { min = sizes.x + sizes.y }

            if (min > (sizes.x + sizes.y)) {
                min = sizes.x + sizes.y;
                lastUnit = unit;
            }
        }

        return lastUnit;
    }

    getSelectedUnits() { return this.selectedUnits };

    getSelectedUnitsCount() { return this.selectedUnits.size };

    toggleSelectUnit(msg) {

        let targetUnit = msg.targetUnit;
        let targetUnitId = targetUnit.getId();

        let selectedUnit = this.selectedUnits[targetUnitId];

        if (!selectedUnit) {
            targetUnit.getView().select();
        }
        delete this.selectedUnits[targetUnitId];
    }

    clear() {
        for (const [_, unit] of this.allUnits) {
            unit.observeStop();
            unit.unselect();
        }
        this.selectedUnits = new Map;
    }
};