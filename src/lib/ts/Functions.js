"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var Functions = /** @class */ (function () {
    function Functions() {
    }
    Functions.asyncWaterfall = function (array) {
        //let execute = () => array.shift()(execute);
        //execute();
    };
    Functions.callWithDelay = function (fn, delay) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fn()];
                        case 1:
                            _a.sent();
                            resolve(null);
                            return [2 /*return*/];
                    }
                });
            }); }, delay);
        });
    };
    Functions.cloneObject = function (object) {
        if (Array.isArray(object)) {
            var array = [];
            for (var i = 0; i < object.length; i++) {
                var value = object[i];
                var valueType = typeof value;
                if (valueType === 'function')
                    continue;
                if (valueType === 'object' && valueType !== null) {
                    array.push(Functions.cloneObject(value));
                }
                else {
                    array.push(value);
                }
            }
            return array;
        }
        var clone = {};
        for (var key in object) {
            if (!object.hasOwnProperty(key))
                continue;
            var value = object[key];
            var valueType = typeof value;
            if (valueType === 'function')
                continue;
            if (valueType === 'object' && valueType !== null) {
                clone[key] = Functions.cloneObject(value);
            }
            else {
                clone[key] = value;
            }
        }
        return clone;
    };
    Functions.getDeepestObjectAndKey = function (topLevelObject, path) {
        var keys = path.split('.');
        var lastValue = topLevelObject;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (keys.length === 0) {
                return { object: lastValue, key: key };
            }
            if (!lastValue[key])
                lastValue[key] = {};
            if (typeof lastValue[key] !== 'object')
                lastValue[key] = {};
            lastValue = lastValue[key];
        }
    };
    Functions.guid = function () {
        var s4 = function () { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    Functions.uuid = function () {
        return Functions.guid();
    };
    Functions.idGeneratorFactory = function () {
        return function () {
            var id = BigInt ? BigInt(0) : 0;
            return function () { return ++id; };
        };
    };
    Functions.isExists = function (varForCheck) {
        return typeof varForCheck !== 'undefined';
    };
    Functions.isObject = function (obj) {
        return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
    };
    Functions.isObjectEmpty = function (obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    };
    Functions.isObjectsHasFullIntersect = function (searchObject, object) {
        for (var key in searchObject) {
            if (!searchObject.hasOwnProperty(key))
                continue;
            if (!object[key])
                return false;
        }
        return true;
    };
    Functions.getObjectPropertyCount = function (obj) {
        return Object.entries(obj).length;
    };
    Functions.iterateArray = function (arrayToIterate, callback) {
        for (var i = 0; i < arrayToIterate.length; i++)
            callback(i, arrayToIterate[i]);
    };
    Functions.iterate = function (objectToIterate, callback) {
        if (Array.isArray(objectToIterate)) {
            for (var i = 0; i < objectToIterate.length; i++) {
                callback(i, objectToIterate[i]);
            }
        }
        else {
            for (var i in objectToIterate) {
                callback(i, objectToIterate[i]);
            }
        }
    };
    Functions.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    Functions.iterateArrayReverse = function (arrayToIterate, callback) {
        for (var i = arrayToIterate.length - 1; i >= 0; i--)
            callback(i, arrayToIterate[i]);
    };
    Functions.iterateAsync = function (object, callback) { var object_1, object_1_1; return __awaiter(void 0, void 0, void 0, function () {
        var item, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    object[Symbol.asyncIterator] = function () {
                        return __asyncGenerator(this, arguments, function () {
                            var _a, _b, _i, key;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = [];
                                        for (_b in this)
                                            _a.push(_b);
                                        _i = 0;
                                        _c.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                                        key = _a[_i];
                                        return [4 /*yield*/, __await({ key: key, value: this[key] })];
                                    case 2: return [4 /*yield*/, _c.sent()];
                                    case 3:
                                        _c.sent();
                                        _c.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        });
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 13]);
                    object_1 = __asyncValues(object);
                    _b.label = 2;
                case 2: return [4 /*yield*/, object_1.next()];
                case 3:
                    if (!(object_1_1 = _b.sent(), !object_1_1.done)) return [3 /*break*/, 6];
                    item = object_1_1.value;
                    return [4 /*yield*/, callback(item.key, item.value)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(object_1_1 && !object_1_1.done && (_a = object_1["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(object_1)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    return Functions;
}());
exports["default"] = Functions;
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
