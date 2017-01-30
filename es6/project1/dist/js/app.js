/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	$(function () {
	  var page = {
	
	    init: function init() {
	      var dom = document.querySelector("#div");
	      // dom.onclick = function(){
	      //   alert(2)
	      // }
	
	      alert();
	      console.log(dom.getAttribute("onclick"));
	    },
	    methods1: function methods1() {
	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _ref$a = _ref.a;
	      var a = _ref$a === undefined ? 0 : _ref$a;
	      var _ref$b = _ref.b;
	      var b = _ref$b === undefined ? 0 : _ref$b;
	
	      return a + b;
	    },
	    methods2: function methods2() {
	      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _ref2$a = _ref2.a;
	      var a = _ref2$a === undefined ? 0 : _ref2$a;
	      var _ref2$b = _ref2.b;
	      var b = _ref2$b === undefined ? 0 : _ref2$b;
	      return a + b;
	    }
	  };
	  page.init();
	});

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map