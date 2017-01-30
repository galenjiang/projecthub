/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _components = __webpack_require__(1);

	var _draggable = __webpack_require__(99);

	var _draggable2 = _interopRequireDefault(_draggable);

	var _translate = __webpack_require__(100);

	var _translate2 = _interopRequireDefault(_translate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new Vue({

	    el: '#demo',

	    components: {
	        'mt-picker': _components.Picker
	    },

	    data: {
	        title: 'hello',
	        slots: [{
	            divider: false,
	            flex: 1,
	            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
	            className: 'slot1',
	            textAlign: 'right'
	        }, {
	            divider: true,
	            content: '-',
	            className: 'slot2'
	        }, {
	            divider: false,
	            flex: 1,
	            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
	            className: 'slot3',
	            textAlign: 'left'
	        }]
	    },

	    methods: {
	        onValuesChange: function onValuesChange(picker, values) {
	            console.log(values[0], values[1]);
	        }
	    }

	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Picker = exports.loading = exports.toast = exports.MessageBox = undefined;

	var _MessageBox = __webpack_require__(2);

	var _MessageBox2 = _interopRequireDefault(_MessageBox);

	var _toast = __webpack_require__(92);

	var _toast2 = _interopRequireDefault(_toast);

	var _loading = __webpack_require__(94);

	var _loading2 = _interopRequireDefault(_loading);

	var _picker = __webpack_require__(96);

	var _picker2 = _interopRequireDefault(_picker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.MessageBox = _MessageBox2.default;
	exports.toast = _toast2.default;
	exports.loading = _loading2.default;
	exports.Picker = _picker2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(3);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _promise = __webpack_require__(71);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CONFIRM_TEXT = '确定';
	var CANCEL_TEXT = '取消';

	var defaults = {
	  title: '',
	  message: '',
	  type: '',
	  showInput: false,
	  inputValue: null,
	  inputPlaceholder: '',
	  inputPattern: null,
	  inputValidator: null,
	  inputErrorMessage: '',
	  showConfirmButton: true,
	  showCancelButton: false,
	  confirmButtonPosition: 'right',
	  confirmButtonHighlight: false,
	  cancelButtonHighlight: false,
	  confirmButtonText: CONFIRM_TEXT,
	  cancelButtonText: CANCEL_TEXT,
	  confirmButtonClass: '',
	  cancelButtonClass: ''
	};

	var msgboxVue = __webpack_require__(88);

	var merge = function merge(target) {
	  for (var i = 1, j = arguments.length; i < j; i++) {
	    var source = arguments[i];
	    for (var prop in source) {
	      if (source.hasOwnProperty(prop)) {
	        var value = source[prop];
	        if (value !== undefined) {
	          target[prop] = value;
	        }
	      }
	    }
	  }

	  return target;
	};

	var MessageBoxConstructor = Vue.extend(msgboxVue);

	var currentMsg, instance;
	var msgQueue = [];

	var initInstance = function initInstance() {
	  instance = new MessageBoxConstructor({
	    el: document.createElement('div')
	  });

	  instance.callback = function (action) {
	    if (currentMsg) {
	      var callback = currentMsg.callback;
	      if (typeof callback === 'function') {
	        if (instance.showInput) {
	          callback(instance.inputValue, action);
	        } else {
	          callback(action);
	        }
	      }
	      if (currentMsg.resolve) {
	        var $type = currentMsg.options.$type;
	        if ($type === 'confirm' || $type === 'prompt') {
	          if (action === 'confirm') {
	            if (instance.showInput) {
	              currentMsg.resolve(instance.inputValue, action);
	            } else {
	              currentMsg.resolve(action);
	            }
	          } else if (action === 'cancel' && currentMsg.reject) {
	            currentMsg.reject(action);
	          }
	        } else {
	          currentMsg.resolve(action);
	        }
	      }
	    }
	  };
	};

	var showNextMsg = function showNextMsg() {
	  if (!instance) {
	    initInstance();
	  }

	  if (!instance.visible || instance.closeTimer) {
	    if (msgQueue.length > 0) {
	      currentMsg = msgQueue.shift();

	      var options = currentMsg.options;
	      for (var prop in options) {
	        if (options.hasOwnProperty(prop)) {
	          instance[prop] = options[prop];
	        }
	      }
	      instance.$appendTo(document.body);

	      Vue.nextTick(function () {
	        instance.visible = true;
	      });
	    }
	  }
	};

	var MessageBox = function MessageBox(options, callback) {
	  if (typeof options === 'string') {
	    options = {
	      title: options
	    };
	    if (arguments[1]) {
	      options.message = arguments[1];
	    }
	    if (arguments[2]) {
	      options.type = arguments[2];
	    }
	  } else if (options.callback && !callback) {
	    callback = options.callback;
	  }

	  if (typeof _promise2.default !== 'undefined') {
	    return new _promise2.default(function (resolve, reject) {
	      msgQueue.push({
	        options: merge({}, defaults, MessageBox.defaults || {}, options),
	        callback: callback,
	        resolve: resolve,
	        reject: reject
	      });

	      showNextMsg();
	    });
	  } else {
	    msgQueue.push({
	      options: merge({}, defaults, MessageBox.defaults || {}, options),
	      callback: callback
	    });

	    showNextMsg();
	  }
	};

	MessageBox.setDefaults = function (defaults) {
	  MessageBox.defaults = defaults;
	};

	MessageBox.alert = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : (0, _typeof3.default)(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    $type: 'alert'
	  }, options));
	};

	MessageBox.confirm = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : (0, _typeof3.default)(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    $type: 'confirm',
	    showCancelButton: true
	  }, options));
	};

	MessageBox.prompt = function (message, title, options) {
	  if ((typeof title === 'undefined' ? 'undefined' : (0, _typeof3.default)(title)) === 'object') {
	    options = title;
	    title = '';
	  }
	  return MessageBox(merge({
	    title: title,
	    message: message,
	    showCancelButton: true,
	    showInput: true,
	    $type: 'prompt'
	  }, options));
	};

	MessageBox.close = function () {
	  instance.visible = false;
	  msgQueue = [];
	  currentMsg = null;
	};

	module.exports = MessageBox;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(4);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(55);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(50);
	module.exports = __webpack_require__(54).f('iterator');

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(7)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(10)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(8)
	  , defined   = __webpack_require__(9);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(11)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(27)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(28)
	  , Iterators      = __webpack_require__(29)
	  , $iterCreate    = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(46)
	  , getPrototypeOf = __webpack_require__(48)
	  , ITERATOR       = __webpack_require__(47)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(13)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(18)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , toPrimitive    = __webpack_require__(25)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function(){
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20)
	  , document = __webpack_require__(13).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 28 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(31)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(46)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(47)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(19)
	  , dPs         = __webpack_require__(32)
	  , enumBugKeys = __webpack_require__(44)
	  , IE_PROTO    = __webpack_require__(41)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(45).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(18)
	  , anObject = __webpack_require__(19)
	  , getKeys  = __webpack_require__(33);

	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(44);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(28)
	  , toIObject    = __webpack_require__(35)
	  , arrayIndexOf = __webpack_require__(38)(false)
	  , IE_PROTO     = __webpack_require__(41)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(36)
	  , defined = __webpack_require__(9);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(35)
	  , toLength  = __webpack_require__(39)
	  , toIndex   = __webpack_require__(40);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(8)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(8)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(42)('keys')
	  , uid    = __webpack_require__(43);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13).document && document.documentElement;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).f
	  , has = __webpack_require__(28)
	  , TAG = __webpack_require__(47)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(42)('wks')
	  , uid        = __webpack_require__(43)
	  , Symbol     = __webpack_require__(13).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(28)
	  , toObject    = __webpack_require__(49)
	  , IE_PROTO    = __webpack_require__(41)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(9);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	var global        = __webpack_require__(13)
	  , hide          = __webpack_require__(17)
	  , Iterators     = __webpack_require__(29)
	  , TO_STRING_TAG = __webpack_require__(47)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(52)
	  , step             = __webpack_require__(53)
	  , Iterators        = __webpack_require__(29)
	  , toIObject        = __webpack_require__(35);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(10)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(47);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(70);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(13)
	  , has            = __webpack_require__(28)
	  , DESCRIPTORS    = __webpack_require__(22)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(27)
	  , META           = __webpack_require__(58).KEY
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(46)
	  , uid            = __webpack_require__(43)
	  , wks            = __webpack_require__(47)
	  , wksExt         = __webpack_require__(54)
	  , wksDefine      = __webpack_require__(59)
	  , keyOf          = __webpack_require__(60)
	  , enumKeys       = __webpack_require__(61)
	  , isArray        = __webpack_require__(64)
	  , anObject       = __webpack_require__(19)
	  , toIObject      = __webpack_require__(35)
	  , toPrimitive    = __webpack_require__(25)
	  , createDesc     = __webpack_require__(26)
	  , _create        = __webpack_require__(31)
	  , gOPNExt        = __webpack_require__(65)
	  , $GOPD          = __webpack_require__(67)
	  , $DP            = __webpack_require__(18)
	  , $keys          = __webpack_require__(33)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(66).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(63).f  = $propertyIsEnumerable;
	  __webpack_require__(62).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(11)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(43)('meta')
	  , isObject = __webpack_require__(20)
	  , has      = __webpack_require__(28)
	  , setDesc  = __webpack_require__(18).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(13)
	  , core           = __webpack_require__(14)
	  , LIBRARY        = __webpack_require__(11)
	  , wksExt         = __webpack_require__(54)
	  , defineProperty = __webpack_require__(18).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(33)
	  , toIObject = __webpack_require__(35);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(33)
	  , gOPS    = __webpack_require__(62)
	  , pIE     = __webpack_require__(63);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 63 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(37);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(35)
	  , gOPN      = __webpack_require__(66).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(34)
	  , hiddenKeys = __webpack_require__(44).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(63)
	  , createDesc     = __webpack_require__(26)
	  , toIObject      = __webpack_require__(35)
	  , toPrimitive    = __webpack_require__(25)
	  , has            = __webpack_require__(28)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59)('asyncIterator');

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59)('observable');

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	__webpack_require__(6);
	__webpack_require__(50);
	__webpack_require__(73);
	module.exports = __webpack_require__(14).Promise;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(11)
	  , global             = __webpack_require__(13)
	  , ctx                = __webpack_require__(15)
	  , classof            = __webpack_require__(74)
	  , $export            = __webpack_require__(12)
	  , isObject           = __webpack_require__(20)
	  , anObject           = __webpack_require__(19)
	  , aFunction          = __webpack_require__(16)
	  , anInstance         = __webpack_require__(75)
	  , forOf              = __webpack_require__(76)
	  , setProto           = __webpack_require__(80).set
	  , speciesConstructor = __webpack_require__(81)
	  , task               = __webpack_require__(82).set
	  , microtask          = __webpack_require__(84)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(47)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(85)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(46)($Promise, PROMISE);
	__webpack_require__(86)(PROMISE);
	Wrapper = __webpack_require__(14)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(87)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(37)
	  , TAG = __webpack_require__(47)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(15)
	  , call        = __webpack_require__(77)
	  , isArrayIter = __webpack_require__(78)
	  , anObject    = __webpack_require__(19)
	  , toLength    = __webpack_require__(39)
	  , getIterFn   = __webpack_require__(79)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(19);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(29)
	  , ITERATOR   = __webpack_require__(47)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(74)
	  , ITERATOR  = __webpack_require__(47)('iterator')
	  , Iterators = __webpack_require__(29);
	module.exports = __webpack_require__(14).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(20)
	  , anObject = __webpack_require__(19);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, __webpack_require__(67).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(19)
	  , aFunction = __webpack_require__(16)
	  , SPECIES   = __webpack_require__(47)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(15)
	  , invoke             = __webpack_require__(83)
	  , html               = __webpack_require__(45)
	  , cel                = __webpack_require__(24)
	  , global             = __webpack_require__(13)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(37)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(13)
	  , macrotask = __webpack_require__(82).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(37)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(17);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(13)
	  , core        = __webpack_require__(14)
	  , dP          = __webpack_require__(18)
	  , DESCRIPTORS = __webpack_require__(22)
	  , SPECIES     = __webpack_require__(47)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(47)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CONFIRM_TEXT = '确定';
	var CANCEL_TEXT = '取消';

	var Popup = __webpack_require__(89);

	module.exports = {
	    mixins: [Popup],

	    template: ' <div class="msgbox-wrapper">' + '<div class="msgbox" v-if="rendered" v-show="visible" transition="pop-bounce">' + '<div class="msgbox-header" v-if="title !== \'\'">' + '<div class="msgbox-title">{{ title }}</div>' + '<!--<div class="msgbox-close d-icon icon-close" @click="handleAction(\'close\')"></div>-->' + '</div>' + '<div class="msgbox-content" v-if="message !== \'\'">' + '<div class="msgbox-status d-icon {{ type ? \'icon-\' + type : \'\' }}"></div>' + '<div class="msgbox-message"><p>{{ message }}</p></div>' + '<div class="msgbox-input" v-show="showInput">' + '<input type="text" v-model="inputValue" :placeholder="inputPlaceholder" />' + '<div class="msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? \'visible\' : \'hidden\' }">{{editorErrorMessage}}</div>' + '</div>' + '</div>' + '<div class="msgbox-btns" :class="{ \'msgbox-btns-reverse\': confirmButtonPosition === \'left\' }">' + '<button class="{{ cancelButtonClasses }}" v-show="showCancelButton" @click="handleAction(\'cancel\')">{{ cancelButtonText }}</button>' + '<button class="{{ confirmButtonClasses }}" v-show="showConfirmButton" @click="handleAction(\'confirm\')">{{ confirmButtonText }}</button>' + '</div>' + '</div>' + '</div>',

	    props: {
	        modal: {
	            default: true
	        },
	        closeOnPressEscape: {
	            default: true
	        }
	    },

	    computed: {
	        confirmButtonClasses: function confirmButtonClasses() {
	            var classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;
	            if (this.confirmButtonHighlight) {
	                classes += ' msgbox-confirm-highlight';
	            }
	            return classes;
	        },
	        cancelButtonClasses: function cancelButtonClasses() {
	            var classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;
	            if (this.cancelButtonHighlight) {
	                classes += ' msgbox-cancel-highlight';
	            }
	            return classes;
	        }
	    },

	    methods: {
	        handleAction: function handleAction(action) {
	            if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
	                return;
	            }
	            var callback = this.callback;
	            this.visible = false;
	            callback(action);
	        },

	        validate: function validate() {
	            if (this.$type === 'prompt') {
	                var inputPattern = this.inputPattern;
	                if (inputPattern && !inputPattern.test(this.inputValue || '')) {
	                    this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
	                    return false;
	                }
	                var inputValidator = this.inputValidator;
	                if (typeof inputValidator === 'function') {
	                    var validateResult = inputValidator(this.inputValue);
	                    if (validateResult === false) {
	                        this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
	                        return false;
	                    }
	                    if (typeof validateResult === 'string') {
	                        this.editorErrorMessage = validateResult;
	                        return false;
	                    }
	                }
	            }
	            this.editorErrorMessage = '';
	            return true;
	        }
	    },

	    watch: {
	        inputValue: function inputValue() {
	            if (this.$type === 'prompt') {
	                this.validate();
	            }
	        }
	    },

	    data: function data() {
	        return {
	            title: '',
	            message: '',
	            type: '',
	            showInput: false,
	            inputValue: null,
	            inputPlaceholder: '',
	            inputPattern: null,
	            inputValidator: null,
	            inputErrorMessage: '',
	            showConfirmButton: true,
	            showCancelButton: false,
	            confirmButtonText: CONFIRM_TEXT,
	            cancelButtonText: CANCEL_TEXT,
	            confirmButtonPosition: 'right',
	            confirmButtonHighlight: false,
	            confirmButtonClass: '',
	            confirmButtonDisabled: false,
	            cancelButtonClass: '',
	            cancelButtonHighlight: false,

	            editorErrorMessage: null,
	            callback: null
	        };
	    }
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge = __webpack_require__(90);
	var PopupManager = __webpack_require__(91);

	var idSeed = 1;
	var transitions = [];

	var hookTransition = function hookTransition(transition) {
	  if (transitions.indexOf(transition) !== -1) return;

	  var getVueInstance = function getVueInstance(element) {
	    var instance = element.__vue__;
	    if (!instance) {
	      var textNode = element.previousSibling;
	      if (textNode.__vue__) {
	        instance = textNode.__vue__;
	      }
	    }
	    return instance;
	  };

	  Vue.transition(transition, {
	    afterEnter: function afterEnter(el) {
	      var instance = getVueInstance(el);

	      if (instance) {
	        instance.doAfterOpen && instance.doAfterOpen();
	      }
	    },
	    afterLeave: function afterLeave(el) {
	      var instance = getVueInstance(el);

	      if (instance) {
	        instance.doAfterClose && instance.doAfterClose();
	      }
	    }
	  });
	};

	var getDOM = function getDOM(dom) {
	  if (dom.nodeType === 3) {
	    return dom.nextElementSibling;
	  }
	  return dom;
	};

	module.exports = {
	  props: {
	    visible: {
	      type: Boolean,
	      twoWay: true,
	      default: false
	    },
	    transition: {
	      type: String,
	      default: ''
	    },
	    openDelay: {},
	    closeDelay: {},
	    zIndex: {},
	    modal: {
	      type: Boolean,
	      default: false
	    },
	    modalClass: {},
	    closeOnPressEscape: {
	      type: Boolean,
	      default: false
	    },
	    closeOnClickModal: {
	      type: Boolean,
	      default: false
	    }
	  },

	  created: function created() {
	    if (this.transition) {
	      hookTransition(this.transition);
	    }
	  },

	  compiled: function compiled() {
	    this._popupId = 'popup-' + idSeed++;
	    PopupManager.register(this._popupId, this);
	  },

	  beforeDestroy: function beforeDestroy() {
	    PopupManager.deregister(this._popupId);
	    PopupManager.closeModal(this._popupId);
	  },

	  data: function data() {
	    return {
	      rendered: false
	    };
	  },

	  watch: {
	    visible: function visible(val) {
	      if (val) {
	        if (this._opening) return;
	        if (!this.rendered) {
	          this.rendered = true;
	          Vue.nextTick(function () {
	            this.open();
	          }.bind(this));
	        } else {
	          this.open();
	        }
	      } else {
	        this.close();
	      }
	    }
	  },

	  methods: {
	    open: function open(options) {
	      if (!this.rendered) {
	        this.rendered = true;
	        this.visible = true;

	        return;
	      }

	      var props = merge({}, this, options);

	      if (this._closeTimer) {
	        clearTimeout(this._closeTimer);
	        this._closeTimer = null;
	      }
	      clearTimeout(this._openTimer);

	      var openDelay = Number(props.openDelay);
	      if (openDelay > 0) {
	        this._openTimer = setTimeout(function () {
	          this._openTimer = null;
	          this.doOpen(props);
	        }.bind(this), openDelay);
	      } else {
	        this.doOpen(props);
	      }
	    },

	    doOpen: function doOpen(props) {
	      if (this.willOpen && !this.willOpen()) return;

	      this._opening = true;
	      this.visible = true;

	      var dom = getDOM(this.$el);

	      var modal = props.modal;
	      if (modal) {
	        if (this._closing) {
	          PopupManager.closeModal(this._popupId);
	          this._closing = false;
	        }
	        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom, props.modalClass);
	      }

	      if (getComputedStyle(dom).position === 'static') {
	        dom.style.position = 'absolute';
	      }

	      var zIndex = props.zIndex;
	      if (modal) {
	        dom.style.zIndex = PopupManager.nextZIndex();
	      } else if (zIndex) {
	        dom.style.zIndex = zIndex;
	      }

	      this.onOpen && this.onOpen();

	      if (!this.transition) {
	        this.doAfterOpen();
	      }
	    },

	    doAfterOpen: function doAfterOpen() {
	      this._opening = false;
	    },

	    close: function close() {
	      if (this.willClose && !this.willClose()) return;

	      if (this._openTimer !== null) {
	        clearTimeout(this._openTimer);
	        this._openTimer = null;
	      }
	      clearTimeout(this._closeTimer);

	      var closeDelay = Number(this.closeDelay);

	      if (closeDelay > 0) {
	        this._closeTimer = setTimeout(function () {
	          this._closeTimer = null;
	          this.doClose();
	        }.bind(this), closeDelay);
	      } else {
	        this.doClose();
	      }
	    },

	    doClose: function doClose() {
	      this.visible = false;
	      this._closing = true;

	      this.onClose && this.onClose();

	      if (!this.transition) {
	        this.doAfterClose();
	      }
	    },

	    doAfterClose: function doAfterClose() {
	      PopupManager.closeModal(this._popupId);
	      this._closing = false;
	    }
	  }
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function merge(target) {
	  for (var i = 1, j = arguments.length; i < j; i++) {
	    var source = arguments[i];
	    for (var prop in source) {
	      if (source.hasOwnProperty(prop)) {
	        var value = source[prop];
	        if (value !== undefined) {
	          target[prop] = value;
	        }
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	var getModal = function getModal() {
	  var modalDom = PopupManager.modalDom;
	  if (!modalDom) {
	    modalDom = document.createElement('div');
	    PopupManager.modalDom = modalDom;

	    modalDom.addEventListener('touchmove', function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	    });

	    modalDom.addEventListener('click', function () {
	      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
	    });
	  }

	  return modalDom;
	};

	var instances = {};

	var PopupManager = {
	  zIndex: 1000,

	  getInstance: function getInstance(id) {
	    return instances[id];
	  },

	  register: function register(id, instance) {
	    if (id && instance) {
	      instances[id] = instance;
	    }
	  },

	  deregister: function deregister(id) {
	    if (id) {
	      instances[id] = null;
	      delete instances[id];
	    }
	  },

	  nextZIndex: function nextZIndex() {
	    return PopupManager.zIndex++;
	  },

	  modalStack: [],

	  doOnModalClick: function doOnModalClick() {
	    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
	    if (!topItem) return;

	    var instance = PopupManager.getInstance(topItem.id);
	    if (instance && instance.closeOnClickModal) {
	      instance.close();
	    }
	  },

	  openModal: function openModal(id, zIndex, dom, modalClass) {
	    if (!id || zIndex === undefined) return;

	    var modalStack = this.modalStack;

	    for (var i = 0, j = modalStack.length; i < j; i++) {
	      var item = modalStack[i];
	      if (item.id === id) {
	        return;
	      }
	    }

	    var modalDom = getModal();

	    modalDom.classList.add('v-modal');
	    modalDom.classList.add('v-modal-enter');
	    if (modalClass) {
	      var classArr = modalClass.trim().split(/\s+/);
	      classArr.forEach(function (item) {
	        modalDom.classList.add(item);
	      });
	    }
	    setTimeout(function () {
	      modalDom.classList.remove('v-modal-enter');
	    }, 200);

	    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
	      dom.parentNode.appendChild(modalDom);
	    } else {
	      document.body.appendChild(modalDom);
	    }

	    if (zIndex) {
	      modalDom.style.zIndex = zIndex;
	    }
	    modalDom.style.display = '';

	    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
	  },

	  closeModal: function closeModal(id) {
	    var modalStack = this.modalStack;
	    var modalDom = getModal();

	    if (modalStack.length > 0) {
	      var topItem = modalStack[modalStack.length - 1];
	      if (topItem.id === id) {
	        if (topItem.modalClass) {
	          var classArr = topItem.modalClass.trim().split(/\s+/);
	          classArr.forEach(function (item) {
	            modalDom.classList.remove(item);
	          });
	        }

	        modalStack.pop();
	        if (modalStack.length > 0) {
	          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
	        }
	      } else {
	        for (var i = modalStack.length - 1; i >= 0; i--) {
	          if (modalStack[i].id === id) {
	            modalStack.splice(i, 1);
	            break;
	          }
	        }
	      }
	    }

	    if (modalStack.length === 0) {
	      modalDom.classList.add('v-modal-leave');
	      setTimeout(function () {
	        if (modalStack.length === 0) {
	          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
	          modalDom.style.display = 'none';
	        }
	        modalDom.classList.remove('v-modal-leave');
	      }, 200);
	    }
	  }
	};
	window.addEventListener('keydown', function (event) {
	  if (event.keyCode === 27) {
	    // ESC
	    if (PopupManager.modalStack.length > 0) {
	      var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
	      if (!topItem) return;
	      var instance = PopupManager.getInstance(topItem.id);
	      if (instance.closeOnPressEscape) {
	        instance.close();
	      }
	    }
	  }
	});

	module.exports = PopupManager;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Toast = Vue.extend(__webpack_require__(93));
	var toastPool = [];

	var getAnInstance = function getAnInstance() {
	  if (toastPool.length > 0) {
	    var instance = toastPool[0];
	    toastPool.splice(0, 1);
	    return instance;
	  }
	  return new Toast({
	    el: document.createElement('div')
	  });
	};

	var returnAnInstance = function returnAnInstance(instance) {
	  if (instance) {
	    toastPool.push(instance);
	  }
	};

	module.exports = function (options) {
	  options = options || {};

	  var message, position, duration, className, iconClass;

	  if (typeof options === 'string') {
	    message = options;
	    duration = 3000;
	    position = 'middle';
	    className = '';
	    iconClass = '';
	  } else {
	    message = options.message;
	    duration = options.duration || 3000;
	    position = options.position || 'middle';
	    className = options.className || '';
	    iconClass = options.iconClass || '';
	  }

	  var instance = getAnInstance();

	  instance.message = message;
	  instance.position = position;
	  instance.className = className;
	  instance.iconClass = iconClass;

	  Vue.nextTick(function () {
	    instance.$appendTo(document.body);
	    setTimeout(function () {
	      instance.$remove();
	      returnAnInstance(instance);
	    }, duration);
	  });
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '<div class="mint-toast {{ customClass }}" transition="mint-toast-pop" :style="{ \'padding\': iconClass === \'\' ? \'10px\' : \'20px\' }">' + '<i class="mint-toast-icon {{ iconClass }}" v-if="iconClass !== \'\'"></i>' + '<span class="mint-toast-text" :style="{ \'padding-top\': iconClass === \'\' ? \'0\' : \'10px\' }">{{ message }}</span>' + '</div>',
	    props: {
	        message: String,
	        className: {
	            type: String,
	            default: ''
	        },
	        position: {
	            type: String,
	            default: 'middle'
	        },
	        iconClass: {
	            type: String,
	            default: ''
	        }
	    },

	    computed: {
	        customClass: function customClass() {
	            var classes = [];
	            switch (this.position) {
	                case 'top':
	                    classes.push('is-placetop');
	                    break;
	                case 'bottom':
	                    classes.push('is-placebottom');
	                    break;
	                default:
	                    classes.push('is-placemiddle');
	            }
	            classes.push(this.className);

	            return classes.join(' ');
	        }
	    }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var loadingConfig = __webpack_require__(95);
	var LoadingConponent = Vue.extend(loadingConfig);
	var instance = null;

	function getAnInstance() {
	    var container = document.createElement('div');
	    document.body.appendChild(container);
	    return new LoadingConponent({
	        el: container,
	        data: function data() {
	            return {
	                loading: true
	            };
	        }
	    });
	}
	// var loadingInstance = getAnInstance();

	function show() {
	    if (!instance) {
	        instance = getAnInstance();
	    } else {
	        instance.loading = true;
	    }
	}

	function hide() {
	    if (!instance) {
	        throw new Error('dom of loading isn\'t existed');
	    } else {
	        instance.loading = false;
	    }
	}

	module.exports = {
	    show: show,
	    hide: hide
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '<div v-show="loading" class="mui-loadEffect-wrap">' + '<div class="mui-loadEffect">' + '<div><span></span></div>' + '<div><span></span></div>' + '<div><span></span></div>' + '<div><span></span></div>' + '</div>' + '</div>'
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _picker = __webpack_require__(97);

	var _picker2 = _interopRequireDefault(_picker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _picker2.default;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    name: 'mt-picker',

	    template: ' <div class="picker" :class="{ \'picker-3d\': rotateEffect }">' + '<div class="picker-toolbar" v-if="showToolbar"><slot></slot></div>' + '<div class="picker-items">' + '<picker-slot ' + 'v-for="slot in slots" ' + ':values="slot.values || []" ' + ':text-align="slot.textAlign || \'center\'" ' + ':visible-item-count="visibleItemCount" ' + ':class-name="slot.className" ' + ':flex="slot.flex" ' + ':value.sync="values[slot.valueIndex]" ' + ':rotate-effect="rotateEffect" ' + ':divider="slot.divider" ' + ':content="slot.content">' + '</picker-slot>' + '<div class="picker-center-highlight"></div>' + '</div>' + '</div>',

	    props: {
	        slots: {
	            type: Array
	        },
	        showToolbar: {
	            type: Boolean,
	            default: false
	        },
	        visibleItemCount: {
	            type: Number,
	            default: 5
	        },
	        rotateEffect: {
	            type: Boolean,
	            default: false
	        }
	    },

	    // 获取非divider的值，返回数组this.values
	    beforeCompile: function beforeCompile() {
	        var slots = this.slots || [];
	        this.values = [];
	        var values = this.values;
	        var valueIndexCount = 0;
	        slots.forEach(function (slot) {
	            if (!slot.divider) {
	                slot.valueIndex = valueIndexCount++;
	                values[slot.valueIndex] = (slot.values || [])[0];
	            }
	        });
	    },

	    methods: {
	        getSlot: function getSlot(slotIndex) {
	            var slots = this.slots || [];
	            var count = 0;
	            var target;
	            var children = this.$children;

	            slots.forEach(function (slot, index) {
	                if (!slot.divider) {
	                    if (slotIndex === count) {
	                        target = children[index];
	                    }
	                    count++;
	                }
	            });

	            return target;
	        },
	        getSlotValue: function getSlotValue(index) {
	            var slot = this.getSlot(index);
	            if (slot) {
	                return slot.value;
	            }
	            return null;
	        },
	        setSlotValue: function setSlotValue(index, value) {
	            var slot = this.getSlot(index);
	            if (slot) {
	                slot.value = value;
	            }
	        },
	        getSlotValues: function getSlotValues(index) {
	            var slot = this.getSlot(index);
	            if (slot) {
	                return slot.values;
	            }
	            return null;
	        },
	        setSlotValues: function setSlotValues(index, values) {
	            var slot = this.getSlot(index);
	            if (slot) {
	                slot.values = values;
	            }
	        },
	        getValues: function getValues() {
	            return this.values;
	        },
	        setValues: function setValues(values) {
	            var slotCount = this.slotCount;
	            values = values || [];
	            if (slotCount !== values.length) {
	                throw new Error('values length is not equal slot count.');
	            }
	            values.forEach(function (value, index) {
	                this.setSlotValue(index, value);
	            }.bind(this));
	        }
	    },

	    events: {
	        slotValueChange: function slotValueChange() {
	            this.$emit('change', this, this.values);
	        }
	    },

	    computed: {
	        values: function values() {
	            var slots = this.slots || [];
	            var values = [];
	            slots.forEach(function (slot) {
	                if (!slot.divider) values.push(slot.value);
	            });

	            return values;
	        },
	        slotCount: function slotCount() {
	            var slots = this.slots || [];
	            var result = 0;
	            slots.forEach(function (slot) {
	                if (!slot.divider) result++;
	            });
	            return result;
	        }
	    },

	    components: {
	        PickerSlot: __webpack_require__(98)
	    }
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var draggable = __webpack_require__(99);
	var translateUtil = __webpack_require__(100);
	var windDom = __webpack_require__(101);
	var addClass = windDom.addClass;
	var removeClass = windDom.removeClass;
	var once = windDom.once;
	__webpack_require__(106);

	var rotateElement = function rotateElement(element, angle) {
	    if (!element) return;
	    var transformProperty = translateUtil.transformProperty;

	    element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + ' rotateX(' + angle + 'deg)';
	};

	var ITEM_HEIGHT = 36;
	var VISIBLE_ITEMS_ANGLE_MAP = {
	    3: -45,
	    5: -20,
	    7: -15
	};

	module.exports = {

	    template: '  <div class="picker-slot {{classNames}}" :style="{ flex: flex }">' + '<div v-if="!divider" v-el:wrapper class="picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ height: contentHeight + \'px\' }">' + '<div class="picker-item" v-for="itemValue in values" :class="{ \'picker-selected\': itemValue === value }">{{ itemValue }}</div>' + '</div>' + '<div v-if="divider">{{ content }}</div>' + '</div>',

	    props: {
	        values: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        value: {},
	        visibleItemCount: {
	            type: Number,
	            default: 5
	        },
	        rotateEffect: {
	            type: Boolean,
	            default: false
	        },
	        divider: {
	            type: Boolean,
	            default: false
	        },
	        textAlign: {
	            type: String,
	            default: 'center'
	        },
	        flex: {},
	        className: {},
	        content: {}
	    },

	    data: function data() {
	        return {
	            dragging: false,
	            animationFrameId: null
	        };
	    },

	    computed: {
	        classNames: function classNames() {
	            var PREFIX = 'picker-slot-';
	            var resultArray = [];

	            if (this.rotateEffect) {
	                resultArray.push(PREFIX + 'absolute');
	            }

	            var textAlign = this.textAlign || 'center';
	            resultArray.push(PREFIX + textAlign);

	            if (this.divider) {
	                resultArray.push(PREFIX + 'divider');
	            }

	            if (this.className) {
	                resultArray.push(this.className);
	            }

	            return resultArray.join(' ');
	        },
	        contentHeight: function contentHeight() {
	            return ITEM_HEIGHT * this.visibleItemCount;
	        },
	        valueIndex: function valueIndex() {
	            return this.values.indexOf(this.value);
	        },
	        dragRange: function dragRange() {
	            var values = this.values;
	            var visibleItemCount = this.visibleItemCount;

	            return [-ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)), ITEM_HEIGHT * Math.floor(visibleItemCount / 2)];
	        }
	    },

	    methods: {
	        value2Translate: function value2Translate(value) {
	            var values = this.values;
	            var valueIndex = values.indexOf(value);
	            var offset = Math.floor(this.visibleItemCount / 2);

	            if (valueIndex !== -1) {
	                return (valueIndex - offset) * -ITEM_HEIGHT;
	            }
	        },

	        translate2Value: function translate2Value(translate) {
	            translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
	            var index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

	            return this.values[index];
	        },

	        updateRotate: function updateRotate(currentTranslate, pickerItems) {
	            if (this.divider) return;
	            var dragRange = this.dragRange;
	            var wrapper = this.$els.wrapper;

	            if (!pickerItems) {
	                pickerItems = wrapper.querySelectorAll('.picker-item');
	            }

	            if (currentTranslate === undefined) {
	                currentTranslate = translateUtil.getElementTranslate(wrapper).top;
	            }

	            var itemsFit = Math.ceil(this.visibleItemCount / 2);
	            var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

	            [].forEach.call(pickerItems, function (item, index) {
	                var itemOffsetTop = index * ITEM_HEIGHT;
	                var translateOffset = dragRange[1] - currentTranslate;
	                var itemOffset = itemOffsetTop - translateOffset;
	                var percentage = itemOffset / ITEM_HEIGHT;

	                var angle = angleUnit * percentage;
	                if (angle > 180) angle = 180;
	                if (angle < -180) angle = -180;

	                rotateElement(item, angle);

	                if (Math.abs(percentage) > itemsFit) {
	                    addClass(item, 'picker-item-far');
	                } else {
	                    removeClass(item, 'picker-item-far');
	                }
	            });
	        },

	        planUpdateRotate: function planUpdateRotate() {
	            var el = this.$els.wrapper;
	            cancelAnimationFrame(this.animationFrameId);

	            this.animationFrameId = requestAnimationFrame(function () {
	                this.updateRotate();
	            }.bind(this));

	            once(el, translateUtil.transitionEndProperty, function () {
	                this.animationFrameId = null;
	                cancelAnimationFrame(this.animationFrameId);
	            }.bind(this));
	        },

	        initEvents: function initEvents() {
	            var el = this.$els.wrapper;
	            var dragState = {};

	            var velocityTranslate, velocityTime, prevTranslate, pickerItems;
	            var _self = this;
	            draggable(el, {
	                start: function (event) {
	                    cancelAnimationFrame(this.animationFrameId);
	                    this.animationFrameId = null;
	                    dragState = {
	                        range: this.dragRange,
	                        start: new Date(),
	                        startLeft: event.pageX,
	                        startTop: event.pageY,
	                        startTranslateTop: translateUtil.getElementTranslate(el).top
	                    };
	                    pickerItems = el.querySelectorAll('.picker-item');
	                }.bind(_self),

	                drag: function (event) {
	                    this.dragging = true;

	                    dragState.left = event.pageX;
	                    dragState.top = event.pageY;

	                    var deltaY = dragState.top - dragState.startTop;
	                    var translate = dragState.startTranslateTop + deltaY;

	                    translateUtil.translateElement(el, null, translate);

	                    velocityTranslate = translate - prevTranslate || translate;
	                    velocityTime = Date.now();

	                    prevTranslate = translate;

	                    if (this.rotateEffect) {
	                        this.updateRotate(prevTranslate, pickerItems);
	                    }
	                }.bind(_self),

	                end: function () {
	                    this.dragging = false;

	                    var momentumRatio = 7;
	                    var currentTranslate = translateUtil.getElementTranslate(el).top;
	                    var duration = new Date() - dragState.start;

	                    var momentumTranslate;
	                    if (duration < 300) {
	                        momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
	                    }

	                    var dragRange = dragState.range;

	                    Vue.nextTick(function () {
	                        var translate;
	                        if (momentumTranslate) {
	                            translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
	                        } else {
	                            translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
	                        }

	                        translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

	                        translateUtil.translateElement(el, null, translate);

	                        this.value = this.translate2Value(translate);

	                        if (this.rotateEffect) {
	                            this.planUpdateRotate();
	                        }
	                    }.bind(this));

	                    dragState = {};
	                }.bind(_self)
	            });
	        },

	        doOnValueChange: function doOnValueChange() {
	            var value = this.value;
	            var wrapper = this.$els.wrapper;

	            translateUtil.translateElement(wrapper, null, this.value2Translate(value));
	        },

	        doOnValuesChange: function doOnValuesChange() {
	            var el = this.$el;
	            var items = el.querySelectorAll('.picker-item');
	            [].forEach.call(items, function (item, index) {
	                translateUtil.translateElement(item, null, ITEM_HEIGHT * index);
	            }.bind(this));
	            if (this.rotateEffect) {
	                this.planUpdateRotate();
	            }
	        }
	    },

	    ready: function ready() {
	        this.ready = true;

	        if (!this.divider) {
	            this.initEvents();
	            this.doOnValueChange();
	        }

	        if (this.rotateEffect) {
	            this.doOnValuesChange();
	        }
	    },

	    watch: {
	        values: function values(newVal) {
	            if (this.valueIndex === -1) {
	                this.value = (newVal || [])[0];
	            }
	            if (this.rotateEffect) {
	                Vue.nextTick(function () {
	                    this.doOnValuesChange();
	                }.bind(this));
	            }
	        },
	        value: function value() {
	            this.doOnValueChange();
	            if (this.rotateEffect) {
	                this.planUpdateRotate();
	            }
	            this.$dispatch('slotValueChange', this);
	        }
	    }
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';

	var isDragging = false;
	var supportTouch = 'ontouchstart' in window;

	module.exports = function (element, options) {
	  var moveFn = function moveFn(event) {
	    if (options.drag) {
	      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  };

	  var endFn = function endFn(event) {
	    if (!supportTouch) {
	      document.removeEventListener('mousemove', moveFn);
	      document.removeEventListener('mouseup', endFn);
	    }
	    document.onselectstart = null;
	    document.ondragstart = null;

	    isDragging = false;

	    if (options.end) {
	      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  };

	  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (event) {
	    if (isDragging) return;
	    document.onselectstart = function () {
	      return false;
	    };
	    document.ondragstart = function () {
	      return false;
	    };

	    if (!supportTouch) {
	      document.addEventListener('mousemove', moveFn);
	      document.addEventListener('mouseup', endFn);
	    }
	    isDragging = true;

	    if (options.start) {
	      event.preventDefault();
	      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  });

	  if (supportTouch) {
	    element.addEventListener('touchmove', moveFn);
	    element.addEventListener('touchend', endFn);
	    element.addEventListener('touchcancel', endFn);
	  }
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	var docStyle = document.documentElement.style;
	var engine;
	var translate3d = false;

	if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
	  engine = 'presto';
	} else if ('MozAppearance' in docStyle) {
	  engine = 'gecko';
	} else if ('WebkitAppearance' in docStyle) {
	  engine = 'webkit';
	} else if (typeof navigator.cpuClass === 'string') {
	  engine = 'trident';
	}

	var cssPrefix = { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' }[engine];

	var vendorPrefix = { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }[engine];

	var helperElem = document.createElement('div');
	var perspectiveProperty = vendorPrefix + 'Perspective';
	var transformProperty = vendorPrefix + 'Transform';
	var transformStyleName = cssPrefix + 'transform';
	var transitionProperty = vendorPrefix + 'Transition';
	var transitionStyleName = cssPrefix + 'transition';
	var transitionEndProperty = vendorPrefix.toLowerCase() + 'TransitionEnd';

	if (helperElem.style[perspectiveProperty] !== undefined) {
	  translate3d = true;
	}

	var getTranslate = function getTranslate(element) {
	  var result = { left: 0, top: 0 };
	  if (element === null || element.style === null) return result;

	  var transform = element.style[transformProperty];
	  var matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(transform);
	  if (matches) {
	    result.left = +matches[1];
	    result.top = +matches[3];
	  }

	  return result;
	};

	var translateElement = function translateElement(element, x, y) {
	  if (x === null && y === null) return;

	  if (element === null || element.style === null) return;

	  if (!element.style[transformProperty] && x === 0 && y === 0) return;

	  if (x === null || y === null) {
	    var translate = getTranslate(element);
	    if (x === null) {
	      x = translate.left;
	    }
	    if (y === null) {
	      y = translate.top;
	    }
	  }

	  cancelTranslateElement(element);

	  if (translate3d) {
	    element.style[transformProperty] += ' translate(' + (x ? x + 'px' : '0px') + ',' + (y ? y + 'px' : '0px') + ') translateZ(0px)';
	  } else {
	    element.style[transformProperty] += ' translate(' + (x ? x + 'px' : '0px') + ',' + (y ? y + 'px' : '0px') + ')';
	  }
	};

	var cancelTranslateElement = function cancelTranslateElement(element) {
	  if (element === null || element.style === null) return;
	  var transformValue = element.style[transformProperty];
	  if (transformValue) {
	    transformValue = transformValue.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '');
	    element.style[transformProperty] = transformValue;
	  }
	};

	module.exports = {
	  transformProperty: transformProperty,
	  transformStyleName: transformStyleName,
	  transitionProperty: transitionProperty,
	  transitionStyleName: transitionStyleName,
	  transitionEndProperty: transitionEndProperty,
	  getElementTranslate: getTranslate,
	  translateElement: translateElement,
	  cancelTranslateElement: cancelTranslateElement
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var clazz = __webpack_require__(102);
	var event = __webpack_require__(103);
	var style= __webpack_require__(104);
	var create = __webpack_require__(105);

	module.exports = {
	  on: event.on,
	  off: event.off,
	  once: event.once,
	  getStyle: style.getStyle,
	  setStyle: style.setStyle,
	  removeClass: clazz.removeClass,
	  addClass: clazz.addClass,
	  hasClass: clazz.hasClass,
	  create: create
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	var trim = function (string) {
	  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
	};

	var hasClass = function (el, cls) {
	  if (!el || !cls) return false;
	  if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');
	  if (el.classList) {
	    return el.classList.contains(cls);
	  } else {
	    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	  }
	};

	var addClass = function (el, cls) {
	  if (!el) return;
	  var curClass = el.className;
	  var classes = (cls || '').split(' ');

	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;

	    if (el.classList) {
	      el.classList.add(clsName);
	    } else {
	      if (!hasClass(el, clsName)) {
	        curClass += ' ' + clsName;
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = curClass;
	  }
	};

	var removeClass = function (el, cls) {
	  if (!el || !cls) return;
	  var classes = cls.split(' ');
	  var curClass = ' ' + el.className + ' ';

	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;

	    if (el.classList) {
	      el.classList.remove(clsName);
	    } else {
	      if (hasClass(el, clsName)) {
	        curClass = curClass.replace(' ' + clsName + ' ', ' ');
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = trim(curClass);
	  }
	};

	module.exports = {
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	var bindEvent = (function() {
	  if(document.addEventListener) {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.addEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.attachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	var unbindEvent = (function() {
	  if(document.removeEventListener) {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.removeEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.detachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	var bindOnce = function(el, event, fn) {
	  var listener = function() {
	    if (fn) {
	      fn.apply(this, arguments);
	    }
	    unbindEvent(el, event, listener);
	  };
	  bindEvent(el, event, listener);
	};

	module.exports = {
	  on: bindEvent,
	  off: unbindEvent,
	  once: bindOnce
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
	var MOZ_HACK_REGEXP = /^moz([A-Z])/;

	function camelCase(name) {
	  return name.
	    replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
	      return offset ? letter.toUpperCase() : letter;
	    }).
	    replace(MOZ_HACK_REGEXP, 'Moz$1');
	}

	var ieVersion = Number(document.documentMode);
	var getStyle = ieVersion < 9 ? function(element, styleName) {
	  if (!element || !styleName) return null;
	  styleName = camelCase(styleName);
	  if (styleName === 'float') {
	    styleName = 'styleFloat';
	  }
	  try {
	    switch (styleName) {
	      case 'opacity':
	        try {
	          return element.filters.item('alpha').opacity / 100;
	        }
	        catch (e) {
	          return 1.0;
	        }
	        break;
	      default:
	        return ( element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null );
	    }
	  } catch(e) {
	    return element.style[styleName];
	  }
	} : function(element, styleName) {
	  if (!element || !styleName) return null;
	  styleName = camelCase(styleName);
	  if (styleName === 'float') {
	    styleName = 'cssFloat';
	  }
	  try {
	    var computed = document.defaultView.getComputedStyle(element, '');
	    return element.style[styleName] || computed ? computed[styleName] : null;
	  } catch(e) {
	    return element.style[styleName];
	  }
	};

	var setStyle = function(element, styleName, value) {
	  if (!element || !styleName) return;

	  if (typeof styleName === 'object') {
	    for (var prop in styleName) {
	      if (styleName.hasOwnProperty(prop)) {
	        setStyle(element, prop, styleName[prop]);
	      }
	    }
	  } else {
	    styleName = camelCase(styleName);
	    if (styleName === 'opacity' && ieVersion < 9) {
	      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
	    } else {
	      element.style[styleName] = value;
	    }
	  }
	};

	module.exports = {
	  getStyle: getStyle,
	  setStyle: setStyle
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	//TODO decide the api.
	var create = function(config, refs) {
	  if (!config) return null;
	  var dom, childElement;

	  if (typeof config === 'string') return document.createTextNode(config);

	  if (config.tag) {
	    dom = document.createElement(config.tag);
	    for (var prop in config) {
	      if (config.hasOwnProperty(prop)) {
	        if (prop === 'content' || prop === 'tag') continue;
	        if (prop === 'key' && refs) {
	          var key = config[prop];
	          if (key) {
	            refs[key] = dom;
	          }
	          continue;
	        }
	        dom[prop] = config[prop];
	      }
	    }
	    var content = config.content;
	    if (content) {
	      if (typeof content === 'string') {
	        childElement = document.createTextNode(content);
	        dom.appendChild(childElement);
	      } else {
	        if (!(content instanceof Array)) {
	          content = [ content ];
	        }
	        for (var i = 0, j = content.length; i < j; i++) {
	          var child = content[i];
	          childElement = create(child, refs);
	          dom.appendChild(childElement);
	        }
	      }
	    }

	  }
	  return dom;
	};

	module.exports = create;

/***/ },
/* 106 */
/***/ function(module, exports) {

	/*
	 * raf.js
	 * https://github.com/ngryman/raf.js
	 *
	 * original requestAnimationFrame polyfill by Erik Möller
	 * inspired from paul_irish gist and post
	 *
	 * Copyright (c) 2013 ngryman
	 * Licensed under the MIT license.
	 */

	(function(window) {
		var lastTime = 0,
			vendors = ['webkit', 'moz'],
			requestAnimationFrame = window.requestAnimationFrame,
			cancelAnimationFrame = window.cancelAnimationFrame,
			i = vendors.length;

		// try to un-prefix existing raf
		while (--i >= 0 && !requestAnimationFrame) {
			requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
			cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'];
		}

		// polyfill with setTimeout fallback
		// heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
		if (!requestAnimationFrame || !cancelAnimationFrame) {
			requestAnimationFrame = function(callback) {
				var now = +new Date(), nextTime = Math.max(lastTime + 16, now);
				return setTimeout(function() {
					callback(lastTime = nextTime);
				}, nextTime - now);
			};

			cancelAnimationFrame = clearTimeout;
		}

		// export to window
		window.requestAnimationFrame = requestAnimationFrame;
		window.cancelAnimationFrame = cancelAnimationFrame;
	}(window));


/***/ }
/******/ ]);