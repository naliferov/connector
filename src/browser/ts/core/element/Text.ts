import Unit from "../Unit";

export default class Text {

    unit: Unit;

    constructor(txt: string) {
        this.unit = new Unit({text: txt});
    }

    getDOM() {
        return this.unit.getDOM();
    }

    getUnit() {
        return this.unit;
    }
}