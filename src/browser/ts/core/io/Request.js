"use strict";
exports.__esModule = true;
var Request = /** @class */ (function () {
    function Request() {
    }
    Request.prototype.post = function (url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
            xhr.responseText;
        };
        xhr.send(JSON.stringify(data));
    };
    return Request;
}());
exports["default"] = Request;
