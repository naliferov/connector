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
exports.__esModule = true;
var CmdHandler_1 = require("./CmdHandler");
//import { v4 as uuidv4 } from 'uuid';
var Config_1 = require("./config/Config");
var Logger_1 = require("../../lib/ts/Logger");
var AppBackend = /** @class */ (function () {
    function AppBackend() {
        this.cliArgs = {};
        this.config = new Config_1["default"]();
        this.config.setAppDir(process.cwd());
    }
    AppBackend.prototype.parseAndSetCliArgs = function (cliArgs) {
        for (var i = 0; i < cliArgs.length; i++) {
            if (i < 2)
                continue;
            var arg = cliArgs[i];
            var _a = arg.split('='), k = _a[0], v = _a[1];
            if (!v) {
                this.cliArgs[i - 2] = arg; //start write args from main 0
                continue;
            }
            k = k.slice(2); //remove -- characters
            this.cliArgs[k.trim()] = v.trim();
        }
        return this;
    };
    AppBackend.prototype.setDirs = function () {
        /*u.appJsDir = u.appDir + '/src/js';
        u.frameworkDir = '.';
        u.frameworkJsDir = u.frameworkDir + '/js';

        u.cacheDir = u.appDir + '/var/cache/telegram';
        u.processDir = u.appDir + '/process';
        u.publicDir = u.appDir + '/data/public';*/
    };
    AppBackend.prototype.loadThirdPartyLibraries = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AppBackend.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //this.setDirs(this.cliArgs)
                    return [4 /*yield*/, this.loadThirdPartyLibraries()
                        //u.i = u.f.iterate
                        //u.ia = u.f.iterateAsync
                        //u.fs = await u.im('fs-extra')
                        //let util = await u.im('util')
                        /*u.fsAccess = util.promisify(u.fs.access)
                        u.fsReadFile = util.promisify(u.fs.readFile)
                        u.fsWriteFile = util.promisify(u.fs.writeFile)
                        u.fsMkdir = util.promisify(u.fs.mkdir)
                        u.fsReadDir = util.promisify(u.fs.readdir)
                        u.fsCopy = u.fs.copy
                        u.fsMove = u.fs.move*/
                        /*u.fsCreateIfNotExists = async (dir, file, defaultFileContent) => {
                            try { await u.fsAccess(dir) }
                            catch (e) { await u.fsMkdir(dir, {recursive: true}) }
                
                            if (file) {
                                let path = dir + '/' + file
                
                                try { await u.fsAccess(path) }
                                catch (e) { await u.fsWriteFile(path, defaultFileContent) }
                            }
                        }*/
                        /*u.u = new (await u.im('./src/public/js/unitFactory.js'))
                        u.u.setGlobal(u)
                        u.u.setUuid(u.uuid.v4)
                        u.u.setUnitClass((await u.im('./src/public/js/unit.js')))
                        u.u.setUnitViewClass((await u.im('./src/public/js/unitView.js')))
                
                        u.wsConnections = new (await u.im('./src/public/js/io/wsConnections.js'))
                        u.wsConnections.setGlobal(u)
                
                        u.trigger = new (await u.im('./src/public/js/trigger.js'))
                        u.trigger.setGlobal(u)
                
                        u.rc = async (msg) => {
                            if (!msg._sys) msg._sys = {}
                            return await u.trigger.c(msg)
                        }*/
                    ];
                    case 1:
                        //this.setDirs(this.cliArgs)
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppBackend.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setDirs();
                this.parseAndSetCliArgs(process.argv);
                (new CmdHandler_1["default"](this.cliArgs, new Logger_1["default"](), this.config));
                return [2 /*return*/];
            });
        });
    };
    return AppBackend;
}());
exports["default"] = AppBackend;
