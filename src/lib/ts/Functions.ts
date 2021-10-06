import {randomBytes} from "crypto";

export default class Functions {

    static asyncWaterfall(array: Array<object>) {
        //let execute = () => array.shift()(execute);
        //execute();
    }

    static callWithDelay(fn: any, delay: any): Promise<null> {
        return new Promise<any>((resolve) => {
            setTimeout(async () => {
                await fn()
                resolve(null)
            }, delay)
        })
    }

    static cloneObject(object: any): object {

        if (Array.isArray(object)) {
            let array = []
            for (let i = 0; i < object.length; i++) {

                let value = object[i]
                let valueType = typeof value

                if (valueType === 'function') continue
                if (valueType === 'object' && valueType !== null) {
                    array.push(Functions.cloneObject(value))
                } else {
                    array.push(value)
                }
            }

            return array
        }

        let clone: { [key: string]: any } = {}

        for (let key in object) {

            if (!object.hasOwnProperty(key)) continue

            let value = object[key]
            let valueType = typeof value

            if (valueType === 'function') continue
            if (valueType === 'object' && valueType !== null) {
                clone[key] = Functions.cloneObject(value)
            } else {
                clone[key] = value
            }
        }

        return clone
    }

    static getDeepestObjectAndKey(topLevelObject: object, path: string) {
        let keys = path.split('.');

        let lastValue: { [key: string]: any } = topLevelObject;

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (keys.length === 0) {
                return {object: lastValue, key: key};
            }

            if (!lastValue[key]) lastValue[key] = {};
            if (typeof lastValue[key] !== 'object') lastValue[key] = {};

            lastValue = lastValue[key];
        }
    }

    static guid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    static uuid() {
        return Functions.guid();
    }

    static idGeneratorFactory() {
        return () => {
            let id = BigInt ? BigInt(0) : 0
            return () => ++id
        }
    }

    static isExists(varForCheck: any): boolean {
        return typeof varForCheck !== 'undefined'
    }

    static isObject(obj: any): boolean {
        return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
    }

    static isObjectEmpty(obj: object) {
        return Object.entries(obj).length === 0 && obj.constructor === Object
    }

    static isObjectsHasFullIntersect(searchObject: object, object: any) {

        for (let key in searchObject) {
            if (!searchObject.hasOwnProperty(key)) continue;

            if (!object[key]) return false;
        }

        return true;
    }

    static getObjectPropertyCount(obj: object) {
        return Object.entries(obj).length;
    }

    static iterateArray(arrayToIterate: [], callback: any) {
        for (let i = 0; i < arrayToIterate.length; i++) callback(i, arrayToIterate[i])
    }

    static iterateArrayReverse = (arrayToIterate: [], callback: any) => {
        for (let i = arrayToIterate.length - 1; i >= 0; i--) callback(i, arrayToIterate[i]);
    }

    static iterate(objectToIterate: {[key: string]: any}, callback: any) {

        if (Array.isArray(objectToIterate)) {

            for (let i = 0; i < objectToIterate.length; i++) {
                callback(i, objectToIterate[i]);
            }

        } else {
            for (let i in objectToIterate) {
                callback(i, objectToIterate[i]);
            }
        }
    }

    /*static iterateAsync = async (object: any, callback: any) => {
        object[Symbol.asyncIterator] = async function* () {
            for (let key in this) yield {key: key, value: this[key]}
        }
        for await (let item of object) {
            await callback(item.key, item.value)
        }
    }*/

    static isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static unixTs() {
        return Math.floor(Date.now() / 1000)
    }
}

//export const getRandBytesInHex = (length) => randomBytes(length).toString('hex');

/*export default async () => {

    let f = {}

    f.isPrimitive = (arg) => {
        const type = typeof arg;
        return arg === null || (type !== 'object' && type !== 'function');
    }
    f.log = (msg, color) => {
        let preColorStr = '';
        let postColorStr = '';

        if (color === 'red') {
            preColorStr = '\x1b[31m';
            postColorStr = '\x1b[0m';
        }

        if (color) {
            console.log(`${preColorStr}${msg}${postColorStr}`);
        } else {
            console.log(msg);
        }
    }
    f.getCaretPosition = () => {
        return document.getSelection().anchorOffset;
    }
    f.setCaretPosition = (domElement, pos) => {
        let range = document.createRange();
        let sel = window.getSelection();

        range.setStart(domElement.childNodes[0], pos);
        range.collapse(true);

        sel.removeAllRanges();
        sel.addRange(range);
    }
    f.randInt = (min, max) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    f.objectGetFirstKey = obj => Object.keys(obj)[0]
    f.objectLength = obj => Object.keys(obj).length
    f.parseCliArgs = (args) => {

        let result = {}

        f.iterate(args, (index, arg) => {
            if (index < 2) return

            let [k, v] = arg.split('=')
            k = k.slice(2);

            result[k.trim()] = v.trim()
        })

        return result
    }
    f.ttl = {
        minute: 60,
        hour: 3600,
    }
    f.unixTs = () => Math.floor(Date.now() / 1000)
    f.searchFullIntersection = (searchObject, searchInObject) => {

        let result = true

        f.iterate(searchObject, (key, value) => {
            if (!searchInObject[key]) {
                result = false
            }
        })

        return result
    }

    return f
}*/

