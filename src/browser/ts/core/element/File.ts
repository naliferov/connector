import Unit from "../Unit";
import Pubsub from "../Pubsub";

export default class File {

    unit: Unit;

    constructor(text: string) {

        this.unit = new Unit({
            text: text
        });
    }

    getUnit() {
        return this.unit;
    }

    on(handlerType, callback) {
        this.unit.on(handlerType, callback);
    }
}