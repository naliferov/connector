"use strict";
exports.__esModule = true;
var MainLayout = /** @class */ (function () {
    function MainLayout() {
    }
    MainLayout.prototype.build = function (app, state) {
        return ("\n<!DOCTYPE html>\n<html lang=\"ru\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <meta name=\"description\" content=\"\u0421\u0430\u0439\u0442 \u041D\u0438\u043A\u043E\u043B\u0430\u044F \u0410\u043B\u0438\u0444\u0435\u0440\u043E\u0432\u0430. \u0417\u0430\u043C\u0435\u0442\u043A\u0438 \u043E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438 \u0438 \u0444\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u0438.\">\n    \n    <title>\u041D\u0438\u043A\u043E\u043B\u0430\u0439 \u0410\u043B\u0438\u0444\u0435\u0440\u043E\u0432</title>\n    \n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"/build/min.css\">\n    <link rel=\"icon\" type=\"image/png\" href=\"/image/favicon.png\">\n</head>\n<body>\n    <app id=\"app\">" + app + "</app>\n    <script>window.__STATE__ = " + state + "</script>\n    <script async src=\"/build/min.js\"></script>\n</body>\n</html>\n").trim();
    };
    return MainLayout;
}());
exports["default"] = MainLayout;
