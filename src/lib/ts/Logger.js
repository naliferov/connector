"use strict";
exports.__esModule = true;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (msg, object) {
        if (object === void 0) { object = {}; }
        console.log(msg, object);
    };
    return Logger;
}());
exports["default"] = Logger;
