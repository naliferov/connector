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

/***/ "./src/browser/ts/AppFrontend.ts":
/*!***************************************!*\
  !*** ./src/browser/ts/AppFrontend.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Unit */ \"./src/browser/ts/core/Unit.ts\");\nvar __async = (__this, __arguments, generator) => {\n  return new Promise((resolve, reject) => {\n    var fulfilled = (value) => {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var rejected = (value) => {\n      try {\n        step(generator.throw(value));\n      } catch (e) {\n        reject(e);\n      }\n    };\n    var step = (result) => {\n      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);\n    };\n    step((generator = generator.apply(__this, __arguments)).next());\n  });\n};\n\nclass AppFrontend {\n  run() {\n    return __async(this, null, function* () {\n      const app = new _core_Unit__WEBPACK_IMPORTED_MODULE_0__.default({});\n      app.setDOM(document.getElementById(\"app\"));\n      const upload = new _core_Unit__WEBPACK_IMPORTED_MODULE_0__.default({tagName: \"button\", text: \"send\"});\n      app.insert(upload);\n    });\n  }\n}\nconst frontend = new AppFrontend();\nfrontend.run();\n\n\n//# sourceURL=webpack://util/./src/browser/ts/AppFrontend.ts?");

/***/ }),

/***/ "./src/browser/ts/core/Unit.ts":
/*!*************************************!*\
  !*** ./src/browser/ts/core/Unit.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Unit)\n/* harmony export */ });\nclass Unit {\n  constructor(unitData) {\n    this.dom = null;\n    let self = this;\n    this.data = unitData;\n    self[\".\"] = (...className) => {\n      for (let i = 0; i < className.length; i++) {\n        this.dom.classList.add(className[i]);\n      }\n    };\n    self[\"<\"] = (tagName) => {\n      return self;\n    };\n    self[\">\"] = (txt) => {\n      return self;\n    };\n  }\n  on(eventName, callback) {\n    this.dom.addEventListener(eventName, callback);\n  }\n  getId() {\n    return this.data.id;\n  }\n  getData() {\n    return this.data;\n  }\n  setDOM(dom) {\n    this.dom = dom;\n  }\n  getDOM() {\n    if (this.dom) {\n      return this.dom;\n    }\n    this.dom = document.createElement(this.data.tagName || \"div\");\n    if (this.data.style) {\n      for (let key in this.data.style) {\n        if (key === \"height\" && this.data.text) {\n          delete this.data.style[key];\n          continue;\n        }\n        this.dom.style[key] = this.data.style[key];\n      }\n    }\n    if (this.data.id) {\n      this.dom.id = this.data.id;\n    }\n    if (this.data.class) {\n      this.dom.className = this.data.class.join(\" \");\n    }\n    this.addClass(\"unit\");\n    this.addClass(\"noselect\");\n    if (this.data.html) {\n      this.dom.innerHTML = this.data.html;\n    } else if (this.data.text) {\n      this.dom.innerText = this.data.text;\n    }\n    if (this.data.value) {\n      this.dom.value = this.data.value;\n    }\n    return this.dom;\n  }\n  setText(txt) {\n    this.getDOM().innerText = txt;\n  }\n  setHtml(html) {\n    this.data.html = html;\n    this.getDOM().innerHTML = html;\n  }\n  getHtml() {\n    return this.getDOM().innerHTML;\n  }\n  insert(unit) {\n    this.getDOM().append(unit.getDOM());\n  }\n  addShift() {\n    let dom = this.dom;\n    let x = dom.style.left ? parseInt(dom.style.left.replace(\"px\", \"\"), 10) : 0;\n    let newX = x + 100 + \"px\";\n    this.data.style.left = newX;\n    dom.style.left = newX;\n  }\n  setCoords(x = 0, y = 0) {\n    if (x) {\n      this.data.style.left = x + \"px\";\n      this.dom.style.left = x + \"px\";\n    }\n    if (y) {\n      this.data.style.top = y + \"px\";\n      this.dom.style.top = y + \"px\";\n    }\n  }\n  getSizes() {\n    return this.dom.getBoundingClientRect();\n  }\n  getSizesAbsolute() {\n    let sizes = this.dom.getBoundingClientRect();\n    let scrollX = window.scrollX;\n    let scrollY = window.scrollY;\n    return {\n      bottom: sizes.bottom + scrollY,\n      height: sizes.height,\n      left: sizes.left + scrollX,\n      right: sizes.right + scrollX,\n      top: sizes.top + scrollY,\n      width: sizes.width,\n      x: sizes.x + scrollX,\n      y: sizes.y + scrollY\n    };\n  }\n  select() {\n    this.dom.style.border = \"2px solid black\";\n    this.dom.style.padding = \"4px\";\n  }\n  unselect() {\n    this.dom.style.border = \"1px solid black\";\n    this.dom.style.padding = \"5px\";\n  }\n  addClass(className) {\n    this.dom.classList.add(className);\n  }\n  removeClass(className) {\n    this.dom.classList.remove(className);\n  }\n  show() {\n    this.getDOM().classList.remove(\"hidden\");\n  }\n  hide() {\n    this.getDOM().classList.add(\"hidden\");\n  }\n  toggleEdit() {\n    if (this.dom.contentEditable === \"true\") {\n      this.dom.contentEditable = \"false\";\n      this.data.text = this.dom.innerText;\n      return false;\n    } else {\n      this.dom.contentEditable = \"true\";\n      this.dom.focus();\n      return true;\n    }\n  }\n  observeStart() {\n    this.observer = new MutationObserver((mutationsList, observer) => {\n      for (const mutation of mutationsList) {\n        if (mutation.attributeName !== \"style\") {\n          continue;\n        }\n        const width = this.getDOM().style.width;\n        const height = this.getDOM().style.height;\n        if (width)\n          this.data.style.width = width;\n        if (height)\n          this.data.style.height = height;\n      }\n    });\n    this.observer.observe(this.getDOM(), {attributes: true});\n  }\n  observeStop() {\n    if (this.observer) {\n      this.observer.disconnect();\n    }\n  }\n}\n\n\n//# sourceURL=webpack://util/./src/browser/ts/core/Unit.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/browser/ts/AppFrontend.ts");
/******/ 	
/******/ })()
;