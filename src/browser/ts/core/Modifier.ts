import Unit, {UnitData} from "./Unit";
import Selector from "../module/mind/modifier/Selector";
import State from "./state/State";
import Functions from "../../../lib/ts/Functions";
import Mover from "../module/mind/modifier/Mover";
import Button from "./element/Button";
import {
    HTML_EDITOR_FINISH_EDITION, MOVER_STATUS_CHANGE,
    MOVER_TOGGLE,
    SELECTION_COMPLETE,
    SELECTOR_STATUS_CHANGE,
    SELECTOR_TOGGLE
} from "./state/Action";
import HtmlEditor from "../module/mind/modifier/HtmlEditor";

export default class Modifier {

    unit: Unit;

    state: State;
    app: Unit;

    selector: Selector;
    mover: Mover;
    htmlEditor: HtmlEditor;

    constructor(state: State) {
        this.unit = new Unit({style: {display: 'flex'}});
        this.state = state;
    }

    setApp(unit: Unit) {
        this.app = unit;
    }

    setUnit(unit: Unit) {
        this.unit = unit;
    }

    setSelector(selector: Selector) {
        this.selector = selector;
    }

    setMover(mover: Mover) {
        this.mover = mover;
    }

    setHtmlEditor(htmlEditor: HtmlEditor) {
        this.htmlEditor = htmlEditor;
    }

    async init() {
        let create = new Button('create');
        this.unit.insert(create.getUnit());

        let select = new Button('select');
        this.unit.insert(select.getUnit());
        select.getUnit().on('click', async () => {
            await this.state.dispatch(MOVER_STATUS_CHANGE, {status: false});
            await this.state.dispatch(SELECTOR_TOGGLE);
        });
        this.state.sub(SELECTOR_STATUS_CHANGE, (data) => data.status ? select.enable() : select.disable());

        let move = new Button('move');
        this.unit.insert(move.getUnit());
        move.on('click', (e) => {
            this.state.dispatch(SELECTOR_STATUS_CHANGE, {status: false});
            if (this.selector.getSelectedUnits().size > 0) {
                this.state.dispatch(MOVER_STATUS_CHANGE, {status: true});
                return;
            }
            this.state.dispatch(MOVER_STATUS_CHANGE, {status: false});
        });
        this.state.sub(MOVER_STATUS_CHANGE, (data) =>  move.toggleStatus(data.status));

        let copy = new Button('copy');
        this.unit.insert(copy.getUnit());
        copy.on('click', () => {
            this.copy()
        });

        let deleteBtn = new Button('delete');
        this.unit.insert(deleteBtn.getUnit());
        deleteBtn.on('click', (e) => this.delete());

        let editText = new Button('edit text');
        this.unit.insert(editText.getUnit());

        let editHtml = new Button('edit html');
        this.unit.insert(editHtml.getUnit());
        editHtml.on('click', (e) => {

            if (this.htmlEditor.isOn()) {
                this.htmlEditor.off();
                return;
            }

            const unit = this.selector.getFirstSelectedUnit();
            if (!unit) {
                return;
            }
            this.htmlEditor.on(unit);
        });

        this.state.sub(SELECTION_COMPLETE, () => {});

        this.state.sub(HTML_EDITOR_FINISH_EDITION, () => this.state.save());

        this.shortcuts();

        //await this.state.dispatch(SELECTOR_STATUS_CHANGE, {status: true});
    }

    insert(unit: Unit) {
        this.unit.insert(unit);
    }

    shortcuts() {
        /*window.ondblclick = (e) => {
            if (!e.target.id) return;
            const unit = this.state.getUnit(e.target.id);

            if (!unit) return;
            if (!unit.toggleEdit()) {
                this.state.save();
            }
        }*/

        let editMode = false;

        window.onkeydown = (e) => {

            if (e.key === 'e') {
                /*for (const [_, unit] of this.selector.getSelectedUnits()) {
                    if (unit.toggleEdit()) {
                        editMode = true;
                    } else {
                        editMode = true;
                        this.state.save();
                    }
                    return;
                }*/
            }
        }
    }

    getUnit(): Unit {
        return this.unit;
    }

    copy() {
        for (const [_, unit] of this.selector.getSelectedUnits()) {

            let newUnitData: UnitData = Functions.cloneObject(unit.getData());
            newUnitData.id = Functions.uuid();
            let newUnit = new Unit(newUnitData);

            this.app.insert(newUnit);
            newUnit.addShift();

            this.state.addUnit(newUnit);
        }
    }

    delete() {
        for (const [_, unit] of this.selector.getSelectedUnits()) {
            unit.getDOM().parentElement.removeChild(unit.getDOM());
            this.state.deleteUnit(unit.getId());
        }
    }

    move() {

    }
}