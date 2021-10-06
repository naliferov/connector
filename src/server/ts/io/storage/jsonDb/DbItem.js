"use strict";
exports.__esModule = true;
var DbItem = /** @class */ (function () {
    function DbItem(title, txt) {
        this.title = '';
        this.txt = '';
        this.title = title;
        this.txt = txt;
    }
    DbItem.prototype.getTitle = function () {
        return this.title;
    };
    DbItem.prototype.getText = function () {
        return this.txt;
    };
    return DbItem;
}());
exports["default"] = DbItem;
