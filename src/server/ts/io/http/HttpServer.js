"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var MainLayout_1 = require("../../../lib/ts/ui/templates/MainLayout");
var AppFrontend_1 = require("../../../lib/ts/ui/AppFrontend");
var DbItemFinder_1 = require("./storage/repository/DbItemFinder");
var bodyParser = require("body-parser");
var DbItemSaver_1 = require("./storage/repository/DbItemSaver");
var preact_render_to_string_1 = require("preact-render-to-string");
var preact_1 = require("preact");
var HttpServer = /** @class */ (function () {
    function HttpServer(createServer, express, fs, config) {
        var _this = this;
        var dbItemFinder = new DbItemFinder_1["default"](fs);
        var dbItemSaver = new DbItemSaver_1["default"](fs);
        var app = express();
        app.use(express.static('./src/browser/public'));
        var pages = { '/': 1, '/programming': 2, '/ideas': 3 };
        app.use(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var dbItemNumber, dbItem, postData, props, app_1, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!pages[req.path]) return [3 /*break*/, 2];
                        dbItemNumber = pages[req.path];
                        return [4 /*yield*/, dbItemFinder.find(dbItemNumber)];
                    case 1:
                        dbItem = _a.sent();
                        postData = __assign({ id: dbItemNumber }, dbItem);
                        props = { route: req.path, postData: postData };
                        app_1 = preact_render_to_string_1.render(preact_1.h(AppFrontend_1["default"], props));
                        html = (new MainLayout_1["default"]()).build(app_1, JSON.stringify(props));
                        res.send(html);
                        _a.label = 2;
                    case 2:
                        next();
                        return [2 /*return*/];
                }
            });
        }); });
        app.post('/save', bodyParser.json({}), function (req, res) {
            var data = req.body;
            dbItemSaver.save(data.id, data);
            res.send('ok');
        });
        this.server = createServer({}, app);
        /*if (this.upgradeHandler) {
            this.server.on('upgrade', (req, clientSocket, head) => {
                this.upgradeHandler(req, clientSocket, head)
            })
        }*/
        /*if (this.requestHandler) app.use((req, res, next) => {
            this.requestHandler({req, res, next})
        })*/
    }
    HttpServer.prototype.getServer = function () {
        return this.server;
    };
    return HttpServer;
}());
exports["default"] = HttpServer;
