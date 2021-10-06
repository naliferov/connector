import Unit from "../../../core/Unit";
import State from "../../../core/state/State";
import {HTML_EDITOR_FINISH_EDITION, SELECTOR_STATUS_CHANGE} from "../../../core/state/Action";

export default class HtmlEditor {

    unit: Unit;
    targetUnit: Unit
    state: State;

    editorWidth = 500;
    editorHeight = 500;

    isActive: boolean = false;

    constructor(state: State) {
        this.state = state;
        this.unit = new Unit({style: {
            position: 'absolute',
            width: this.editorWidth + 'px',
            height: this.editorHeight + 'px',
            border: '1px solid black',
            padding: '5px',
            background: 'whitesmoke',
            zIndex: '9999'
        }});
        this.unit.hide();

        document.getElementById('app').appendChild(this.unit.getDOM());
    }

    isOn(): boolean {
        return this.isActive;
    }

    on(unit: Unit) {
        this.targetUnit = unit;

        this.unit.setCoords(
            (window.innerWidth / 2) - (this.editorWidth / 2),
            (window.innerHeight / 2) - (this.editorHeight / 2)
        );
        this.unit.show();

        this.unit.setHtml(unit.getHtml());
        this.unit.toggleEdit();

        this.isActive = true;
    }

    off() {
        this.targetUnit.setHtml(this.unit.getHtml());

        this.unit.hide();
        this.unit.setHtml('');
        this.unit.toggleEdit();

        this.isActive = false;
        this.targetUnit = null;

        this.state.dispatch(HTML_EDITOR_FINISH_EDITION);
    }
};