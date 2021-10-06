/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/ts/Logger.ts":
/*!******************************!*\
  !*** ./src/lib/ts/Logger.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Logger)\n/* harmony export */ });\nclass Logger {\n  log(msg, object) {\n    if (object) {\n      console.log(msg, object);\n    } else {\n      console.log(msg);\n    }\n  }\n  info(msg, object = null) {\n    this.log(msg, object);\n  }\n  warning(msg, object = null) {\n    this.log(msg, object);\n  }\n  error(msg, object = null) {\n    this.log(msg, object);\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/lib/ts/Logger.ts?");

/***/ }),

/***/ "./src/server/ts/AppBackend.ts":
/*!*************************************!*\
  !*** ./src/server/ts/AppBackend.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AppBackend)\n/* harmony export */ });\n/* harmony import */ var _exec_cmd_CmdHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exec/cmd/CmdHandler */ \"./src/server/ts/exec/cmd/CmdHandler.ts\");\n/* harmony import */ var _lib_ts_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/ts/Logger */ \"./src/lib/ts/Logger.ts\");\n/* harmony import */ var _config_env_Production__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/env/Production */ \"./src/server/ts/config/env/Production.ts\");\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\n\n\nclass AppBackend {\n  constructor() {\n    this.cliArgs = {};\n  }\n  parseAndSetCliArgs(cliArgs) {\n    for (let i = 0; i < cliArgs.length; i++) {\n      if (i < 2)\n        continue;\n      let arg = cliArgs[i];\n      let [k, v] = arg.split(\"=\");\n      if (!v) {\n        this.cliArgs[i - 2] = arg;\n        continue;\n      }\n      k = k.slice(2);\n      this.cliArgs[k.trim()] = v.trim();\n    }\n    return this;\n  }\n  setDirs() {\n  }\n  loadThirdPartyLibraries() {\n    return __async(this, null, function* () {\n    });\n  }\n  init() {\n    return __async(this, null, function* () {\n      yield this.loadThirdPartyLibraries();\n    });\n  }\n  run() {\n    return __async(this, null, function* () {\n      this.parseAndSetCliArgs(process.argv);\n      const env = this.cliArgs[\"env\"];\n      this.config = new _config_env_Production__WEBPACK_IMPORTED_MODULE_2__.default();\n      this.config.setAppDir(process.cwd());\n      new _exec_cmd_CmdHandler__WEBPACK_IMPORTED_MODULE_0__.default(this.cliArgs, this.config, new _lib_ts_Logger__WEBPACK_IMPORTED_MODULE_1__.default());\n    });\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/AppBackend.ts?");

/***/ }),

/***/ "./src/server/ts/config/Config.ts":
/*!****************************************!*\
  !*** ./src/server/ts/config/Config.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Config)\n/* harmony export */ });\nclass Config {\n  setAppDir(appDir) {\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/config/Config.ts?");

/***/ }),

/***/ "./src/server/ts/config/env/Production.ts":
/*!************************************************!*\
  !*** ./src/server/ts/config/env/Production.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Production)\n/* harmony export */ });\n/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config */ \"./src/server/ts/config/Config.ts\");\n\nclass Production extends _Config__WEBPACK_IMPORTED_MODULE_0__.default {\n  constructor() {\n    super();\n    this.appDir = \"\";\n  }\n  setAppDir(appDir) {\n    this.appDir = appDir;\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/config/env/Production.ts?");

/***/ }),

/***/ "./src/server/ts/deploy/cmd/UpdateAppVersion.ts":
/*!******************************************************!*\
  !*** ./src/server/ts/deploy/cmd/UpdateAppVersion.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UpdateAppVersion)\n/* harmony export */ });\n/* harmony import */ var _exec_process_WebServerProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../exec/process/WebServerProcess */ \"./src/server/ts/exec/process/WebServerProcess.ts\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../io/exec/Exec */ \"./src/server/ts/io/exec/Exec.ts\");\n/* harmony import */ var _io_FS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../io/FS */ \"./src/server/ts/io/FS.ts\");\n/* harmony import */ var _lib_ts_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/ts/Logger */ \"./src/lib/ts/Logger.ts\");\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\n\n\n\n\nclass UpdateAppVersion {\n  constructor() {\n    this.fs = new _io_FS__WEBPACK_IMPORTED_MODULE_3__.default();\n    this.logger = new _lib_ts_Logger__WEBPACK_IMPORTED_MODULE_4__.default();\n  }\n  runServer(cwd, execFilePath, name, port) {\n    return __async(this, null, function* () {\n      const exec = new _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__.default(\"docker\", [\n        \"run\",\n        \"-d\",\n        \"--rm\",\n        \"--name\",\n        name,\n        \"-v\",\n        `${cwd}:/app`,\n        \"-w\",\n        \"/app\",\n        \"-p\",\n        `${port}:8080`,\n        \"node:16-alpine\",\n        \"x.js\",\n        \"runApp\"\n      ], cwd, this.logger);\n      yield exec.run();\n    });\n  }\n  stopServer(processName) {\n    return __async(this, null, function* () {\n      yield new _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__.default(\"docker\", [\"stop\", \"-t\", \"2\", processName], \"\", this.logger).run();\n    });\n  }\n  showDockerContainersNames() {\n    return __async(this, null, function* () {\n      const exec = new _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__.default(\"docker\", [\"ps\", \"--format\", \"{{.Names}}\"], \"\", this.logger);\n      const {code, stdoutBuffer, stderrBuffer} = yield exec.run();\n      const containerName = stdoutBuffer[0];\n      if (!containerName) {\n        return [];\n      }\n      const containerNames = stdoutBuffer[0].split(\"\\n\");\n      if (!containerNames.length) {\n        return [];\n      }\n      return containerNames;\n    });\n  }\n  gitPull(path2) {\n    return __async(this, null, function* () {\n      yield new _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__.default(\"git\", [\"-C\", path2, \"pull\", \"--no-rebase\"], \"\", this.logger).run();\n    });\n  }\n  npmInstall(path2) {\n    return __async(this, null, function* () {\n      yield new _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__.default(\"npm\", [\"install\", \"--no-save\"], path2, this.logger).run();\n    });\n  }\n  nginxUpdateConfig(port) {\n    return __async(this, null, function* () {\n      const configPath = \"./config/nginx-prod.conf\";\n      const conf = yield this.fs.readFile(configPath);\n      const editedConf = conf.replace(/http:\\/\\/127\\.0\\.0\\.1:\\d{4}/, `http://127.0.0.1:${port}`);\n      yield this.fs.writeFile(configPath, editedConf);\n    });\n  }\n  nginxReload() {\n    return __async(this, null, function* () {\n      return yield new _io_exec_Exec__WEBPACK_IMPORTED_MODULE_2__.default(\"sudo\", [\"/usr/sbin/nginx\", \"-s\", \"reload\"], \"\", this.logger).run();\n    });\n  }\n  performUpdate(process) {\n    return __async(this, null, function* () {\n      yield this.gitPull(process.getPath());\n      yield this.npmInstall(process.getPath());\n      yield this.nginxUpdateConfig(process.getPort());\n      yield this.runServer(process.getPath(), process.getExecFilePath(), process.getName(), process.getPort());\n      yield this.nginxReload();\n    });\n  }\n  run() {\n    return __async(this, null, function* () {\n      let processA = new _exec_process_WebServerProcess__WEBPACK_IMPORTED_MODULE_0__.default(path__WEBPACK_IMPORTED_MODULE_1__.resolve(\"../dirA\"), \"processA\", \"x.js\");\n      processA.setPort(\"8082\");\n      let processB = new _exec_process_WebServerProcess__WEBPACK_IMPORTED_MODULE_0__.default(path__WEBPACK_IMPORTED_MODULE_1__.resolve(\"../dirB\"), \"processB\", \"x.js\");\n      processB.setPort(\"8083\");\n      const activeContainers = yield this.showDockerContainersNames();\n      const isActiveProcessA = yield activeContainers.includes(processA.getName());\n      const isActiveProcessB = yield activeContainers.includes(processB.getName());\n      if (!isActiveProcessA && !isActiveProcessB) {\n        yield this.performUpdate(processA);\n        return;\n      }\n      if (isActiveProcessA)\n        [processA, processB] = [processB, processA];\n      yield this.performUpdate(processA);\n      yield this.stopServer(processB.getName());\n    });\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/deploy/cmd/UpdateAppVersion.ts?");

/***/ }),

/***/ "./src/server/ts/exec/cmd/CmdHandler.ts":
/*!**********************************************!*\
  !*** ./src/server/ts/exec/cmd/CmdHandler.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CmdHandler)\n/* harmony export */ });\n/* harmony import */ var _io_http_HttpServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../io/http/HttpServer */ \"./src/server/ts/io/http/HttpServer.ts\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _io_FS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../io/FS */ \"./src/server/ts/io/FS.ts\");\n/* harmony import */ var _process_WebServerProcess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../process/WebServerProcess */ \"./src/server/ts/exec/process/WebServerProcess.ts\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _deploy_cmd_UpdateAppVersion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../deploy/cmd/UpdateAppVersion */ \"./src/server/ts/deploy/cmd/UpdateAppVersion.ts\");\n/* harmony import */ var _handler_TestHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handler/TestHandler */ \"./src/server/ts/exec/cmd/handler/TestHandler.ts\");\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\n\n\n\n\n\n\n\nclass CmdHandler {\n  constructor(cliArgs, config, logger) {\n    this.config = config;\n    this.fs = new _io_FS__WEBPACK_IMPORTED_MODULE_3__.default();\n    this.logger = logger;\n    const cmd = cliArgs.cmd || cliArgs[0];\n    if (!cmd) {\n      logger.info(`cmd: [${cmd}]`);\n      return;\n    }\n    logger.info(`try execute cmd: [${cmd}]`);\n    const self = this;\n    const map = {\n      containers: () => __async(this, null, function* () {\n        console.log(yield new _deploy_cmd_UpdateAppVersion__WEBPACK_IMPORTED_MODULE_6__.default().showDockerContainersNames());\n      }),\n      runApp: () => {\n        var _a;\n        return self.runApp((_a = cliArgs.port) != null ? _a : \"8080\");\n      },\n      runDocker: () => {\n        let processA = new _process_WebServerProcess__WEBPACK_IMPORTED_MODULE_4__.default(path__WEBPACK_IMPORTED_MODULE_5__.resolve(\"../dirA\"), \"processB\", \"x.js\");\n        processA.setPort(\"8083\");\n        new _deploy_cmd_UpdateAppVersion__WEBPACK_IMPORTED_MODULE_6__.default().runServer(processA.getPath(), processA.getExecFilePath(), processA.getName(), processA.getPort());\n      },\n      test: () => new _handler_TestHandler__WEBPACK_IMPORTED_MODULE_7__.default().exec()\n    };\n    if (map[cmd])\n      map[cmd](cmd);\n  }\n  runApp(port) {\n    return __async(this, null, function* () {\n      const httpServer = new _io_http_HttpServer__WEBPACK_IMPORTED_MODULE_0__.default(http__WEBPACK_IMPORTED_MODULE_2__.createServer, express__WEBPACK_IMPORTED_MODULE_1__, this.fs);\n      httpServer.getServer().listen(`${port}`);\n      console.log(`Webserver start on port: [${port}]`);\n    });\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/exec/cmd/CmdHandler.ts?");

/***/ }),

/***/ "./src/server/ts/exec/cmd/handler/TestHandler.ts":
/*!*******************************************************!*\
  !*** ./src/server/ts/exec/cmd/handler/TestHandler.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TestHandler)\n/* harmony export */ });\nclass TestHandler {\n  exec() {\n    console.log(\"Execution of Test command finished.\");\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/exec/cmd/handler/TestHandler.ts?");

/***/ }),

/***/ "./src/server/ts/exec/process/Process.ts":
/*!***********************************************!*\
  !*** ./src/server/ts/exec/process/Process.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Process)\n/* harmony export */ });\nclass Process {\n  constructor(path, processName, execFileName) {\n    this.path = path;\n    this.processName = processName;\n    this.execFileName = execFileName;\n  }\n  getPath() {\n    return this.path;\n  }\n  getName() {\n    return this.processName;\n  }\n  getExecFileName() {\n    return this.execFileName;\n  }\n  getExecFilePath() {\n    return `${this.getPath()}/${this.getExecFileName()}`;\n  }\n  getMarkerFilePath() {\n    return `${this.getPath()}/m_a_r_k_e_r`;\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/exec/process/Process.ts?");

/***/ }),

/***/ "./src/server/ts/exec/process/WebServerProcess.ts":
/*!********************************************************!*\
  !*** ./src/server/ts/exec/process/WebServerProcess.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WebServerProcess)\n/* harmony export */ });\n/* harmony import */ var _Process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Process */ \"./src/server/ts/exec/process/Process.ts\");\n\nclass WebServerProcess extends _Process__WEBPACK_IMPORTED_MODULE_0__.default {\n  setPort(port) {\n    this.port = port;\n  }\n  getPort() {\n    return this.port;\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/exec/process/WebServerProcess.ts?");

/***/ }),

/***/ "./src/server/ts/io/FS.ts":
/*!********************************!*\
  !*** ./src/server/ts/io/FS.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FS)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ \"util\");\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\n\nclass FS {\n  constructor() {\n    this.readFileNative = util__WEBPACK_IMPORTED_MODULE_1__.promisify(fs__WEBPACK_IMPORTED_MODULE_0__.readFile);\n    this.writeFileNative = util__WEBPACK_IMPORTED_MODULE_1__.promisify(fs__WEBPACK_IMPORTED_MODULE_0__.writeFile);\n    this.renameNative = util__WEBPACK_IMPORTED_MODULE_1__.promisify(fs__WEBPACK_IMPORTED_MODULE_0__.rename);\n  }\n  readFile(path) {\n    return __async(this, null, function* () {\n      return yield this.readFileNative(path, \"utf8\");\n    });\n  }\n  writeFile(path, data) {\n    return __async(this, null, function* () {\n      return yield this.writeFileNative(path, data);\n    });\n  }\n  move(oldPath, newPath) {\n    return __async(this, null, function* () {\n      return yield this.renameNative(oldPath, newPath);\n    });\n  }\n  exists(path) {\n    return __async(this, null, function* () {\n      return new Promise((resolve) => {\n        fs__WEBPACK_IMPORTED_MODULE_0__.access(path, fs__WEBPACK_IMPORTED_MODULE_0__.constants.F_OK, (err) => resolve(!err));\n      });\n    });\n  }\n  readDir(path) {\n    return __async(this, null, function* () {\n      return new Promise((resolve) => {\n        fs__WEBPACK_IMPORTED_MODULE_0__.readdir(path, (err, files) => resolve(files));\n      });\n    });\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/io/FS.ts?");

/***/ }),

/***/ "./src/server/ts/io/exec/Exec.ts":
/*!***************************************!*\
  !*** ./src/server/ts/io/exec/Exec.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Exec)\n/* harmony export */ });\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\nclass Exec {\n  constructor(cmd, args = [], cwd = \"\", logger) {\n    this.cmd = cmd;\n    this.args = args;\n    this.cwd = cwd;\n    this.logger = logger;\n  }\n  run() {\n    return __async(this, null, function* () {\n      let stdoutBuffer = [];\n      let stderrBuffer = [];\n      return new Promise((resolve) => {\n        const ls = (0,child_process__WEBPACK_IMPORTED_MODULE_0__.spawn)(this.cmd, this.args, {cwd: this.cwd});\n        ls.stdout.on(\"data\", (data) => {\n          stdoutBuffer.push(data.toString().trim());\n          this.logger.info(data.toString().trim());\n        });\n        ls.stderr.on(\"data\", (data) => {\n          stderrBuffer.push(data.toString().trim());\n          this.logger.error(`E: ${data.toString().trim()}`);\n        });\n        ls.on(\"close\", (code) => {\n          resolve({code, stdoutBuffer, stderrBuffer});\n        });\n      });\n    });\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/io/exec/Exec.ts?");

/***/ }),

/***/ "./src/server/ts/io/http/HttpServer.ts":
/*!*********************************************!*\
  !*** ./src/server/ts/io/http/HttpServer.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HttpServer)\n/* harmony export */ });\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_0__);\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\nclass HttpServer {\n  constructor(createServer, express, fs) {\n    this.fs = fs;\n    const stateFile = \"./storage/state2.json\";\n    const mediaDir = \"/home/any/Downloads\";\n    const artstationDir = mediaDir + \"/artstation\";\n    const htmlFile = \"./index.html\";\n    let app = express();\n    app.get(\"/\", (req, res) => __async(this, null, function* () {\n      return res.send(yield this.fs.readFile(htmlFile));\n    }));\n    app.get(\"/js\", (req, res) => __async(this, null, function* () {\n      return res.send(yield this.fs.readFile(\"./min.js\"));\n    }));\n    app.post(\"/upload\", (req, res) => __async(this, null, function* () {\n      const form = formidable__WEBPACK_IMPORTED_MODULE_0__({multiples: true});\n      form.maxFileSize = 12e3 * 1024 * 1024;\n      let count = 0;\n      form.parse(req, (err, fields, files) => __async(this, null, function* () {\n        if (err)\n          console.log(err);\n        if (Object.keys(fields).length)\n          console.log(fields);\n        if (Object.keys(files).length) {\n          for (let fileName in files) {\n            let file = files[fileName];\n            console.log(fileName);\n            let ext = \"\";\n            if (file.type.includes(\"jpeg\") || file.type.includes(\"jpg\"))\n              ext = \"jpg\";\n            if (file.type.includes(\"codecs=pcm\"))\n              ext = \"wav\";\n            if (file.type === \"video/quicktime\")\n              ext = \"mov\";\n            if (file.type === \"image/heic\")\n              ext = \"heic\";\n            yield fs.move(file.path, `${mediaDir}/${Date.now()}-${++count}.${ext}`);\n          }\n        }\n        console.log(\"income request \" + Date.now());\n        res.send({});\n      }));\n    }));\n    this.server = createServer({}, app);\n  }\n  getServer() {\n    return this.server;\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/server/ts/io/http/HttpServer.ts?");

/***/ }),

/***/ "./x.ts":
/*!**************!*\
  !*** ./x.ts ***!
  \**************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_server_ts_AppBackend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/server/ts/AppBackend */ \"./src/server/ts/AppBackend.ts\");\n\nconst app = new _src_server_ts_AppBackend__WEBPACK_IMPORTED_MODULE_0__.default();\napp.run();\n\n\n//# sourceURL=webpack://util/./x.ts?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./x.ts");
/******/ 	
/******/ })()
;