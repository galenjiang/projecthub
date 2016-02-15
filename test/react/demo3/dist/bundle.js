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
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _commentpartner = __webpack_require__(/*! ./commentpartner */ 1);
	
	var _$ = __webpack_require__(/*! $ */ 3);
	
	var _$2 = _interopRequireDefault(_$);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CommentBox = React.createClass({
	  displayName: "CommentBox",
	
	  getInitialState: function getInitialState() {
	    return { data: [] };
	  },
	  componentDidMount: function componentDidMount() {
	    _$2.default.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function (data) {
	        console.log(data);
	        this.setState({ data: data });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "commentBox" },
	      React.createElement(
	        "h1",
	        null,
	        "Comments"
	      ),
	      React.createElement(_commentpartner.CommentList, { data: this.state.data }),
	      React.createElement(_commentpartner.CommentForm, null)
	    );
	  }
	});
	ReactDOM.render(React.createElement(CommentBox, { url: "data.json" }), document.getElementById("example"));

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./src/commentpartner.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CommentForm = exports.CommentList = undefined;
	
	var _marked = __webpack_require__(/*! marked */ 2);
	
	var _marked2 = _interopRequireDefault(_marked);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CommentList = React.createClass({
	  displayName: "CommentList",
	
	  render: function render() {
	
	    var commentNodes = this.props.data.map(function (comment) {
	      return React.createElement(
	        Comment,
	        { author: comment.author },
	        comment.text
	      );
	    });
	    return React.createElement(
	      "div",
	      { className: "commentList" },
	      commentNodes
	    );
	  }
	});
	var CommentForm = React.createClass({
	  displayName: "CommentForm",
	
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "commentForm" },
	      "Hello, world! I am a CommentForm."
	    );
	  }
	});
	var Comment = React.createClass({
	  displayName: "Comment",
	
	  rawMarkup: function rawMarkup() {
	    var rawMarkup = (0, _marked2.default)(this.props.children.toString(), { sanitize: true });
	    return { __html: rawMarkup };
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "comment" },
	      React.createElement(
	        "h2",
	        { className: "commentAuthor" },
	        this.props.author
	      ),
	      React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
	    );
	  }
	});
	
	exports.CommentList = CommentList;
	exports.CommentForm = CommentForm;

/***/ },
/* 2 */
/*!*************************!*\
  !*** external "marked" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = marked;

/***/ },
/* 3 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map