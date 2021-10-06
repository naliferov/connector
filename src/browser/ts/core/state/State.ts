import Request from "../io/Request";
import Unit from "../Unit";
import {SELECTOR_TOGGLE, SELECTOR_STATUS_CHANGE, MOVER_TOGGLE, MOVER_STATUS_CHANGE} from "./Action";

export type UnitsType = Map<string, Unit>;

export default class State {

    persistentUnits: UnitsType;

    modifiers: {
        selector: boolean,
        mover: boolean
    } = {
        selector: false,
        mover: false
    }

    subscribers: [] = [];

    async dispatch(action: string, data: any = {}) {

        if (action === SELECTOR_TOGGLE) {
            await this.dispatch(SELECTOR_STATUS_CHANGE, {status: !this.modifiers.selector });
        } else if (action === SELECTOR_STATUS_CHANGE) {
            this.modifiers.selector = data.status;
        }

        if (action === MOVER_TOGGLE) {
            await this.dispatch(MOVER_STATUS_CHANGE, {status: !this.modifiers.mover });
        } else if (action === MOVER_STATUS_CHANGE) {
            this.modifiers.mover = data.status;
        }
    }

    async pub(action: string, data: any = {}) {

        const actionSubscribers = this.subscribers[action];
        if (!actionSubscribers) {
            return;
        }
        for (let i = 0; i < actionSubscribers.length; i++) actionSubscribers[i](data);
    }

    sub(action: string, callback) {
        if (!this.subscribers[action]) {
            this.subscribers[action] = [];
        }
        this.subscribers[action].push(callback);
    }

    async save() {
        let data = [];
        for (const [_, unit] of this.persistentUnits) {
            data.push(unit.getData());
        }
        await new Request().post('/state', {data});
    }

    setUnits(units: UnitsType) {
        this.persistentUnits = units;
    }

    getUnit(id: string) {
        return this.persistentUnits.get(id);
    }

    async addUnit(unit: Unit) {
        this.persistentUnits.set(unit.getId(), unit);
        await this.save();
    }

    async deleteUnit(id: string) {
        this.persistentUnits.delete(id);
        await this.save();
    }
}