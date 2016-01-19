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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./entry.js ***!
  \******************/
/***/ function(module, exports) {

	"use strict";
	
	var BtnCom = React.createClass({
	  displayName: "BtnCom",
	
	  clickme: function clickme(event) {
	    var tip = React.findDOMNode(this.refs.tip);
	    if (tip.style.display === "none") {
	      tip.style.display = "inline";
	    } else {
	      tip.style.display = "none";
	    }
	    event.stopPropagation();
	    event.preventDefault();
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "button",
	        { onClick: this.clickme },
	        "点击"
	      ),
	      React.createElement(
	        "span",
	        { ref: "tip" },
	        "显示|隐藏"
	      )
	    );
	  }
	});
	
	var InputCom = React.createClass({
	  displayName: "InputCom",
	
	  changeme: function changeme(event) {
	    this.setState({
	      inputContent: event.target.value
	    });
	    event.stopPropagation();
	    event.preventDefault();
	  },
	  getInitialState: function getInitialState() {
	    return {
	      inputContent: ''
	    };
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("input", { type: "text", onChange: this.changeme }),
	      React.createElement(
	        "span",
	        null,
	        this.state.inputContent
	      )
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(
	  "div",
	  null,
	  React.createElement(BtnCom, { name: "galen" }),
	  React.createElement("br", null),
	  React.createElement("br", null),
	  React.createElement("br", null),
	  React.createElement("br", null),
	  React.createElement("br", null),
	  React.createElement(InputCom, null)
	), document.getElementById("example"));

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map