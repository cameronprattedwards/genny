module.exports =
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

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.routes = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Home = __webpack_require__(3);

	var _Step = __webpack_require__(9);

	var _End = __webpack_require__(67);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = _react2.default.createClass({
		displayName: 'App',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.children
			);
		}
	});

	var routes = exports.routes = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: App },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home.HomeContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/step/:stepName', component: _Step.StepContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/the-end', component: _End.End })
	);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.HomeContainer = exports.Home = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _paths = __webpack_require__(4);

	var _actionCreators = __webpack_require__(5);

	var _reactRedux = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loginPath = (0, _paths.reversePath)(_paths.Paths.LOGIN, false);

	var Home = exports.Home = _react2.default.createClass({
		displayName: 'Home',
		render: function render() {
			console.log(this.props.loading);
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Click ',
					_react2.default.createElement(
						'a',
						{ href: loginPath, onClick: this.openLoginWindow },
						'here'
					),
					' to login.'
				),
				_react2.default.createElement(
					'p',
					null,
					this.props.loading && 'Loading...'
				)
			);
		},
		openLoginWindow: function openLoginWindow(event) {
			event.preventDefault();
			var child = window.open(loginPath, '', 'width=500,height=500');
			this.props.setChildWindow(child);
		}
	});

	function mapStateToProps(state) {
		return {
			loading: state.get('loading')
		};
	}

	function mapDispatchToProps(dispatch) {
		return {
			setChildWindow: function setChildWindow(childWindow) {
				return dispatch((0, _actionCreators.setChildWindow)(childWindow));
			}
		};
	}

	var HomeContainer = exports.HomeContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.reversePath = reversePath;
	var BASE_PATH = exports.BASE_PATH = '/api';

	var Paths = exports.Paths = {
		LOGIN: '/login',
		CALLBACK: '/callback',
		GET_USER_STATE: '/state',
		ADD_VISIT: ['/steps/:stepId/visits', function (stepId, token) {
			return '/steps/' + stepId + '/visits?token=' + token;
		}]
	};

	var SERVER_DOMAIN = process.env.SERVER_DOMAIN;
	function reversePath(path) {
		var full = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		var reversedPath = BASE_PATH + path;
		if (full) {
			reversedPath = SERVER_DOMAIN + reversedPath;
		}

		return reversedPath;
	}

	exports.default = {
		Paths: Paths,
		reversePath: reversePath
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.setChildWindow = setChildWindow;
	exports.fetchUserState = fetchUserState;
	exports.stepCommit = stepCommit;
	exports.stepSuccess = stepSuccess;
	exports.stepFailure = stepFailure;
	exports.stepUpdate = stepUpdate;

	var _immutable = __webpack_require__(6);

	__webpack_require__(7);

	function setChildWindow(childWindow) {
		return {
			type: 'SET_CHILD_WINDOW',
			childWindow: childWindow
		};
	}

	function requestUserState() {
		return {
			type: 'REQUEST_USER_STATE'
		};
	}

	function receiveUserState(state) {
		return {
			type: 'RECEIVE_USER_STATE',
			state: (0, _immutable.fromJS)(state)
		};
	}

	function fetchUserState(authToken) {
		return function (dispatch) {
			dispatch(requestUserState());

			return fetch('/api/state?token=' + authToken).then(function (response) {
				return response.json();
			}).then(function (json) {
				return dispatch(receiveUserState(json));
			});
		};
	}

	function stepCommit(stepId) {
		return {
			type: 'STEP_COMMIT',
			stepId: stepId
		};
	}

	function stepSuccess(stepId) {
		return {
			type: 'STEP_SUCCESS',
			stepId: stepId
		};
	}

	function stepFailure(stepId) {
		return {
			type: 'STEP_FAILURE',
			stepId: stepId
		};
	}

	function stepUpdate(type, stepId) {
		return {
			type: 'STEP_' + type.toUpperCase(),
			stepId: stepId
		};
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StepContainer = exports.Step = undefined;

	var _extends2 = __webpack_require__(10);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(8);

	var _content = __webpack_require__(26);

	var _content2 = _interopRequireDefault(_content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Step = exports.Step = _react2.default.createClass({
		displayName: 'Step',
		render: function render() {
			if (!this.props.token) {
				return null;
			}

			var _props = this.props;
			var db = _props.db;
			var stepName = _props.params.stepName;

			var step = db.getIn(['steps', db.getIn(['branchNameToStep', stepName]).toString()]);

			var StepContent = _content2.default[stepName];

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Step ',
					step.get('name'),
					'!'
				),
				_react2.default.createElement(StepContent, (0, _extends3.default)({}, this.props, { stepName: stepName, step: step }))
			);
		}
	});

	function mapStateToProps(state) {
		return {
			repoName: state.get('repoName'),
			token: state.get('token'),
			login: state.get('login'),
			db: state.get('db'),
			modules: state.get('modules')
		};
	}

	var StepContainer = exports.StepContainer = (0, _reactRedux.connect)(mapStateToProps)(Step);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(11)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(19)});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
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
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(20)
	  , toObject = __webpack_require__(21)
	  , IObject  = __webpack_require__(23);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(25)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 20 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(22);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(24);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getIterator2 = __webpack_require__(27);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _branchNames = __webpack_require__(55);

	var _branchNames2 = _interopRequireDefault(_branchNames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapping = {};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = (0, _getIterator3.default)(_branchNames2.default), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var branchName = _step.value;

			mapping[branchName] = __webpack_require__(56)("./" + branchName + '/content').default;
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	exports.default = mapping;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	__webpack_require__(47);
	module.exports = __webpack_require__(50);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30);
	var Iterators = __webpack_require__(33);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(31)
	  , step             = __webpack_require__(32)
	  , Iterators        = __webpack_require__(33)
	  , toIObject        = __webpack_require__(34);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(35)(Array, 'Array', function(iterated, kind){
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
/* 31 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(23)
	  , defined = __webpack_require__(22);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(36)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(37)
	  , hide           = __webpack_require__(38)
	  , has            = __webpack_require__(41)
	  , Iterators      = __webpack_require__(33)
	  , $iterCreate    = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(43)
	  , getProto       = __webpack_require__(20).getProto
	  , ITERATOR       = __webpack_require__(44)('iterator')
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
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
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
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(38);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(20)
	  , createDesc = __webpack_require__(39);
	module.exports = __webpack_require__(40) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 41 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(20)
	  , descriptor     = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(43)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(38)(IteratorPrototype, __webpack_require__(44)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).setDesc
	  , has = __webpack_require__(41)
	  , TAG = __webpack_require__(44)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(45)('wks')
	  , uid    = __webpack_require__(46)
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(48)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(35)(String, 'String', function(iterated){
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(49)
	  , defined   = __webpack_require__(22);
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
/* 49 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(51)
	  , get      = __webpack_require__(53);
	module.exports = __webpack_require__(16).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(52);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(54)
	  , ITERATOR  = __webpack_require__(44)('iterator')
	  , Iterators = __webpack_require__(33);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(24)
	  , TAG = __webpack_require__(44)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var branchNames = ['accessibility', 'body-tag', 'empty-html-page', 'environment-setup', 'head-tag', 'images-and-links', 'meta-tags', 'more-content', 'self-closing-tags'];

	exports.default = branchNames;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accessibility/content": 57,
		"./body-tag/content": 58,
		"./empty-html-page/content": 59,
		"./environment-setup/content": 61,
		"./head-tag/content": 62,
		"./images-and-links/content": 63,
		"./meta-tags/content": 64,
		"./more-content/content": 65,
		"./self-closing-tags/content": 66
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 56;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FakePage = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Awesome! Now that your environment is all set up, let\'s write some HTML.'
				),
				_react2.default.createElement(
					'p',
					null,
					'HTML is just a way of formatting text so that a web browser can know how to display it to people.'
				),
				_react2.default.createElement(
					'p',
					null,
					'For example, if I write the following HTML:'
				),
				_react2.default.createElement(
					'pre',
					null,
					'\n<!DOCTYPE html>\n<html>\n<head>\n\t<title>My HTML Page</title>\n</head>\n<body>\n\t<div>\n\t    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>\n\t</div>\n\t<p>This is a new paragraph.</p>\t\n</body>\n</html>\n\t\t\t\t'
				),
				_react2.default.createElement(
					'p',
					null,
					'Your web browser will display it like this:'
				),
				_react2.default.createElement(
					_FakePage.FakePage,
					null,
					_react2.default.createElement(
						'div',
						null,
						'This is regular text. ',
						_react2.default.createElement(
							'strong',
							null,
							'This is bold.'
						),
						' ',
						_react2.default.createElement(
							'em',
							null,
							'This is italic.'
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'This is a new paragraph.'
					)
				)
			);
		}
	});

	exports.default = Content;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FakePage = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FakePage = exports.FakePage = _react2.default.createClass({
		displayName: 'FakePage',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.children
			);
		}
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var _props = this.props;
			var repoName = _props.repoName;
			var login = _props.login;
			var step = _props.step;

			var branchName = step.get('branchName');

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Congratulations on embarking on the journey of learning HTML! You\'re going to love it.'
				),
				_react2.default.createElement(
					'p',
					null,
					'We\'re going to start writing some HTML in the next step, but first we\'re going to need to set up your computer so you can work like a real coder. This should take just a couple of minutes.'
				),
				_react2.default.createElement(
					'p',
					null,
					'First, open up your terminal. You can do that by pressing Command+Spacebar and typing in "Terminal", then pressing enter. The terminal is a program that allows you to type in commands to your computer. It\'s pretty handy.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Now we\'re going to set you up with a text editor so you can write code easily. We\'ll do that with Sublime Text. First, we\'ll install a package manager called "Brew". Brew will come in handy for installing Sublime Text, and for a lot of other packages later. To install Brew, type the following. (But don\'t type the "> " at the beginning. That just means this is something you should run in the terminal.)'
				),
				_react2.default.createElement(
					'code',
					null,
					'> ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
				),
				_react2.default.createElement(
					'p',
					null,
					'And press enter.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Then, to install Sublime Text, type:'
				),
				_react2.default.createElement(
					'code',
					null,
					'> brew install caskroom/cask/brew-cask && brew tap caskroom/versions && brew cask install sublime-text3'
				),
				_react2.default.createElement(
					'p',
					null,
					'You might need to type in the administrator password for your computer.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Cool! Next: we\'ve created a repository for you in GitHub. A repository is a bucket that you can keep your code. Repositories also allow you to share code with other people. You\'re going to copy the repository that we\'ve made, and whenever you\'re done with a step in the tutorial, you\'ll send that code back to the main bucket. We\'ll take a look at your code and let you know how you\'re doing, and give you pointers about how to make it better.'
				),
				_react2.default.createElement(
					'p',
					null,
					'First, let\'s go to your "home" directory so we can put the repository there:'
				),
				_react2.default.createElement(
					'code',
					null,
					'> cd ~'
				),
				_react2.default.createElement(
					'p',
					null,
					'"cd" stands for "change directories". And ~ is a shortcut for your home directory.'
				),
				_react2.default.createElement(
					'p',
					null,
					'To copy the repository onto your own computer, type:'
				),
				_react2.default.createElement(
					'code',
					null,
					'> git clone https://github.com/',
					login,
					'/',
					repoName,
					'.git'
				),
				_react2.default.createElement(
					'p',
					null,
					'This will create a directory in your home directory called ',
					repoName,
					'. Next, change directories to go into your repository:'
				),
				_react2.default.createElement(
					'code',
					null,
					'> cd ',
					repoName
				),
				_react2.default.createElement(
					'p',
					null,
					'To open up your repository in Sublime Text, type:'
				),
				_react2.default.createElement(
					'code',
					null,
					'> subl .'
				),
				_react2.default.createElement(
					'p',
					null,
					'There\'s not a lot happening in there for right now, but we\'re going to make some stuff happen right away. Create a new branch to do your coding in. We\'ll explain later what this step is all about.'
				),
				_react2.default.createElement(
					'code',
					null,
					'> git checkout -b ',
					branchName
				),
				_react2.default.createElement(
					'p',
					null,
					'Let\'s create a test file to make sure that you\'re set up correctly:'
				),
				_react2.default.createElement(
					'code',
					null,
					'> touch test-file.txt'
				),
				_react2.default.createElement(
					'p',
					null,
					'Then, go into Sublime Text and click on "test-file.txt" in the left hand side. This will open up the file for editing in the main window. Type "This is just a test" in the file and type Command+S to save.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Last but not least, send the code to our shared repository by typing'
				),
				_react2.default.createElement(
					'code',
					null,
					'> git add . && git commit -m "Create my first text file" && git push -u origin ',
					branchName
				)
			);
		}
	});

	exports.default = Content;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			return _react2.default.createElement('div', null);
		}
	});

	exports.default = Content;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.End = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var End = exports.End = _react2.default.createClass({
		displayName: 'End',
		render: function render() {
			return _react2.default.createElement(
				'p',
				null,
				'You finished! You\'re done forever!'
			);
		}
	});

/***/ }
/******/ ]);