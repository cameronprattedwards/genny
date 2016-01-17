module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}

/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "6669860480a93a81913a"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				fn[name] = __webpack_require__[name];
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

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

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
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

	var _Step = __webpack_require__(78);

	var _End = __webpack_require__(115);

	var _App = __webpack_require__(116);

	var _Setup = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = exports.routes = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: _App.App },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home.HomeContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/step/:stepName(/:pane)', component: _Step.StepContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/setup/:pane', component: _Setup.SetupContainer }),
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

	var _reactRedux = __webpack_require__(4);

	var _reactRouter = __webpack_require__(2);

	var _paths = __webpack_require__(5);

	var _actionCreators = __webpack_require__(6);

	var _Home = __webpack_require__(9);

	var _Home2 = _interopRequireDefault(_Home);

	var _Setup = __webpack_require__(10);

	var _Spinner = __webpack_require__(76);

	var _Button = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loginPath = (0, _paths.reversePath)(_paths.Paths.LOGIN, false);

	var Home = exports.Home = _react2.default.createClass({
		displayName: 'Home',
		render: function render() {
			var callToAction = null;

			if (this.props.loading) {
				callToAction = _react2.default.createElement(
					'div',
					{ className: _Home2.default.spinner },
					_react2.default.createElement(_Spinner.Spinner, null)
				);
			} else if (this.props.token) {
				callToAction = _react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						_Button.Button,
						{ component: _reactRouter.Link, to: '/step/' + this.props.currentStep },
						'Click here'
					),
					' ',
					'to pick up where you left off.'
				);
			} else {
				callToAction = _react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						_Button.Button,
						{ component: _reactRouter.Link, to: (0, _Setup.setupUrl)(_Setup.FIRST_PANE) },
						'Click here'
					),
					' to get started.'
				);
			}

			return _react2.default.createElement(
				'div',
				{ className: _Home2.default.home },
				_react2.default.createElement(
					'h1',
					null,
					'School of Haxx is a free HTML tutorial.'
				),
				_react2.default.createElement(
					'p',
					null,
					'We\'ll teach you the basics of HTML, and you\'ll be building your own webpages in no time. '
				),
				_react2.default.createElement(
					'p',
					null,
					'Plus, we\'ll do it using tools that real programmers use - like ',
					_react2.default.createElement(
						'strong',
						null,
						'Sublime Text'
					),
					',',
					_react2.default.createElement(
						'strong',
						null,
						' the terminal'
					),
					' and ',
					_react2.default.createElement(
						'strong',
						null,
						'git'
					),
					'.'
				),
				_react2.default.createElement(
					'p',
					null,
					'It\'s simple as pie. In a couple minutes you\'ll be writing webpages like a pro.'
				),
				callToAction
			);
		},
		openLoginWindow: function openLoginWindow(event) {
			event.preventDefault();
			if (!this.props.token) {
				var child = window.open(loginPath, '', 'width=500,height=500');
				this.props.setChildWindow(child);
			} else {
				this.props.history.pushState(null, '/step/' + this.props.currentStep);
			}
		}
	});

	function mapStateToProps(state) {
		return {
			loading: state.ui.get('loading'),
			token: state.user.get('token'),
			currentStep: state.user.get('currentStep')
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

	module.exports = require("react-redux");

/***/ },
/* 5 */
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
		}],
		SETUP: ['/setup/:token', function (token) {
			return '/setup/' + token;
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TOGGLE_TROUBLESHOOTING = exports.SET_OS = exports.MARK_COPIED = exports.RECEIVE_USER_STATE = exports.REQUEST_USER_STATE = exports.SET_CHILD_WINDOW = exports.STEP_VISIT = exports.STEP_FAILURE = exports.STEP_SUCCESS = exports.STEP_COMMIT = undefined;
	exports.setChildWindow = setChildWindow;
	exports.fetchUserState = fetchUserState;
	exports.stepCommit = stepCommit;
	exports.stepSuccess = stepSuccess;
	exports.stepFailure = stepFailure;
	exports.stepUpdate = stepUpdate;
	exports.markCopied = markCopied;
	exports.setOs = setOs;
	exports.toggleTroubleshooting = toggleTroubleshooting;

	var _immutable = __webpack_require__(7);

	__webpack_require__(8);

	var STEP_COMMIT = exports.STEP_COMMIT = 'STEP_COMMIT';
	var STEP_SUCCESS = exports.STEP_SUCCESS = 'STEP_SUCCESS';
	var STEP_FAILURE = exports.STEP_FAILURE = 'STEP_FAILURE';
	var STEP_VISIT = exports.STEP_VISIT = 'STEP_VISIT';
	var SET_CHILD_WINDOW = exports.SET_CHILD_WINDOW = 'SET_CHILD_WINDOW';
	var REQUEST_USER_STATE = exports.REQUEST_USER_STATE = 'REQUEST_USER_STATE';
	var RECEIVE_USER_STATE = exports.RECEIVE_USER_STATE = 'RECEIVE_USER_STATE';
	var MARK_COPIED = exports.MARK_COPIED = 'MARK_COPIED';
	var SET_OS = exports.SET_OS = 'SET_OS';
	var TOGGLE_TROUBLESHOOTING = exports.TOGGLE_TROUBLESHOOTING = 'TOGGLE_TROUBLESHOOTING';

	function setChildWindow(childWindow) {
		return {
			type: SET_CHILD_WINDOW,
			childWindow: childWindow
		};
	}

	function requestUserState() {
		return {
			type: REQUEST_USER_STATE
		};
	}

	function receiveUserState(state) {
		return {
			type: RECEIVE_USER_STATE,
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
			type: STEP_COMMIT,
			stepId: stepId
		};
	}

	function stepSuccess(stepId) {
		return {
			type: STEP_SUCCESS,
			stepId: stepId
		};
	}

	function stepFailure(stepId) {
		return {
			type: STEP_FAILURE,
			stepId: stepId
		};
	}

	function stepUpdate(type, stepId, value) {
		return {
			type: 'STEP_' + type.toUpperCase(),
			stepId: stepId,
			value: value
		};
	}

	function markCopied(text) {
		return {
			type: MARK_COPIED,
			text: text
		};
	}

	function setOs(os) {
		return {
			type: SET_OS,
			os: os
		};
	}

	function toggleTroubleshooting(key, isOpen) {
		return {
			type: TOGGLE_TROUBLESHOOTING,
			key: key,
			isOpen: isOpen
		};
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"home":"_2UyVyOurOeAJX_1S4r8nQp"};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _titles;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SetupContainer = exports.Setup = exports.FIRST_PANE = exports.SIGN_UP_FOR_GITHUB = undefined;
	exports.setupUrl = setupUrl;

	var _defineProperty2 = __webpack_require__(11);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _reactRedux = __webpack_require__(4);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	var _Button = __webpack_require__(18);

	var _Keyboard = __webpack_require__(35);

	var _Bash = __webpack_require__(37);

	var _Spinner = __webpack_require__(76);

	var _Setup = __webpack_require__(77);

	var _Setup2 = _interopRequireDefault(_Setup);

	var _paths = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SIGN_UP_FOR_GITHUB = exports.SIGN_UP_FOR_GITHUB = 'sign-up-for-github';
	var FIRST_PANE = exports.FIRST_PANE = SIGN_UP_FOR_GITHUB;
	var VERIFY_YOUR_EMAIL = 'verify-your-email';
	var AUTHORIZE_SCHOOL_OF_HAXX = 'authorize-school-of-haxx';
	var OPEN_YOUR_TERMINAL = 'open-your-terminal';
	var DOWNLOAD_SUBLIME_TEXT = 'download-sublime-text';

	var titles = (_titles = {}, (0, _defineProperty3.default)(_titles, SIGN_UP_FOR_GITHUB, 'Sign Up for GitHub'), (0, _defineProperty3.default)(_titles, VERIFY_YOUR_EMAIL, 'Verify Your Email'), (0, _defineProperty3.default)(_titles, AUTHORIZE_SCHOOL_OF_HAXX, 'Authorize School of Haxx'), (0, _defineProperty3.default)(_titles, OPEN_YOUR_TERMINAL, 'Open Your Terminal'), (0, _defineProperty3.default)(_titles, DOWNLOAD_SUBLIME_TEXT, 'Download Sublime Text'), _titles);

	var SignUpForGithub = _react2.default.createClass({
		displayName: 'SignUpForGithub',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Let\'s get set up'
				),
				_react2.default.createElement(
					'p',
					null,
					'We\'re so excited to help you learn some HTML! Before we start building webpages, you\'ll need to set up a few things. They\'re easy, and you only need to do them once:'
				),
				_react2.default.createElement(
					'ol',
					null,
					_react2.default.createElement(
						'li',
						null,
						titles[SIGN_UP_FOR_GITHUB]
					),
					_react2.default.createElement(
						'li',
						null,
						titles[VERIFY_YOUR_EMAIL]
					),
					_react2.default.createElement(
						'li',
						null,
						titles[AUTHORIZE_SCHOOL_OF_HAXX]
					),
					_react2.default.createElement(
						'li',
						null,
						titles[OPEN_YOUR_TERMINAL]
					),
					_react2.default.createElement(
						'li',
						null,
						titles[DOWNLOAD_SUBLIME_TEXT]
					)
				),
				_react2.default.createElement(
					'h2',
					null,
					'Setup Step One: ',
					titles[SIGN_UP_FOR_GITHUB]
				),
				_react2.default.createElement(
					'h3',
					null,
					'tl;dr'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						_Button.Button,
						{ href: 'https://github.com', target: '_blank', component: 'a' },
						'Sign up for GitHub.'
					)
				),
				_react2.default.createElement(
					'p',
					null,
					'Come right back here after creating a username and password. Don\'t worry about choosing a plan or visiting your dashboard.'
				),
				_react2.default.createElement(
					_Continue.Continue,
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: setupUrl(VERIFY_YOUR_EMAIL) },
						'I\'m Signed Up for GitHub'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'Why?'
				),
				_react2.default.createElement(
					'p',
					null,
					'School of Haxx is different from other HTML tutorials.'
				),
				_react2.default.createElement(
					'p',
					null,
					'It\'s interactive, and it teaches you how to write HTML the way that real coders do.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Real coders often need to share their code with other coders - they do that using ',
					_react2.default.createElement(
						'strong',
						null,
						'Git'
					),
					'.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Git is a tool that sends code back and forth between your computer and a shared ',
					_react2.default.createElement(
						'strong',
						null,
						'repository'
					),
					' - a bucket full of code, shared by one or more coders.'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'strong',
						null,
						'GitHub'
					),
					' is a ',
					_react2.default.createElement(
						'strong',
						null,
						'free'
					),
					' place to store Git repositories.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Each time you create a new webpage in the tutorial, you\'ll send your code to us using Git. That will let us know how you\'re doing, so we can give you some extra pointers if you need them.'
				),
				_react2.default.createElement(
					'p',
					null,
					'You won\'t have to learn too much about Git to start out. We\'ll give you some commands to copy and paste. You\'ll learn about Git more in-depth after you\'ve become a webpage-making whiz.'
				)
			);
		}
	});

	var VerifyYourEmail = _react2.default.createClass({
		displayName: 'VerifyYourEmail',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Setup Step Two: ',
					titles[VERIFY_YOUR_EMAIL]
				),
				_react2.default.createElement(
					'h3',
					null,
					'tl;dr'
				),
				_react2.default.createElement(
					'p',
					null,
					'Verify your email address.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Visit the inbox for the email you provided to GitHub. Click on the email titled "[GitHub] Please verify your email address." Then click on "Verify Email Address."'
				),
				_react2.default.createElement(
					'p',
					null,
					'Then come right back here.'
				),
				_react2.default.createElement(
					_Continue.Continue,
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: setupUrl(AUTHORIZE_SCHOOL_OF_HAXX) },
						'My Email is Verified'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'Why?'
				),
				_react2.default.createElement(
					'p',
					null,
					'To use GitHub (and this app), GitHub needs to make sure that your email address is valid.'
				)
			);
		}
	});

	var Authorize = _react2.default.createClass({
		displayName: 'Authorize',
		render: function render() {
			var callToAction = null;

			if (this.props.token) {
				callToAction = _react2.default.createElement(
					_Continue.Continue,
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: setupUrl(OPEN_YOUR_TERMINAL) },
						'I Have Authorized School of Haxx'
					)
				);
			} else if (this.props.loading) {
				callToAction = _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_Spinner.Spinner, null),
					' We\'re customizing the tutorial for you.'
				);
			}

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Setup Step Three: ',
					titles[AUTHORIZE_SCHOOL_OF_HAXX]
				),
				_react2.default.createElement(
					'h3',
					null,
					'tl;dr'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						_Button.Button,
						{ onClick: this.authorize },
						'Authorize School of Haxx'
					),
					' ',
					'to access your GitHub account.'
				),
				callToAction,
				_react2.default.createElement(
					'h3',
					null,
					'Why?'
				),
				_react2.default.createElement(
					'p',
					null,
					'We\'re going to be sharing a GitHub repository with you. You just need to tell GitHub that you want to share your code with us. We\'ll also need your email to help you set up your programming environment.'
				),
				_react2.default.createElement(
					'p',
					null,
					'But we won\'t send you any spam. We promise.'
				)
			);
		}
	});

	var OpenTerminal = _react2.default.createClass({
		displayName: 'OpenTerminal',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Setup Step Four: ',
					titles[OPEN_YOUR_TERMINAL]
				),
				_react2.default.createElement(
					'h3',
					null,
					'tl;dr'
				),
				_react2.default.createElement(
					'p',
					null,
					'Open your terminal.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Just press ',
					_react2.default.createElement(
						_Keyboard.Key,
						null,
						'Command'
					),
					' ',
					_react2.default.createElement(
						_Keyboard.Key,
						null,
						'Spacebar'
					),
					', then type "Terminal" and press enter.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Then come on back here.'
				),
				_react2.default.createElement(
					_Continue.Continue,
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: setupUrl(DOWNLOAD_SUBLIME_TEXT) },
						'My terminal is open.'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'Why?'
				),
				_react2.default.createElement(
					'p',
					null,
					'The terminal is a helpful tool that you will use to tell your computer what you want it to do. You do that by typing in "commands." We\'ll show you how.'
				),
				_react2.default.createElement(
					'p',
					null,
					'You\'ll be using the terminal quite a bit. You\'ll probably want to maximize the window by clicking the little green button in the upper left hand corner. If you maximize it, you can switch between the terminal and your computer by swiping left or right with three fingers or by pressing ',
					_react2.default.createElement(
						_Keyboard.Key,
						null,
						'Command'
					),
					' ',
					_react2.default.createElement(
						_Keyboard.Key,
						null,
						'Tab'
					),
					'.'
				)
			);
		}
	});

	var DownloadSublime = _react2.default.createClass({
		displayName: 'DownloadSublime',
		render: function render() {
			var next = null;

			if (this.props.complete) {
				next = _react2.default.createElement(
					_Continue.Continue,
					null,
					'You did it! ',
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/step/empty-html-page' },
						'Click here'
					),
					' to start writing some HTML.'
				);
			}

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Last Setup Step: ',
					titles[DOWNLOAD_SUBLIME_TEXT]
				),
				_react2.default.createElement(
					'h3',
					null,
					'tl;dr'
				),
				_react2.default.createElement(
					'p',
					null,
					'Copy and paste this into your terminal:'
				),
				_react2.default.createElement(
					_Bash.Bash,
					{ copy: true },
					getShellCommand(this.props)
				),
				_react2.default.createElement(
					'p',
					null,
					'You can paste by pressing ',
					_react2.default.createElement(
						_Keyboard.Key,
						null,
						'Command'
					),
					' ',
					_react2.default.createElement(
						_Keyboard.Key,
						null,
						'V'
					),
					'.'
				),
				_react2.default.createElement(
					'p',
					null,
					'You might get a popup that looks like this:'
				),
				_react2.default.createElement(
					'p',
					{ className: _Setup2.default.imgWrapper },
					_react2.default.createElement('img', { src: '/public/images/xcrun.png', className: _Setup2.default.img })
				),
				_react2.default.createElement(
					'p',
					null,
					'Just press "Install."'
				),
				_react2.default.createElement(
					'p',
					null,
					'You\'ll probably need to enter your Mac password a couple of times. You\'ll also need to enter your GitHub username and password twice.'
				),
				next,
				_react2.default.createElement(
					'h3',
					null,
					'Why?'
				),
				_react2.default.createElement(
					'p',
					null,
					'Sublime Text is a simple text editor where you\'ll be writing your HTML. You\'ll want to use text editor instead of a word processor (like Microsoft Word) because word processors add a bunch of extra formatting that will actually mess up your code.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Sublime Text is easy to use. You\'ll see.'
				),
				_react2.default.createElement(
					'p',
					null,
					'The command will download your repository and open it up in Sublime Text. The repository is a folder on your computer where you\'ll save all your HTML files. You\'ll be sending code from the repository on your computer to a repository in GitHub. That will allow us to look at your code and give you pointers if you need them.'
				)
			);
		}
	});

	var Setup = exports.Setup = _react2.default.createClass({
		displayName: 'Setup',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _Setup2.default.setup },
				_react2.default.createElement(
					_Carousel.Carousel,
					null,
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: SIGN_UP_FOR_GITHUB },
						_react2.default.createElement(SignUpForGithub, this.props)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: VERIFY_YOUR_EMAIL },
						_react2.default.createElement(VerifyYourEmail, this.props)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: AUTHORIZE_SCHOOL_OF_HAXX },
						_react2.default.createElement(Authorize, this.props)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: OPEN_YOUR_TERMINAL },
						_react2.default.createElement(OpenTerminal, this.props)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: DOWNLOAD_SUBLIME_TEXT },
						_react2.default.createElement(DownloadSublime, this.props)
					)
				)
			);
		},
		authorize: function authorize() {}
	});

	function setupUrl(slug) {
		return '/setup/' + slug;
	}

	function mapStateToProps(state) {
		return {
			token: state.user.get('token'),
			SERVER_DOMAIN: state.env.get('SERVER_DOMAIN'),
			loading: state.ui.get('loading'),
			complete: state.db.getIn(['steps', 'environment-setup', 'success'])
		};
	}

	var SetupContainer = exports.SetupContainer = (0, _reactRedux.connect)(mapStateToProps)(Setup);

	function getShellCommand(_ref) {
		var SERVER_DOMAIN = _ref.SERVER_DOMAIN;
		var token = _ref.token;

		return 'curl ' + SERVER_DOMAIN + _paths.BASE_PATH + _paths.Paths.SETUP[1](token) + ' | sh';
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(12);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(14);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Pane = exports.Carousel = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Carousel = exports.Carousel = _react2.default.createClass({
		displayName: 'Carousel',

		contextTypes: {
			params: _react2.default.PropTypes.object
		},

		render: function render() {
			var pane = this.context.params.pane || '';
			return _react2.default.Children.toArray(this.props.children).find(function (child) {
				return child.props.name === pane;
			});
		}
	});

	var Pane = exports.Pane = _react2.default.createClass({
		displayName: 'Pane',
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.children
			);
		}
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Continue = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Continue = __webpack_require__(17);

	var _Continue2 = _interopRequireDefault(_Continue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Continue = exports.Continue = _react2.default.createClass({
		displayName: 'Continue',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _Continue2.default.continue },
				this.props.children
			);
		}
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"continue":"_3ZDiqf8BiKOsdAWY8lMIo6"};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Button = undefined;

	var _extends2 = __webpack_require__(19);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(34);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Button = exports.Button = _react2.default.createClass({
		displayName: 'Button',
		getDefaultProps: function getDefaultProps() {
			return {
				component: 'button'
			};
		},
		render: function render() {
			var Component = this.props.component;

			return _react2.default.createElement(
				Component,
				(0, _extends3.default)({ className: _Button2.default.button }, this.props),
				this.props.children
			);
		}
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(20);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
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

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	module.exports = __webpack_require__(25).Object.assign;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(23);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(28)});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(24)
	  , core      = __webpack_require__(25)
	  , ctx       = __webpack_require__(26)
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
/* 24 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 25 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(27);
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
/* 27 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(14)
	  , toObject = __webpack_require__(29)
	  , IObject  = __webpack_require__(31);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(33)(function(){
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(30);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(32);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"button":"_2RfQHWfJx0InTK8_Yi15gQ"};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Key = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Keyboard = __webpack_require__(36);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Key = exports.Key = _react2.default.createClass({
		displayName: 'Key',
		render: function render() {
			return _react2.default.createElement(
				'span',
				{ className: _Keyboard2.default.key },
				this.props.children
			);
		}
	});

/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"key":"_2ZOBl-tauq8FEz6KoLKVrF"};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Bash = undefined;

	var _extends2 = __webpack_require__(19);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(38);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Bash = __webpack_require__(39);

	var _Bash2 = _interopRequireDefault(_Bash);

	var _Code = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Bash = exports.Bash = _react2.default.createClass({
		displayName: 'Bash',
		render: function render() {
			var classNames = (0, _classnames2.default)('bash', _Bash2.default.bash);
			return _react2.default.createElement(
				_Code.Code,
				(0, _extends3.default)({ className: classNames }, this.props),
				this.props.children
			);
		}
	});

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 39 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"bash":"o2xq8OA-xfE5knTp1PMaN","relative":"_32lhWe4QsdvEAzYYSZXheA","button":"_1I_3eV7BtnwsAzeCE73T1-"};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Code = undefined;

	var _reactHighlight = __webpack_require__(41);

	var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(38);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Code = __webpack_require__(42);

	var _Code2 = _interopRequireDefault(_Code);

	var _CopyButton = __webpack_require__(43);

	var _NoSelect = __webpack_require__(74);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Code = exports.Code = _react2.default.createClass({
		displayName: 'Code',
		render: function render() {
			var classNames = (0, _classnames2.default)(this.props.className, _Code2.default.code);
			var code = _react2.default.createElement(
				_reactHighlight2.default,
				{ className: classNames },
				this.props.children
			);

			if (this.props.copy) {
				var child = null;
				if (typeof this.props.children === 'string') {
					child = this.props.children;
				} else {
					child = _react2.default.Children.only(this.props.children);
				}
				var execText = child + '\n';

				return _react2.default.createElement(
					'div',
					{ className: _Code2.default.relative },
					code,
					_react2.default.createElement(_CopyButton.CopyButtonContainer, { text: execText, className: _Code2.default.button })
				);
			} else if (this.props.noSelect) {
				return _react2.default.createElement(
					_NoSelect.NoSelect,
					null,
					code
				);
			} else {
				return code;
			}
		}
	});

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("react-highlight");

/***/ },
/* 42 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"relative":"_2UWut-1YyEWwDYlV-olmhA","button":"_3JkIj5afE3kkcbPcrU1A1t"};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CopyButtonContainer = exports.CopyButton = undefined;

	var _toConsumableArray2 = __webpack_require__(44);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactZeroclipboard = __webpack_require__(72);

	var _reactZeroclipboard2 = _interopRequireDefault(_reactZeroclipboard);

	var _classnames = __webpack_require__(38);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactRedux = __webpack_require__(4);

	var _CopyButton = __webpack_require__(73);

	var _CopyButton2 = _interopRequireDefault(_CopyButton);

	var _actionCreators = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CopyButton = exports.CopyButton = _react2.default.createClass({
		displayName: 'CopyButton',
		render: function render() {
			var _this = this;

			var copyVerb = this.props.copiedText === this.props.text ? 'Copied' : 'Copy';

			var classes = [_CopyButton2.default.button];
			if (this.props.className) {
				classes.push(this.props.className);
			}
			classes = _classnames2.default.apply(undefined, (0, _toConsumableArray3.default)(classes));

			return _react2.default.createElement(
				_reactZeroclipboard2.default,
				{ text: this.props.text, onAfterCopy: function onAfterCopy() {
						return _this.onAfterCopy();
					} },
				_react2.default.createElement(
					'button',
					{ className: classes },
					copyVerb
				)
			);
		},
		onAfterCopy: function onAfterCopy() {
			this.props.markCopied(this.props.text);
		}
	});

	function mapStateToProps(state) {
		return {
			copiedText: state.ui.get('copiedText')
		};
	}

	function mapDispatchToProps(dispatch) {
		return {
			markCopied: function markCopied(text) {
				return dispatch((0, _actionCreators.markCopied)(text));
			}
		};
	}

	var CopyButtonContainer = exports.CopyButtonContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CopyButton);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(45);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	__webpack_require__(63);
	module.exports = __webpack_require__(25).Array.from;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(48)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(50)(String, 'String', function(iterated){
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
	  , defined   = __webpack_require__(30);
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

	'use strict';
	var LIBRARY        = __webpack_require__(51)
	  , $export        = __webpack_require__(23)
	  , redefine       = __webpack_require__(52)
	  , hide           = __webpack_require__(53)
	  , has            = __webpack_require__(56)
	  , Iterators      = __webpack_require__(57)
	  , $iterCreate    = __webpack_require__(58)
	  , setToStringTag = __webpack_require__(59)
	  , getProto       = __webpack_require__(14).getProto
	  , ITERATOR       = __webpack_require__(60)('iterator')
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
/* 51 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(14)
	  , createDesc = __webpack_require__(54);
	module.exports = __webpack_require__(55) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(33)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 56 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(14)
	  , descriptor     = __webpack_require__(54)
	  , setToStringTag = __webpack_require__(59)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(53)(IteratorPrototype, __webpack_require__(60)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).setDesc
	  , has = __webpack_require__(56)
	  , TAG = __webpack_require__(60)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(61)('wks')
	  , uid    = __webpack_require__(62)
	  , Symbol = __webpack_require__(24).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(24)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(26)
	  , $export     = __webpack_require__(23)
	  , toObject    = __webpack_require__(29)
	  , call        = __webpack_require__(64)
	  , isArrayIter = __webpack_require__(67)
	  , toLength    = __webpack_require__(68)
	  , getIterFn   = __webpack_require__(69);
	$export($export.S + $export.F * !__webpack_require__(71)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(65);
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(66);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(57)
	  , ITERATOR   = __webpack_require__(60)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(49)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(70)
	  , ITERATOR  = __webpack_require__(60)('iterator')
	  , Iterators = __webpack_require__(57);
	module.exports = __webpack_require__(25).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(32)
	  , TAG = __webpack_require__(60)('toStringTag')
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(60)('iterator')
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
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("react-zeroclipboard");

/***/ },
/* 73 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"button":"_1lya0mkuixw6muf8oZQxBk"};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NoSelect = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NoSelect = __webpack_require__(75);

	var _NoSelect2 = _interopRequireDefault(_NoSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NoSelect = exports.NoSelect = _react2.default.createClass({
		displayName: 'NoSelect',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _NoSelect2.default.noSelect },
				this.props.children
			);
		}
	});

/***/ },
/* 75 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"noSelect":"_3KWi4Ct-zRR0dpt-n8BWhU"};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Spinner = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Spinner = exports.Spinner = _react2.default.createClass({
		displayName: "Spinner",
		render: function render() {
			return _react2.default.createElement("i", { className: "fa fa-spinner fa-spin" });
		}
	});

/***/ },
/* 77 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"setup":"_3THZySxez1Q_bN6gbw36JR","img":"_3SAPVqwecmJg7IP2bLbd8G","imgWrapper":"_1rZAKsy-1kwnOw4TojNvss"};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StepContainer = exports.Step = undefined;

	var _extends2 = __webpack_require__(19);

	var _extends3 = _interopRequireDefault(_extends2);

	var _isomorphicFetch = __webpack_require__(8);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(4);

	var _reactRouter = __webpack_require__(2);

	var _reactDocumentTitle = __webpack_require__(79);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _content = __webpack_require__(80);

	var _content2 = _interopRequireDefault(_content);

	var _Step = __webpack_require__(112);

	var _Step2 = _interopRequireDefault(_Step);

	var _paths = __webpack_require__(5);

	var _Breadcrumbs = __webpack_require__(113);

	var _Continue = __webpack_require__(16);

	var _Spinner = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function next(currentStepId, step, db, moduleOrder) {
		var currentModuleId = step.get('module');
		var module = db.getIn(['modules', currentModuleId.toString()]);
		var currentStepIndex = module.get('steps').indexOf(currentStepId);
		var finalStepInModule = currentStepIndex === module.get('steps').size - 1;
		var nextStepId = undefined;
		if (finalStepInModule) {
			var currentModuleIndex = moduleOrder.indexOf(currentModuleId);
			var isFinalModule = currentModuleIndex === moduleOrder.size - 1;
			if (isFinalModule) {
				return '/the-end';
			}
			var nextModuleId = moduleOrder.get(currentModuleIndex + 1);
			var nextModule = db.get('modules').get(nextModuleId);
			nextStepId = nextModule.getIn(['steps', 0]);
		} else {
			nextStepId = module.getIn(['steps', currentStepIndex + 1]);
		}
		return '/step/' + nextStepId;
	}

	function getStep(db, stepName) {
		var step = db.getIn(['steps', stepName]);

		if (!step) {
			var err = new Error('No step with branch name ' + stepName);
			err.status = 404;
			throw err;
		}

		return step;
	}

	var Step = exports.Step = _react2.default.createClass({
		displayName: 'Step',
		postVisit: function postVisit(stepName) {
			var token = this.props.token;

			var path = _paths.BASE_PATH + _paths.Paths.ADD_VISIT[1](stepName, token);
			(0, _isomorphicFetch2.default)(path, { method: 'POST' });
		},
		componentDidMount: function componentDidMount() {
			this.postVisit(this.props.params.stepName);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.params.stepName !== this.props.stepName) {
				this.postVisit(nextProps.params.stepName);
			}
		},
		render: function render() {
			if (!this.props.token) {
				return null;
			}

			var _props = this.props;
			var db = _props.db;
			var stepName = _props.params.stepName;

			var moduleOrder = db.get('moduleOrder');

			var step = getStep(db, stepName);

			var StepContent = _content2.default[stepName][this.props.os];

			var statusLink = null;

			if (step.get('success')) {
				var nextUrl = next(stepName, step, db, moduleOrder);
				statusLink = _react2.default.createElement(
					_Continue.Continue,
					null,
					'You did it!',
					' ',
					_react2.default.createElement(
						_reactRouter.Link,
						{ className: _Step2.default.link, href: nextUrl, to: nextUrl },
						'Move on to the next step.'
					)
				);
			} else if (step.get('failure')) {
				statusLink = _react2.default.createElement(
					'div',
					{ className: _Step2.default.failure },
					_react2.default.createElement(
						'p',
						null,
						'Oops. Looks like something went wrong.'
					),
					_react2.default.createElement(
						'p',
						null,
						step.get('failure')
					)
				);
			} else if (step.get('commit')) {
				statusLink = _react2.default.createElement(
					'div',
					{ className: _Step2.default.loading },
					_react2.default.createElement(_Spinner.Spinner, null),
					' ',
					'We got your code and we\'re running some tests.'
				);
			}

			var steps = db.getIn(['modules', 'html', 'steps']).map(function (step) {
				return db.getIn(['steps', step]);
			});

			return _react2.default.createElement(
				_reactDocumentTitle2.default,
				{ title: 'HTML Tutorial - ' + step.get('name') },
				_react2.default.createElement(
					'div',
					{ className: _Step2.default.step },
					_react2.default.createElement(
						'h2',
						{ className: _Step2.default.stepName },
						step.get('name'),
						'!'
					),
					_react2.default.createElement(
						'div',
						{ className: _Step2.default.stepWrapper },
						_react2.default.createElement(StepContent, (0, _extends3.default)({}, this.props, { stepName: stepName, step: step, statusLink: statusLink }))
					),
					_react2.default.createElement(_Breadcrumbs.Breadcrumbs, { steps: steps, active: stepName })
				)
			);
		}
	});

	function mapStateToProps(state) {
		var user = state.user;
		var db = state.db;
		var env = state.env;
		var ui = state.ui;

		return {
			repoName: user.get('repoName'),
			token: user.get('token'),
			login: user.get('login'),
			email: user.get('email'),
			db: db,
			moduleOrder: db.get('moduleOrder'),
			SERVER_DOMAIN: env.get('SERVER_DOMAIN'),
			os: ui.get('os')
		};
	}

	var StepContainer = exports.StepContainer = (0, _reactRedux.connect)(mapStateToProps)(Step);

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("react-document-title");

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getIterator2 = __webpack_require__(81);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _files = __webpack_require__(89);

	var _files2 = _interopRequireDefault(_files);

	var _lodash = __webpack_require__(90);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapping = {};

	var blacklist = ['.', '..', 'index.js'];

	var difference = _lodash2.default.difference(_files2.default, blacklist);

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = (0, _getIterator3.default)(difference), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var dir = _step.value;

			var _require = __webpack_require__(91)("./" + dir + '/content');

			var Mac = _require.Mac;
			var Win = _require.Win;

			mapping[dir] = { Mac: Mac, Win: Win };
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	__webpack_require__(47);
	module.exports = __webpack_require__(88);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	var Iterators = __webpack_require__(57);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(85)
	  , step             = __webpack_require__(86)
	  , Iterators        = __webpack_require__(57)
	  , toIObject        = __webpack_require__(87);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(50)(Array, 'Array', function(iterated, kind){
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
/* 85 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(31)
	  , defined = __webpack_require__(30);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(65)
	  , get      = __webpack_require__(69);
	module.exports = __webpack_require__(25).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ["body-tag", "empty-html-page", "head-tag", "html-from-scratch", "images", "index.js", "inline-tags", "links", "lists", "more-content", "self-closing-tags"];

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./body-tag/content": 92,
		"./empty-html-page/content": 100,
		"./environment-setup/content": 118,
		"./head-tag/content": 102,
		"./html-from-scratch/content": 93,
		"./images/content": 103,
		"./inline-tags/content": 107,
		"./links/content": 104,
		"./lists/content": 108,
		"./more-content/content": 109,
		"./self-closing-tags/content": 111
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
	webpackContext.id = 91;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = exports.PARAGRAPH = exports.HEADER = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _content = __webpack_require__(93);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _FakePage = __webpack_require__(98);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HEADER = exports.HEADER = 'Interesting Penguin Facts';

	var PARAGRAPH = exports.PARAGRAPH = 'In some species, it is the male penguin which incubates the eggs\n\t\t\twhile females leave to hunt for weeks at a time.\n\t\t\tBecause of this, pudgy males - with enough fat storage to survive weeks without eating -\n\t\t\tare most desirable.';

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Add a head, body, h1, and p to our penguin page" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Now that you\'ve created an empty HTML page, let\'s fill it in a bit. Our HTML page is going to teach people a little bit about penguins. Before we start coding more, let\'s create a new branch.'
					),
					_react2.default.createElement(
						'p',
						null,
						'First, add a ',
						_react2.default.createElement(
							'code',
							null,
							'head'
						),
						' tag and a ',
						_react2.default.createElement(
							'code',
							null,
							'body'
						),
						' tag inside your ',
						_react2.default.createElement(
							'code',
							null,
							'html'
						),
						' tags in ',
						_content.FILENAME,
						'. Your HTML document will look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body></body>\n</html>'
					),
					_react2.default.createElement(
						'p',
						null,
						'You\'ll notice that every time we put a tag inside another tag, we indent it. That\'s a good practice to follow, because it makes it easier to read.'
					),
					_react2.default.createElement(
						'p',
						null,
						'The ',
						_react2.default.createElement(
							'code',
							null,
							'head'
						),
						' tag is where all of the data about the page lives. We\'re going to mess around with that a little more later.'
					),
					_react2.default.createElement(
						'p',
						null,
						'The ',
						_react2.default.createElement(
							'code',
							null,
							'body'
						),
						' tag is more exciting. This is where you put the stuff you want the user to see. We\'ll add some content to the ',
						_react2.default.createElement(
							'code',
							null,
							'body'
						),
						' tag on the next page.'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/body-tag/header-tags' },
							'Add Some Body Content ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'header-tags' },
					_react2.default.createElement(
						'h4',
						null,
						'Header Tags'
					),
					_react2.default.createElement(
						'p',
						null,
						'Let\'s start by adding a header to the page. Put an ',
						_react2.default.createElement(
							'code',
							null,
							'h1'
						),
						' tag inside your body tag, with the content "',
						HEADER,
						'". Your HTML document will look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + HEADER + '</h1>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/body-tag/paragraph-tags' },
							'Add a Paragraph ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'paragraph-tags' },
					_react2.default.createElement(
						'h4',
						null,
						'Paragraph Tags'
					),
					_react2.default.createElement(
						'p',
						null,
						'Nicely done. Now, add some paragraph content.',
						_react2.default.createElement(
							'strong',
							null,
							' After'
						),
						' the ',
						_react2.default.createElement(
							'code',
							null,
							'h1'
						),
						' tag,',
						_react2.default.createElement(
							'strong',
							null,
							' inside'
						),
						' the ',
						_react2.default.createElement(
							'code',
							null,
							'body'
						),
						' tag, add a ',
						_react2.default.createElement(
							'code',
							null,
							'p'
						),
						' tag with the content "',
						PARAGRAPH,
						'"'
					),
					_react2.default.createElement(
						'p',
						null,
						'Your HTML document will look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + HEADER + '</h1>\n\t\t<p>\n\t\t\t' + PARAGRAPH + '\n\t\t</p>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/body-tag/submit-your-html' },
							'Submit Your Code ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'submit-your-html' },
					_react2.default.createElement(
						'h4',
						null,
						'Submit Your Code!'
					),
					_react2.default.createElement(
						'p',
						null,
						'First, take a look at your handiwork in a browser!'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'open ',
						_content.FILENAME
					),
					_react2.default.createElement(
						'p',
						null,
						'It should look like this:'
					),
					_react2.default.createElement(
						_FakePage.FakePage,
						null,
						_react2.default.createElement(
							'h1',
							null,
							HEADER
						),
						_react2.default.createElement(
							'p',
							null,
							PARAGRAPH
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'Cool! To move on to the next step, just push this code up to our shared repository:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = exports.FILENAME = exports.DOCTYPE = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _Sidebar = __webpack_require__(95);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	var _index = __webpack_require__(97);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DOCTYPE = exports.DOCTYPE = '<!DOCTYPE html>';
	var FILENAME = exports.FILENAME = _index2.default.fileName;

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');

			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Create a new, empty HTML file" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Cool! Now that you\'ve copy-pasted your first HTML page, let\'s try building an HTML page from scratch.'
					),
					_react2.default.createElement(
						'p',
						null,
						'HTML is made up of a bunch of ',
						_react2.default.createElement(
							'strong',
							null,
							'tags'
						),
						'. A tag looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<tagName>content</tagName>'
					),
					_react2.default.createElement(
						'p',
						null,
						'Here are a couple of examples:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<h1>My Title</h1>'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'code',
							null,
							'h1'
						),
						' tags create ',
						_react2.default.createElement(
							'strong',
							null,
							'headers'
						),
						'.'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<html></html>'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'code',
							null,
							'html'
						),
						' tags mark the beginning and end of an ',
						_react2.default.createElement(
							'strong',
							null,
							'HTML page'
						),
						'.'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<p>My paragraph content.</p>'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'code',
							null,
							'p'
						),
						' tags create new ',
						_react2.default.createElement(
							'strong',
							null,
							'paragraphs'
						),
						'.'
					),
					_react2.default.createElement(
						'p',
						null,
						'At the beginning of any HTML Document, you\'ll see a DOCTYPE Declaration. It looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						DOCTYPE
					),
					_react2.default.createElement(
						'p',
						null,
						'This DOCTYPE declaration is just a way of telling the browser: "Hey! I\'m about to send you an HTML document, so I want you to render what I\'m about to send you as HTML."'
					),
					_react2.default.createElement(
						_Sidebar.Sidebar,
						null,
						_react2.default.createElement(
							'code',
							null,
							DOCTYPE
						),
						' actually means "This is an HTML',
						_react2.default.createElement(
							'strong',
							null,
							'5'
						),
						' document." There are lots of versions of the HTML language. HTML5 is the latest one. There\'s also HTML 1.1, HTML 2.0, HTML 3.0, and XHTML (also known as HTML 4.01). All of those different versions have different, sometimes counterintuitive, doctypes. But we\'re only going to use the latest and greatest. So for now, just know that the DOCTYPE for HTML5 is ',
						_react2.default.createElement(
							'code',
							null,
							DOCTYPE
						)
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/html-from-scratch/doctypes-and-html-tags' },
							'Click Here to Put It Into Action ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'doctypes-and-html-tags' },
					_react2.default.createElement(
						'p',
						null,
						'First, create a new HTML document called ',
						_react2.default.createElement(
							'code',
							null,
							FILENAME
						),
						' and open it up in Sublime Text:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'touch ',
						FILENAME,
						' && subl ',
						FILENAME
					),
					_react2.default.createElement(
						'p',
						null,
						'Add a DOCTYPE to the top of your document on line 1. Then add opening and closing ',
						_react2.default.createElement(
							'code',
							null,
							'html'
						),
						' tags on line 2. Your HTML document should look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						DOCTYPE + '\n<html></html>'
					),
					_react2.default.createElement(
						'p',
						null,
						'When you\'re done, save your HTML page and send it to our shared repository.'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					_react2.default.createElement(
						'p',
						null,
						'Then you can move on to the next step, where we\'ll add some content to our new HTML page.'
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Html = undefined;

	var _extends2 = __webpack_require__(19);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Code = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Html = exports.Html = _react2.default.createClass({
		displayName: 'Html',
		render: function render() {
			return _react2.default.createElement(
				_Code.Code,
				(0, _extends3.default)({ className: 'html' }, this.props),
				this.props.children
			);
		}
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Sidebar = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Sidebar = __webpack_require__(96);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Sidebar = exports.Sidebar = _react2.default.createClass({
		displayName: 'Sidebar',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _Sidebar2.default.sidebar },
				_react2.default.createElement(
					'h5',
					{ className: _Sidebar2.default.header },
					'In Case You Were Interested...'
				),
				this.props.children
			);
		}
	});

/***/ },
/* 96 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header":"_2xRyoGXS-rsnw0Zaawh8n9","sidebar":"_346GH_9gaXt9m7RhMLyuL3"};

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		branchName: 'html-from-scratch',
		name: 'HTML From Scratch',
		fileName: 'html-from-scratch.html'
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FakePage = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FakePage = __webpack_require__(99);

	var _FakePage2 = _interopRequireDefault(_FakePage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FakePage = exports.FakePage = _react2.default.createClass({
		displayName: 'FakePage',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _FakePage2.default.fakePage },
				this.props.children
			);
		}
	});

/***/ },
/* 99 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fakePage":"_2IluVlSeJuJmUQaNHsudDn"};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = undefined;

	var _extends2 = __webpack_require__(19);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(11);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _reactRedux = __webpack_require__(4);

	var _classnames = __webpack_require__(38);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _actionCreators = __webpack_require__(6);

	var _Html = __webpack_require__(94);

	var _Carousel = __webpack_require__(15);

	var _FakePage = __webpack_require__(98);

	var _Bash = __webpack_require__(37);

	var _CopyButton = __webpack_require__(43);

	var _Continue = __webpack_require__(16);

	var _Keyboard = __webpack_require__(35);

	var _Sidebar = __webpack_require__(95);

	var _Troubleshooting = __webpack_require__(101);

	var _Troubleshooting2 = _interopRequireDefault(_Troubleshooting);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function instruction(fileContents) {
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
				'To tell a browser to render a file as HTML, just give it a ',
				_react2.default.createElement(
					'strong',
					null,
					'.html'
				),
				' extension.'
			),
			_react2.default.createElement(
				'p',
				null,
				'For example, if you write the following HTML into a file with a ',
				_react2.default.createElement(
					'strong',
					null,
					'.html'
				),
				' extension:'
			),
			_react2.default.createElement(
				_Html.Html,
				{ copy: true },
				fileContents
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

	var Troubleshooting = _react2.default.createClass({
		displayName: 'Troubleshooting',
		render: function render() {
			var _this = this;

			var classNames = (0, _classnames2.default)((0, _defineProperty3.default)({}, _Troubleshooting2.default.closed, !this.props.isOpen));

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					{ className: _Troubleshooting2.default.help, onClick: function onClick() {
							return _this.onClick();
						} },
					'Help! I got an error!'
				),
				_react2.default.createElement(
					'div',
					{ className: classNames },
					this.props.children
				)
			);
		},
		onClick: function onClick() {
			this.props.toggle(this.props.keyName, !this.props.isOpen);
		}
	});

	var Tip = _react2.default.createClass({
		displayName: 'Tip',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _Troubleshooting2.default.tip },
				this.props.children
			);
		}
	});

	function mapDispatchToProps(dispatch) {
		return {
			toggle: function toggle(key, isOpen) {
				return dispatch((0, _actionCreators.toggleTroubleshooting)(key, isOpen));
			}
		};
	}

	function mapStateToProps(state) {
		return {
			troubleshootingKey: state.ui.get('troubleshootingKey')
		};
	}

	function mergeProps(stateProps, dispatchProps, ownProps) {
		return (0, _extends3.default)({}, dispatchProps, ownProps, {
			isOpen: stateProps.troubleshootingKey === ownProps.keyName
		});
	}

	Troubleshooting = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(Troubleshooting);

	var ErrorMessage = _react2.default.createClass({
		displayName: 'ErrorMessage',
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _Troubleshooting2.default.errorMessage },
				this.props.children
			);
		}
	});

	function troubleshooting(branchName, shortCommand) {
		return _react2.default.createElement(
			Troubleshooting,
			{ keyName: branchName },
			_react2.default.createElement(
				ErrorMessage,
				null,
				'A branch named \'',
				branchName,
				'\' already exists.'
			),
			_react2.default.createElement(
				Tip,
				null,
				'Don\'t fret. Just run this instead:',
				_react2.default.createElement(
					_Bash.Bash,
					{ copy: true },
					shortCommand
				)
			)
		);
	}

	var Mac = exports.Mac = _react2.default.createClass({
		displayName: 'Mac',
		render: function render() {
			var _props = this.props;
			var repoName = _props.repoName;
			var step = _props.step;

			var fileName = step.get('fileName');
			var fileContents = step.get('fileContents');
			var branchName = step.get('branchName');
			var commands = ['git checkout -b ' + branchName, 'git add .', 'git commit -m "Create my first HTML page"', 'git push -u origin ' + branchName];
			var command = commands.join(' && ');
			var shortCommand = commands.slice(1).join(' && ');

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					instruction(fileContents),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/empty-html-page/create-your-first-webpage' },
							'Click Here to Put It Into Action ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'create-your-first-webpage' },
					_react2.default.createElement(
						'p',
						null,
						'Let\'s create your first HTML page right now! We\'ll start with creating the file, then copy and paste some HTML to create your first webpage! Easy peasy.'
					),
					_react2.default.createElement(
						'h3',
						null,
						'Create the File'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Type the following commands into your terminal'
						),
						'. You won\'t be able to copy and paste the commands - that\'s so you get some practice with typing in the terminal on your own.'
					),
					_react2.default.createElement(
						'p',
						null,
						'This first command just navigates to your repository. (',
						_react2.default.createElement(
							'code',
							null,
							'cd'
						),
						' stands for "change directories.")'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'cd ~/',
						repoName
					),
					_react2.default.createElement(
						'p',
						null,
						'This last command opens up a new file called ',
						fileName,
						' in Sublime Text.'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'subl ',
						fileName
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/empty-html-page/paste-your-first-html' },
							'Click Here to Add Some HTML ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'paste-your-first-html' },
					_react2.default.createElement(
						'h3',
						null,
						'Paste Your First HTML'
					),
					_react2.default.createElement(
						'p',
						null,
						'Now the easy part. :)'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Copy and paste the following HTML'
						),
						' ',
						'into Sublime Text.'
					),
					_react2.default.createElement(
						_Html.Html,
						{ copy: true },
						'<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Your First Webpage!</title>\n\t</head>\n\t<body>\n\t\t<h1>This Is Your First Webpage!</h1>\n\t\t<p>\n\t\t\tThis your very first webpage ever. Congratulations!\n\t\t</p>\n\t\t<p>\n\t\t\tYou deserve to celebrate. Go eat some ice cream or something.\n\t\t\tThen go back to School of Haxx to learn some more about HTML.\n\t\t</p>\n\t</body>\n</html>\t'
					),
					_react2.default.createElement(
						'p',
						null,
						'Press ',
						_react2.default.createElement(
							_Keyboard.Key,
							null,
							'Command'
						),
						' ',
						_react2.default.createElement(
							_Keyboard.Key,
							null,
							'S'
						),
						' to save.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Then, to look at your handiwork in a browser, type this in your terminal and press "enter":'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'open ',
						fileName
					),
					_react2.default.createElement(
						'p',
						null,
						'Check that out. You just created your first webpage! Nicely done.'
					),
					_react2.default.createElement(
						'p',
						null,
						'To move on to the next step, just send your code back to us by copy-pasting the following into the terminal:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink,
					troubleshooting(branchName, shortCommand)
				)
			);
		}
	});

	var Win = exports.Win = _react2.default.createClass({
		displayName: 'Win',
		render: function render() {
			var _props2 = this.props;
			var repoName = _props2.repoName;
			var step = _props2.step;

			var fileContents = step.get('fileContents');
			var fileName = step.get('fileName');
			var branchName = step.get('branchName');
			var repoPath = 'C:\\Users\\<your user name>\\' + repoName;
			var commands = ['git checkout -b ' + branchName, 'git add .', 'git commit -m "Create my first HTML page"', 'git push -u origin ' + branchName];
			var command = commands.join(' && ');
			var shortCommand = commands.slice(1).join(' && ');

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					instruction(fileContents),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/empty-html-page/create-an-html-file' },
							'Click Here to Put It Into Action ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'create-an-html-file' },
					_react2.default.createElement(
						'p',
						null,
						'Let\'s create your first HTML page right now! It\'ll be a simple copy-paste job.'
					),
					_react2.default.createElement(
						'p',
						null,
						'First, ',
						_react2.default.createElement(
							'strong',
							null,
							'open your code folder in Sublime'
						),
						' by selecting File > Open Folder, then selecting ',
						_react2.default.createElement(
							'code',
							null,
							repoPath
						),
						'.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Once you have your folder open, create a new file, then',
						_react2.default.createElement(
							'strong',
							null,
							' ',
							_react2.default.createElement(_CopyButton.CopyButtonContainer, { text: fileContents }),
							' and paste the HTML on',
							' ',
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/step/empty-html-page' },
								'the previous page'
							)
						),
						' ',
						'into your file.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Save your file as ',
						_react2.default.createElement(
							'code',
							null,
							repoPath + '\\' + fileName
						),
						'. To see your handiwork in the browser, open up your File Explorer, then navigate to',
						' ',
						fileName,
						' and double-click it.'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/empty-html-page/submit-your-code' },
							'Click Here to Submit Your Code ->'
						)
					),
					_react2.default.createElement(
						_Sidebar.Sidebar,
						null,
						_react2.default.createElement(
							'ul',
							null,
							_react2.default.createElement(
								'li',
								null,
								'You can create a new file in Sublime Text by pressing ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'Ctrl'
								),
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'N'
								),
								'.'
							),
							_react2.default.createElement(
								'li',
								null,
								'You can paste into Sublime Text with ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'Ctrl'
								),
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'V'
								),
								'.'
							),
							_react2.default.createElement(
								'li',
								null,
								'You can save a file in Sublime with ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'Ctrl'
								),
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'S'
								),
								'.'
							),
							_react2.default.createElement(
								'li',
								null,
								'You can open File Explorer with',
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									_react2.default.createElement('i', { className: 'fa fa-windows' })
								),
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'E'
								),
								'.'
							)
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'submit-your-code' },
					_react2.default.createElement(
						'p',
						null,
						'Check that out. You just created your first webpage! Nicely done. To move on to the next step (and write some HTML from scratch), just',
						' ',
						_react2.default.createElement(_CopyButton.CopyButtonContainer, { text: command + '\n' }),
						' and paste the following into your command prompt:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					_react2.default.createElement(
						_Sidebar.Sidebar,
						null,
						_react2.default.createElement(
							'ul',
							null,
							_react2.default.createElement(
								'li',
								null,
								'You can open your command prompt by typing',
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									_react2.default.createElement('i', { className: 'fa fa-windows' })
								),
								' ',
								_react2.default.createElement(
									_Keyboard.Key,
									null,
									'R'
								),
								', then "CMD".'
							),
							_react2.default.createElement(
								'li',
								null,
								'You can paste into your command prompt by right-clicking.'
							)
						)
					),
					this.props.statusLink,
					troubleshooting(branchName, shortCommand)
				)
			);
		}
	});

/***/ },
/* 101 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"errorMessage":"_3x6KkwE-yj9Ft9oSoBHMaq","help":"_3mhc_NLTtuMmU7BsQ8X3WB","closed":"_-ssM2353v-MrFCjmyoAgm","tip":"_3Ezy5HpluWYfG06IAj0y3D"};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _content = __webpack_require__(92);

	var _content2 = __webpack_require__(93);

	var _Bash = __webpack_require__(37);

	var _Html = __webpack_require__(94);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TITLE = 'Awesome Penguin Facts';

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Give our Penguins page a title" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Right now, if you look up in the tab above the browser window, it just says the filename -',
					_react2.default.createElement(
						'code',
						null,
						' ',
						_content2.FILENAME
					),
					'. We can make it better. If you add a ',
					_react2.default.createElement(
						'code',
						null,
						'title'
					),
					' tag inside your ',
					_react2.default.createElement(
						'code',
						null,
						'head'
					),
					' tag, a nice, pretty title will appear in the tabs sitting on top of your browser.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Add a ',
					_react2.default.createElement(
						'code',
						null,
						'title'
					),
					' tag to your Penguins page between your opening and closing ',
					_react2.default.createElement(
						'code',
						null,
						'head'
					),
					' tags, and give your title some content - "',
					TITLE,
					'", for instance.'
				),
				_react2.default.createElement(
					'p',
					null,
					_content2.FILENAME,
					' should now look like this:'
				),
				_react2.default.createElement(
					_Html.Html,
					{ noSelect: true },
					_content2.DOCTYPE + '\n<html>\n\t<head>\n\t\t<title>' + TITLE + '</title>\n\t</head>\n\t<body>\n\t\t<h1>' + _content.HEADER + '</h1>\n\t\t<p>\n\t\t\t' + _content.PARAGRAPH + '\n\t\t</p>\n\t</body>\n</html>'
				),
				_react2.default.createElement(
					'p',
					null,
					'Refresh your HTML page in your browser or type ',
					_react2.default.createElement(
						'code',
						null,
						'open ',
						_content2.FILENAME
					),
					' again. You should be able to see your awesome penguin title in the tab on top of the browser.'
				),
				_react2.default.createElement(
					'p',
					null,
					'As always, to move on to the next step, just push your new code to the shared respository:'
				),
				_react2.default.createElement(
					_Bash.Bash,
					{ copy: true },
					command
				),
				this.props.statusLink
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = exports.IMG_URL = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _content = __webpack_require__(93);

	var _content2 = __webpack_require__(92);

	var _content3 = __webpack_require__(104);

	var _index = __webpack_require__(106);

	var _index2 = _interopRequireDefault(_index);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _FakePage = __webpack_require__(98);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IMG_URL = exports.IMG_URL = _index2.default.imgUrl;

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Add a picture of a papa penguin" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Your penguin facts page is pretty awesome. It has a nice title, a header and a paragraph, and it tells visitors to your page a super cool and super weird fact about penguins.'
					),
					_react2.default.createElement(
						'p',
						null,
						'But beyond the cool penguin fact, it\'s not very interesting. It would be more interesting if we could show a picture of a penguin, right? Let\'s add one right now.'
					),
					_react2.default.createElement(
						'p',
						null,
						'The ',
						_react2.default.createElement(
							'code',
							null,
							'img'
						),
						' tag allows you to display images to your webpage\'s visitors. Let\'s put the ',
						_react2.default.createElement(
							'code',
							null,
							'img'
						),
						' tag below the paragraph with the link in it:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + _content2.HEADER + '</h1>\n\t\t<p>\n\t\t\t' + _content2.PARAGRAPH + '\n\t\t</p>\n\t\t<p>\n\t\t\t<a href="' + _content3.YOUTUBE_LINK + '">' + _content3.YOUTUBE_TEXT + '</a>\n\t\t</p>\n\t\t<img></img>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/images/img-src-attributes' },
							'Next: Tell the Browser Which Image to Show ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'img-src-attributes' },
					_react2.default.createElement(
						'p',
						null,
						'Our webpage going to display an image quite yet. We need to give our ',
						_react2.default.createElement(
							'code',
							null,
							'img'
						),
						' tag a ',
						_react2.default.createElement(
							'code',
							null,
							'src'
						),
						' attribute so the browser knows which image to show.'
					),
					_react2.default.createElement(
						'p',
						null,
						'We\'re going to point our penguin picture at ',
						_react2.default.createElement(
							'a',
							{ href: IMG_URL },
							IMG_URL
						),
						', which is a super cute picture of a papa penguin incubating an egg.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Add the ',
						_react2.default.createElement(
							'code',
							null,
							'src'
						),
						' attribute to your ',
						_react2.default.createElement(
							'code',
							null,
							'img'
						),
						' tag so your page looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + _content2.HEADER + '</h1>\n\t\t<p>\n\t\t\t' + _content2.PARAGRAPH + '\n\t\t</p>\n\t\t<p>\n\t\t\t<a href="' + _content3.YOUTUBE_LINK + '">' + _content3.YOUTUBE_TEXT + '</a>\n\t\t</p>\n\t\t<img src="' + IMG_URL + '"></img>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/images/submit-your-html' },
							'Next: Submit Your Code ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'submit-your-html' },
					_react2.default.createElement(
						'p',
						null,
						'Now, open up your page in your browser to see your cute new image!'
					),
					_react2.default.createElement(
						_Bash.Bash,
						null,
						'open ',
						_content.FILENAME
					),
					_react2.default.createElement(
						'p',
						null,
						'Your page should look like this now:'
					),
					_react2.default.createElement(
						_FakePage.FakePage,
						null,
						_react2.default.createElement(
							'h1',
							null,
							_content2.HEADER
						),
						_react2.default.createElement(
							'p',
							null,
							_content2.PARAGRAPH
						),
						_react2.default.createElement('img', { src: IMG_URL })
					),
					_react2.default.createElement(
						'p',
						null,
						'As always, to move on to the next step, just push your code to the remote repository.'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = exports.YOUTUBE_TEXT = exports.YOUTUBE_LINK = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _content = __webpack_require__(93);

	var _content2 = __webpack_require__(92);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _Sidebar = __webpack_require__(95);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	var _index = __webpack_require__(105);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GOOGLE_LINK_TEXT = 'Go to Google';
	var GOOGLE_URL = 'http://google.com';
	var YOUTUBE_LINK = exports.YOUTUBE_LINK = _index2.default.youTubeLink;
	var YOUTUBE_TEXT = exports.YOUTUBE_TEXT = _index2.default.youTubeText;
	var COMMIT_MESSAGE = 'Add a link to hear penguin sounds';

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "' + COMMIT_MESSAGE + '" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Now that we have a webpage with a fun fact and an image, let\'s add a link to it so that anyone who wants to learn more about penguins can get more information.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Links are made with an ',
						_react2.default.createElement(
							'code',
							null,
							'a'
						),
						' tag. ',
						_react2.default.createElement(
							'code',
							null,
							'a'
						),
						' stands for "anchor." It\'s kind of a weird name -',
						' ',
						_react2.default.createElement(
							'a',
							{ target: '_blank', href: 'https://www.quora.com/Why-are-they-called-anchor-tags' },
							'here\'s some more info'
						),
						' ',
						'on why they\'re called that.'
					),
					_react2.default.createElement(
						'p',
						null,
						'To specify the URL that you want the link to point to, just provide an ',
						_react2.default.createElement(
							'code',
							null,
							'href'
						),
						' attribute.'
					),
					_react2.default.createElement(
						'p',
						null,
						'An ',
						_react2.default.createElement(
							'strong',
							null,
							'attribute'
						),
						' is an additional piece of information that you provide to a tag. Here\'s what the general pattern looks like:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<tagName attribute="attribute value">content</tagName>'
					),
					_react2.default.createElement(
						'p',
						null,
						'For example, if you wanted to link to ',
						GOOGLE_URL,
						', and you wanted the clickable text to be "',
						GOOGLE_LINK_TEXT,
						'," your link would look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<a href="' + GOOGLE_URL + '">' + GOOGLE_LINK_TEXT + '</a>'
					),
					_react2.default.createElement(
						'p',
						null,
						'If your link looked like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<a href="http://memebase.cheezburger.com/pictureisunrelated">This Picture is Unrelated</a>'
					),
					_react2.default.createElement(
						'p',
						null,
						'The browser would render it like this:',
						' ',
						_react2.default.createElement(
							'a',
							{ target: '_blank', href: 'http://memebase.cheezburger.com/pictureisunrelated' },
							'This Picture is Unrelated'
						)
					),
					_react2.default.createElement(
						_Sidebar.Sidebar,
						null,
						_react2.default.createElement(
							'code',
							null,
							'href'
						),
						' stands for "Hypertext Reference." Hypertext is text that is linked to other text on the web. You can read more about that idea ',
						_react2.default.createElement(
							'a',
							{ target: '_blank', href: 'http://www.w3.org/WhatIs.html' },
							'here'
						),
						'.'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/links/take-action' },
							'Add Your Own Links ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'take-action' },
					_react2.default.createElement(
						'p',
						null,
						'Ready to add a link to your page? Great!'
					),
					_react2.default.createElement(
						'p',
						null,
						'First, put a new paragraph on your page under the paragraph with the fact in it. Inside the new paragraph, add a link to ',
						YOUTUBE_LINK,
						'. It\'s a demonstration of the sound penguins make. Make the clickable text for the link "',
						YOUTUBE_TEXT,
						'"'
					),
					_react2.default.createElement(
						'p',
						null,
						'When you\'re done, ',
						_content.FILENAME,
						' should look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n\t<html>\n\t\t<head></head>\n\t\t<body>\n\t\t\t<h1>' + _content2.HEADER + '</h1>\n\t\t\t<p>\n\t\t\t\t' + _content2.PARAGRAPH + '\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<a href="' + YOUTUBE_LINK + '">' + YOUTUBE_TEXT + '</a>\n\t\t\t</p>\n\t\t</body>\n\t</html>'
					),
					_react2.default.createElement(
						'p',
						null,
						'Cool! Now, open up your webpage in your browser and try clicking on the link:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'open ',
						_content.FILENAME
					),
					_react2.default.createElement(
						'p',
						null,
						'When you\'re done, push your code up to the remote repository to move on to the next step.'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		branchName: 'links',
		name: 'Links',
		youTubeLink: 'https://www.youtube.com/watch?v=RY9FRdl7dq0',
		youTubeText: 'This is the sound a penguin makes.'
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		branchName: 'images',
		name: 'Images',
		imgUrl: 'http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/92893070.jpg'
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = exports.PARAGRAPH_HTML = exports.PARAGRAPH = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _FakePage = __webpack_require__(98);

	var _content = __webpack_require__(93);

	var _content2 = __webpack_require__(92);

	var _content3 = __webpack_require__(104);

	var _content4 = __webpack_require__(103);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var STRONGIFY = 'In some species, it is the <strong>male</strong> penguin which incubates the eggs';

	var STRONGIFY_HTML = _react2.default.createElement(
		'span',
		null,
		'In some species, it is the ',
		_react2.default.createElement(
			'strong',
			null,
			'male'
		),
		' penguin which incubates the eggs'
	);

	var EMIFY = 'pudgy males — with enough fat storage to survive weeks without eating — are <em>most desirable</em>.';

	var EMIFY_HTML = _react2.default.createElement(
		'span',
		null,
		'pudgy males — with enough fat storage to survive weeks without eating — are ',
		_react2.default.createElement(
			'em',
			null,
			'most desirable'
		),
		'.'
	);

	var PARAGRAPH = exports.PARAGRAPH = STRONGIFY + '\n\t\t\twhile females leave to hunt for weeks at a time.\n\t\t\tBecause of this, ' + EMIFY;

	var PARAGRAPH_HTML = exports.PARAGRAPH_HTML = _react2.default.createElement(
		'span',
		null,
		STRONGIFY_HTML,
		' while females leave to hunt for weeks at a time. Because of this, ',
		EMIFY_HTML
	);

	var COMMIT_MESSAGE = 'Add some formatting for extra meaning';

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "' + COMMIT_MESSAGE + '" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Cool. Now that our page has a link on it, let\'s try adding some more tags that give extra meaning to our content.'
					),
					_react2.default.createElement(
						'p',
						null,
						'There are a few ways to tell the browser that one word is more important than the others. The first way is by using ',
						_react2.default.createElement(
							'strong',
							null,
							'strong'
						),
						' tags. A strong tag looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<strong>This is important.</strong>'
					),
					_react2.default.createElement(
						'p',
						null,
						'And your browser will render it with a bold font, like this:'
					),
					_react2.default.createElement(
						'blockquote',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'This is important.'
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'To give one or more words special emphasis, use an ',
						_react2.default.createElement(
							'strong',
							null,
							'em'
						),
						' tag. em tags looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'I\'m kind of serious about these words. <em>But I\'m super emphatic about these words.</em>'
					),
					_react2.default.createElement(
						'p',
						null,
						'Your browser will render em tags with italics, like this:'
					),
					_react2.default.createElement(
						'blockquote',
						null,
						'I\'m kind of serious about these words. ',
						_react2.default.createElement(
							'em',
							null,
							'But I\'m super emphatic about these words.'
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'To indicate text that has been deleted, you can use a ',
						_react2.default.createElement(
							'strong',
							null,
							'del'
						),
						' tag.'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'This text is <del>stupid</del> awesome.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Your browser will render del tags with the text crossed out, like this: '
					),
					_react2.default.createElement(
						'blockquote',
						null,
						'This text is ',
						_react2.default.createElement(
							'del',
							null,
							'stupid'
						),
						' awesome.'
					),
					_react2.default.createElement(
						'p',
						null,
						'To show text that should be highlighted, use a ',
						_react2.default.createElement(
							'strong',
							null,
							'mark'
						),
						' tag.'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'Let me highlight a new product of ours: <mark>The Gerbonkulator!</mark>'
					),
					_react2.default.createElement(
						'blockquote',
						null,
						'Let me highlight a new product of ours: ',
						_react2.default.createElement(
							'mark',
							null,
							'The Gerbonkulator!'
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'If you want to use subscripted text, just use a ',
						_react2.default.createElement(
							'strong',
							null,
							'sub'
						),
						' tag:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'H<sub>2</sub>O'
					),
					_react2.default.createElement(
						'blockquote',
						null,
						'H',
						_react2.default.createElement(
							'sub',
							null,
							'2'
						),
						'O'
					),
					_react2.default.createElement(
						'p',
						null,
						'For superscripted text, use a ',
						_react2.default.createElement(
							'strong',
							null,
							'sup'
						),
						' tag:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'E = MC<sup>2</sup>'
					),
					_react2.default.createElement(
						'blockquote',
						null,
						'E = MC',
						_react2.default.createElement(
							'sup',
							null,
							'2'
						)
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/inline-tags/try-it-out' },
							'Next: Try It Out ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'try-it-out' },
					_react2.default.createElement(
						'p',
						null,
						'To move on to the next step, let\'s just add a little extra formatting to our penguins page. First, ',
						_react2.default.createElement(
							'strong',
							null,
							'add some strong tags'
						),
						' around the word "male", like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						STRONGIFY
					),
					_react2.default.createElement(
						'p',
						null,
						'And ',
						_react2.default.createElement(
							'strong',
							null,
							'add some em tags'
						),
						' around the words "most desirable":'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						EMIFY
					),
					_react2.default.createElement(
						'p',
						null,
						'Now your whole document should look like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + _content2.HEADER + '</h1>\n\t\t<p>\n\t\t\t' + PARAGRAPH + '\n\t\t</p>\n\t\t<p>\n\t\t\t<a href="' + _content3.YOUTUBE_LINK + '">' + _content3.YOUTUBE_TEXT + '</a>\n\t\t</p>\n\t\t<img src="' + _content4.IMG_URL + '"></img>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						'p',
						null,
						'Now, open up ',
						_content.FILENAME,
						' in your browser (if you already have it open, you can just refresh the page):'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ noSelect: true },
						'open ',
						_content.FILENAME
					),
					_react2.default.createElement(
						'p',
						null,
						'Your browser should render it like this:'
					),
					_react2.default.createElement(
						_FakePage.FakePage,
						null,
						_react2.default.createElement(
							'h1',
							null,
							_content2.HEADER
						),
						_react2.default.createElement(
							'p',
							null,
							PARAGRAPH_HTML
						),
						_react2.default.createElement(
							'p',
							null,
							_react2.default.createElement(
								'a',
								{ href: _content3.YOUTUBE_LINK },
								_content3.YOUTUBE_TEXT
							)
						),
						_react2.default.createElement('img', { src: _content4.IMG_URL })
					),
					_react2.default.createElement(
						'p',
						null,
						'To wrap up, just push your HTML code up to our shared GitHub repository:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	var _content = __webpack_require__(93);

	var _content2 = __webpack_require__(104);

	var _content3 = __webpack_require__(103);

	var _content4 = __webpack_require__(92);

	var _content5 = __webpack_require__(107);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Add more penguin facts." && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Our penguin webpage is pretty awesome, but it only has one fact on it so far. Wouldn\'t it be nice to add some more?'
					),
					_react2.default.createElement(
						'p',
						null,
						'This sounds like a good job for a ',
						_react2.default.createElement(
							'strong',
							null,
							'list'
						),
						'! HTML contains three different kinds of lists. Let\'s explore them now.'
					),
					_react2.default.createElement(
						'h4',
						null,
						'Ordered Lists'
					),
					_react2.default.createElement(
						'p',
						null,
						'Ordered lists are lists that have a particular order. Like my top five favorite ice creams. Those definitely go in a particular order. Cookie dough is #1. Mint chocolate chip is pretty great, but I don\'t want there to be any doubt in anyone\'s minds that cookie dough is the all-time fave. No contest. Let\'s be clear. Cookie dough\'s the best.'
					),
					_react2.default.createElement(
						'p',
						null,
						'So, because I want my favorite ice creams clearly ordered, I\'ll use an ordered list. To create an ordered list, you create an ',
						_react2.default.createElement(
							'strong',
							null,
							'ol'
						),
						' tag. Then, for each item in the list, add an ',
						_react2.default.createElement(
							'strong',
							null,
							'li'
						),
						' tag (stands for "list item") with the item as content.'
					),
					_react2.default.createElement(
						'p',
						null,
						'This list of (very clearly ordered) list items should give you some idea:'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<ol>\n\t<li>Chocolate Chip Cookie Dough</li>\n\t<li>Mint Chocolate Chip</li>\n\t<li>Ben and Jerry\'s Milk and Cookies</li>\n\t<li>Rocky Road</li>\n\t<li>Cherry Cordial</li>\n</ol>'
					),
					_react2.default.createElement(
						'p',
						null,
						'A browser will render our ice cream flavors list like this:'
					),
					_react2.default.createElement(
						'ol',
						null,
						_react2.default.createElement(
							'li',
							null,
							'Chocolate Chip Cookie Dough'
						),
						_react2.default.createElement(
							'li',
							null,
							'Mint Chocolate Chip'
						),
						_react2.default.createElement(
							'li',
							null,
							'Ben and Jerry\'s Milk and Cookies'
						),
						_react2.default.createElement(
							'li',
							null,
							'Rocky Road'
						),
						_react2.default.createElement(
							'li',
							null,
							'Cherry Cordial'
						)
					),
					_react2.default.createElement(
						'h4',
						null,
						'Unordered Lists'
					),
					_react2.default.createElement(
						'p',
						null,
						'Some lists don\'t need to go in any particular order. Like a list of famous libraries. One isn\'t necessarily more famous than the other. So it\'s okay if we just use bullet points instead of numbers in our list.'
					),
					_react2.default.createElement(
						'p',
						null,
						'An unordered list has a ',
						_react2.default.createElement(
							'strong',
							null,
							'ul'
						),
						' tag on the outside, and one or more ',
						_react2.default.createElement(
							'strong',
							null,
							'li'
						),
						' tags on the inside. It\'s basically the same as an ordered list, except it uses a ',
						_react2.default.createElement(
							'code',
							null,
							'ul'
						),
						' tag instead of an ',
						_react2.default.createElement(
							'code',
							null,
							'ol'
						),
						' tag.'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<ul>\n\t<li>Bibliotheca Alexandrina</li>\n\t<li>The Library of Congress</li>\n\t<li>National Library of Spain</li>\n\t<li>Stadtbibliothek Stuttgart</li>\n\t<li>New York Public Library for the Performing Arts</li>\n</ul>'
					),
					_react2.default.createElement(
						'p',
						null,
						'A browser will render our unordered list of libraries like this:'
					),
					_react2.default.createElement(
						'ul',
						null,
						_react2.default.createElement(
							'li',
							null,
							'Bibliotheca Alexandrina'
						),
						_react2.default.createElement(
							'li',
							null,
							'The Library of Congress'
						),
						_react2.default.createElement(
							'li',
							null,
							'National Library of Spain'
						),
						_react2.default.createElement(
							'li',
							null,
							'Stadtbibliothek Stuttgart'
						),
						_react2.default.createElement(
							'li',
							null,
							'New York Public Library for the Performing Arts'
						)
					),
					_react2.default.createElement(
						'h4',
						null,
						'Dictionary Lists'
					),
					_react2.default.createElement(
						'p',
						null,
						'Dictionary lists are really good for pairing up terms and definitions, or labels and values. Basically, it\'s good for things that come in pairs.'
					),
					_react2.default.createElement(
						'p',
						null,
						'To create a dictionary list, create a ',
						_react2.default.createElement(
							'strong',
							null,
							'dl'
						),
						' tag. In between your opening and closing ',
						_react2.default.createElement(
							'code',
							null,
							'dl'
						),
						' tag, you can add one or more',
						_react2.default.createElement(
							'strong',
							null,
							'dt'
						),
						' (dictionary term) tags, along with one or more',
						_react2.default.createElement(
							'strong',
							null,
							'dd'
						),
						' (dictionary definition) tags. Here\'s an example of a "Glossary of Weird Words":'
					),
					_react2.default.createElement(
						_Html.Html,
						null,
						'<dl>\n\t<dt>absquatulate</dt>\n\t<dd>flee, make off; abscond.</dd>\n\t<dt>bezonian</dt>\n\t<dd>a scoundrel.</dd>\n\t<dt>callipygian</dt>\n\t<dd>having shapely buttocks.</dd>\n\t<dt>dandle</dt>\n\t<dd>to dance (a child) on one\'s knees.</dd>\n\t<dt>edacious</dt>\n\t<dd>devouring, consuming, voracious.</dd>\n</dl>'
					),
					_react2.default.createElement(
						'p',
						null,
						'The browser would render our glossary like this:'
					),
					_react2.default.createElement(
						'dl',
						null,
						_react2.default.createElement(
							'dt',
							null,
							'absquatulate'
						),
						_react2.default.createElement(
							'dd',
							null,
							'flee, make off; abscond.'
						),
						_react2.default.createElement(
							'dt',
							null,
							'bezonian'
						),
						_react2.default.createElement(
							'dd',
							null,
							'a scoundrel.'
						),
						_react2.default.createElement(
							'dt',
							null,
							'callipygian'
						),
						_react2.default.createElement(
							'dd',
							null,
							'having shapely buttocks.'
						),
						_react2.default.createElement(
							'dt',
							null,
							'dandle'
						),
						_react2.default.createElement(
							'dd',
							null,
							'to dance (a child) on one\'s knees.'
						),
						_react2.default.createElement(
							'dt',
							null,
							'edacious'
						),
						_react2.default.createElement(
							'dd',
							null,
							'devouring, consuming, voracious.'
						)
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/lists/try-it-out' },
							'Next: Try It Out ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'try-it-out' },
					_react2.default.createElement(
						'h4',
						null,
						'Try It Out'
					),
					_react2.default.createElement(
						'p',
						null,
						'Let\'s add some more facts and a glossary to our penguins page.'
					),
					_react2.default.createElement(
						'p',
						null,
						'In ',
						_content.FILENAME,
						', beneath your fact paragraph, add an unordered list tag, with a single ',
						_react2.default.createElement(
							'code',
							null,
							'li'
						),
						' inside, so that your page looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + _content4.HEADER + '</h1>\n\t\t<p>\n\t\t\t' + _content5.PARAGRAPH + '\n\t\t</p>\n\t\t<ul><li></li></ul>\n\t\t<p>\n\t\t\t<a href="' + _content2.YOUTUBE_LINK + '">' + _content2.YOUTUBE_TEXT + '</a>\n\t\t</p>\n\t\t<img src="' + _content3.IMG_URL + '"></img>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						'p',
						null,
						'Then, move the contents of your paragraph into the ',
						_react2.default.createElement(
							'code',
							null,
							'li'
						),
						' tag. You\'ll probably want to add a line break between your ',
						_react2.default.createElement(
							'code',
							null,
							'li'
						),
						' tag and your ',
						_react2.default.createElement(
							'code',
							null,
							'ul'
						),
						' tag. Then delete the ',
						_react2.default.createElement(
							'code',
							null,
							'p'
						),
						' tag where the fact used to be. Now that we have a list with some content, let\'s add some more list items. Here are some penguins facts for you to add:'
					),
					_react2.default.createElement(
						'ul',
						null,
						_react2.default.createElement(
							'li',
							null,
							'In the 16th century, the word penguin actually referred to Great Auks, a now-extinct species that inhabited the seas around eastern Canada.'
						),
						_react2.default.createElement(
							'li',
							null,
							'Penguins survive because their feathers trap a layer of warm air next to the skin that serves as insulation.'
						),
						_react2.default.createElement(
							'li',
							null,
							'Because they aren\'t used to danger from animals on solid ground, wild penguins exhibit no particular fear of human tourists.'
						),
						_react2.default.createElement(
							'li',
							null,
							'Penguins evolved to stay in the Southern Hemisphere because there are no land predators, like wolves or polar bears.'
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'When you\'re done adding facts, ',
						_content.FILENAME,
						' should look something like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						_content.DOCTYPE + '\n<html>\n\t<head></head>\n\t<body>\n\t\t<h1>' + _content4.HEADER + '</h1>\n\t\t<ul>\n\t\t\t<li>\n\t\t\t\t' + _content5.PARAGRAPH + '\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\tIn the 16th century, the word penguin actually referred to Great Auks, \n\t\t\t\ta now-extinct species that inhabited the seas around eastern Canada.\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\tPenguins survive because their feathers trap a layer of warm air \n\t\t\t\tnext to the skin that serves as insulation.\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\tBecause they aren\'t used to danger from animals on solid ground, \n\t\t\t\twild penguins exhibit no particular fear of human tourists.\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\tPenguins evolved to stay in the Southern Hemisphere \n\t\t\t\tbecause there are no land predators, like wolves or polar bears.\n\t\t\t</li>\n\t\t</ul>\n\t\t<p>\n\t\t\t<a href="' + _content2.YOUTUBE_LINK + '">' + _content2.YOUTUBE_TEXT + '</a>\n\t\t</p>\n\t\t<img src="' + _content3.IMG_URL + '"></img>\n\t</body>\n</html>'
					),
					_react2.default.createElement(
						'p',
						null,
						'Check that stuff out in a browser to make sure everything looks good, then push your code to your remote repository.'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _content = __webpack_require__(110);

	var _content2 = _interopRequireDefault(_content);

	var _Html = __webpack_require__(94);

	var _FakePage = __webpack_require__(98);

	var _Bash = __webpack_require__(37);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var POEM = '\nRoses are red,\nThe ocean is blue.\nI love penguins\n\tAnd so should you.';

	var tabbedPoem = POEM.split('\n').map(function (str) {
		return '\t\t\t' + str;
	}).join('\n');

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Add a beautiful penguin poem" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'p',
						null,
						'Our penguin page is getting pretty awesome. So far, it\'s kind of scientific, though. Can we make it a little more soulful and artistic? I think we can! By adding a poem about penguins!'
					),
					_react2.default.createElement(
						'p',
						null,
						'(Okay. I know that this is kind of a weird idea. But just bear with me.)'
					),
					_react2.default.createElement(
						'p',
						{ className: _content2.default.noMarginBottom },
						'Here\'s the poem we want to add:'
					),
					_react2.default.createElement(
						'pre',
						{ className: _content2.default.pre },
						POEM
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/more-content/div-tags' },
							'Next: Put Your Poem in a Div ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'div-tags' },
					_react2.default.createElement(
						'p',
						null,
						'This poem doesn\'t really belong in a conventional paragraph, so let\'s try out another useful tag - ',
						_react2.default.createElement(
							'strong',
							null,
							'div'
						),
						'. Divs are for creating arbitrary ',
						_react2.default.createElement(
							'strong',
							null,
							'div'
						),
						'isions, or separate sections, on a page.'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Add a',
							_react2.default.createElement(
								'code',
								null,
								' div '
							),
							'tag at the bottom of the body and copy-paste the poem'
						),
						' ',
						'in there, like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						'(...the rest of your content is up here...)\n\t\t<div>' + tabbedPoem + '\n\t\t</div>\n\t</body>\n</html>\n\t\t\t\t'
					),
					_react2.default.createElement(
						'p',
						null,
						'That should work great, right? Well, open up your webpage in a browser, and you\'ll see it looks like this:'
					),
					_react2.default.createElement(
						_FakePage.FakePage,
						null,
						POEM
					),
					_react2.default.createElement(
						'h3',
						null,
						'Where are the line breaks? What went wrong?'
					),
					_react2.default.createElement(
						'p',
						null,
						'Well, most of the time, the browser will ignore any multi-spaces you have in your code. That includes new lines, tabs, and really any time you have more than one space between words. It might seem a little annoying at first, but actually it helps a lot: it allows you to put line breaks in your HTML, to make it more readable, while still maintaining a nice, smooth, line-breakless image in the rendered content.'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/more-content/pre-tags' },
							'Next: Pre Tags to the Rescue ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'pre-tags' },
					_react2.default.createElement(
						'p',
						null,
						'Sometimes, like when publishing a poem, you want all of the line breaks to show, right? Well, fear not - here comes the ',
						_react2.default.createElement(
							'strong',
							null,
							'pre'
						),
						' tag to the rescue. The ',
						_react2.default.createElement(
							'code',
							null,
							'pre'
						),
						' tag (short for "pre-formatted") displays your code exactly as your wrote it, with all the line breaks intact.'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Exchange your ',
							_react2.default.createElement(
								'code',
								null,
								'div'
							),
							' tag for a ',
							_react2.default.createElement(
								'code',
								null,
								'pre'
							),
							' tag'
						),
						', so your document looks like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						'(...the rest of your content is up here...)\n\t\t<pre>' + tabbedPoem + '\n\t\t</pre>\n\t</body>\n</html>\n\t\t\t\t'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/more-content/pre-tags-and-tabs' },
							'Next: It Doesn\'t Look Quite Right ->'
						)
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'pre-tags-and-tabs' },
					_react2.default.createElement(
						'p',
						null,
						'Cool! So your poem will now look like this:'
					),
					_react2.default.createElement(
						_FakePage.FakePage,
						null,
						_react2.default.createElement(
							'pre',
							null,
							tabbedPoem
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'That\'s almost what we want, except now it\'s way over in the middle of the page. We want it aligned with the left side of the page. That\'s kind of the catch with ',
						_react2.default.createElement(
							'code',
							null,
							'pre'
						),
						' tags: Sometimes it preserves the whitespace in a way you don\'t want, like picking up the indentation you use to make your HTML more readable. So we\'ll need to make the HTML document a little uglier and ',
						_react2.default.createElement(
							'strong',
							null,
							'move all the text for the poem to the left side of the page'
						),
						', like this:'
					),
					_react2.default.createElement(
						_Html.Html,
						{ noSelect: true },
						'(...the rest of your content is up here...)\n\t\t<pre>' + POEM + '\n\t\t</pre>\n\t</body>\n</html>\n\t\t\t\t'
					),
					_react2.default.createElement(
						'p',
						null,
						'Awesome! Now the poem looks like this in the browser:'
					),
					_react2.default.createElement(
						_FakePage.FakePage,
						null,
						_react2.default.createElement(
							'pre',
							null,
							POEM
						)
					),
					_react2.default.createElement(
						'p',
						null,
						'The font looks a little weird, right? You can fix that when you learn about CSS. But for now, we have what we really want, which is a poem with all the line breaks in place.'
					),
					_react2.default.createElement(
						'p',
						null,
						'To move on to the next step, just push your code to the remote repository:'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						command
					),
					this.props.statusLink
				)
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 110 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"pre":"_2UAJDoUI1BJh3PcdVuQjSN","noMarginBottom":"rOmSLTy7TmbCdex73FPx"};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Win = exports.Mac = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Html = __webpack_require__(94);

	var _Bash = __webpack_require__(37);

	var _content = __webpack_require__(103);

	var _Sidebar = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
			var step = this.props.step;

			var branchName = step.get('branchName');
			var command = 'git checkout -b ' + branchName + ' && git add . && git commit -m "Make img tag self-closing" && git push -u origin ' + branchName; // eslint-disable-line max-len

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					'Here\'s a handy trick. If a tag cannot contain any content, then it should be self-closing. A self-closing tag looks like this:'
				),
				_react2.default.createElement(
					_Html.Html,
					null,
					'<tagName attribute="attribute value" />'
				),
				_react2.default.createElement(
					'p',
					null,
					'The only tag we\'ve talked about so far that can be self-closing is the ',
					_react2.default.createElement(
						'code',
						null,
						'img'
					),
					' tag. It wouldn\'t make any sense for an image to have content, right? To finish this step, let\'s make the ',
					_react2.default.createElement(
						'code',
						null,
						'img'
					),
					' tag for our penguin image self closing.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Change the ',
					_react2.default.createElement(
						'code',
						null,
						'img'
					),
					' tag to look like this:'
				),
				_react2.default.createElement(
					_Html.Html,
					{ noSelect: true },
					'<img src="' + _content.IMG_URL + '" />'
				),
				_react2.default.createElement(
					'p',
					null,
					'Easy peasy. Now just push the code to our shared repository:'
				),
				_react2.default.createElement(
					_Bash.Bash,
					{ copy: true },
					command
				),
				_react2.default.createElement(
					_Sidebar.Sidebar,
					null,
					'There are a handful of tags that are self-closing, but the one you\'ll use most often is ',
					_react2.default.createElement(
						'code',
						null,
						'img'
					),
					'. Here\'s a complete list of self-closing tags:',
					_react2.default.createElement(
						'code',
						null,
						' ',
						'area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track,'
					),
					' and ',
					_react2.default.createElement(
						'code',
						null,
						'wbr'
					),
					'.'
				),
				this.props.statusLink
			);
		}
	});

	var Mac = exports.Mac = Content;

	var Win = exports.Win = Content;

	exports.default = Content;

/***/ },
/* 112 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"step":"_3EUDRp4Gbh2gJaXNNiL77J","stepName":"_-Dc2T-t4BUW6c0VXwIhQc","failure":"_3H3NHt_nrEBzhA2yXycXII","loading":"_35mUFerXRakEW3-j-FhRrF","link":"_3iDFD7C_Nq7Tnwh9onG4K7","stepWrapper":"KRqo8M1CHn6hJp0N9H5F5"};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Breadcrumbs = undefined;

	var _defineProperty2 = __webpack_require__(11);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(38);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactRouter = __webpack_require__(2);

	var _Breadcrumbs = __webpack_require__(114);

	var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Breadcrumb = _react2.default.createClass({
		displayName: 'Breadcrumb',
		render: function render() {
			var _props = this.props;
			var step = _props.step;
			var active = _props.active;
			var isLink = _props.isLink;

			var success = step.get('success');
			var successClasses = (0, _classnames2.default)(_Breadcrumbs2.default.breadcrumbSuccess, 'fa', 'fa-check');
			var classNames = (0, _classnames2.default)((0, _defineProperty3.default)({}, _Breadcrumbs2.default.breadcrumbActive, active));
			var content = step.get('name');

			if (isLink) {
				content = _react2.default.createElement(
					_reactRouter.Link,
					{ to: '/step/' + step.get('branchName'), className: _Breadcrumbs2.default.breadcrumbLink },
					success && _react2.default.createElement('i', { className: successClasses }),
					content
				);
			}

			return _react2.default.createElement(
				'li',
				{ className: classNames },
				content
			);
		}
	});

	var Breadcrumbs = exports.Breadcrumbs = _react2.default.createClass({
		displayName: 'Breadcrumbs',
		render: function render() {
			var _props2 = this.props;
			var steps = _props2.steps;
			var active = _props2.active;

			var isLink = true;

			return _react2.default.createElement(
				'ul',
				{ className: _Breadcrumbs2.default.breadcrumbs },
				steps.map(function (step) {
					var makeActive = step.get('branchName') === active;
					var el = _react2.default.createElement(Breadcrumb, {
						key: step.get('branchName'),
						step: step,
						active: makeActive,
						isLink: isLink
					});
					return el;
				})
			);
		}
	});

/***/ },
/* 114 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"breadcrumbs":"_2OcEST2WHM4wxCN7xAq9Uu","breadcrumbSuccess":"_3X1suooN2pxQMNHI8i3S9Q","breadcrumbLink":"oP66V9jhfx_GZeiVJ2SfS","breadcrumbActive":"_8hlSj8sZvyDRzWaY2Gv_6"};

/***/ },
/* 115 */
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
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'That\'s All, Folks!'
				),
				_react2.default.createElement(
					'p',
					null,
					'Thanks for learning about HTML. Now the thing to do is go and create some webpages of your own.'
				),
				_react2.default.createElement(
					'p',
					null,
					'Stay tuned for an expanded tutorial, as well as some new tutorials about cool, code-y things.'
				)
			);
		}
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _App = __webpack_require__(117);

	var _App2 = _interopRequireDefault(_App);

	var _reactDocumentTitle = __webpack_require__(79);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = exports.App = _react2.default.createClass({
		displayName: 'App',

		childContextTypes: {
			params: _react2.default.PropTypes.object
		},

		getChildContext: function getChildContext() {
			return {
				params: this.props.params
			};
		},
		render: function render() {
			return _react2.default.createElement(
				_reactDocumentTitle2.default,
				{ title: 'HTML Tutorial' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h1',
						{ className: _App2.default.header },
						_react2.default.createElement(
							_reactRouter.Link,
							{ className: _App2.default.link, href: '/', to: '/' },
							'School of Haxx'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: _App2.default.body },
						this.props.children
					)
				)
			);
		}
	});

/***/ },
/* 117 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header":"_3BvSWPl__h1FNTtqVOn_M4","link":"_2K3MOGVnd59f7vfmOkclpl","body":"irYyyoynXcPCf0yzITyv1"};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Mac = exports.Win = exports.Content = undefined;

	var _extends2 = __webpack_require__(19);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Bash = __webpack_require__(37);

	var _CopyButton = __webpack_require__(43);

	var _paths = __webpack_require__(5);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Content = exports.Content = _react2.default.createClass({
		displayName: 'Content',
		render: function render() {
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
				this.props.middle
			);
		}
	});

	var Win = exports.Win = _react2.default.createClass({
		displayName: 'Win',
		render: function render() {
			var _props = this.props;
			var login = _props.login;
			var repoName = _props.repoName;
			var step = _props.step;
			var email = _props.email;

			var branchName = step.get('branchName');

			var gitUrl = 'https://github.com/git-for-windows/git/releases/download/v2.7.0.windows.1/Git-2.7.0-32-bit.exe';
			var sublimeUrl = 'http://c758482.r82.cf2.rackcdn.com/Sublime%20Text%20Build%203083%20Setup.exe';
			var cloneCommands = ['cd %HOMEPATH%', 'git clone https://github.com/' + login + '/' + repoName + '.git', 'cd ' + repoName, 'git config user.name ' + login, 'git config user.email ' + email, 'git checkout -b ' + branchName, 'copy NUL > test-file.txt', 'git add .', 'git commit -m "Create my first text file"', 'git push origin ' + branchName];

			var clone = cloneCommands.join(' && ');

			var middle = _react2.default.createElement(
				_Carousel.Carousel,
				null,
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: '' },
					_react2.default.createElement(
						'h4',
						null,
						'Install Git'
					),
					_react2.default.createElement(
						'p',
						null,
						'Just ',
						_react2.default.createElement(
							'strong',
							null,
							'click ',
							_react2.default.createElement(
								'a',
								{ href: gitUrl },
								'here'
							)
						),
						' to download Git.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Git is a cool tool that programmers use to store and share code with each other. You\'ll use it to submit and test your code.'
					),
					_react2.default.createElement(
						'p',
						null,
						'In the setup, make sure to',
						_react2.default.createElement(
							'strong',
							null,
							' select "Use Git from the Windows Command Prompt". '
						),
						'Otherwise, just accept all the default options.'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						'When Git is done installing, click',
						' ',
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/environment-setup/install-sublime-text' },
							'here'
						),
						'.'
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'install-sublime-text' },
					_react2.default.createElement(
						'h4',
						null,
						'Install Sublime Text'
					),
					_react2.default.createElement(
						'p',
						null,
						'Just ',
						_react2.default.createElement(
							'strong',
							null,
							'click ',
							_react2.default.createElement(
								'a',
								{ href: sublimeUrl },
								'here'
							)
						),
						' to download Sublime Text.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Sublime Text is an awesome text editor that you\'ll use to write the HTML in this tutorial.'
					),
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement(
							'strong',
							null,
							'Accept all the default options'
						),
						' during the installation.'
					),
					_react2.default.createElement(
						_Continue.Continue,
						null,
						'When Sublime is done installing, click',
						' ',
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: '/step/environment-setup/clone-your-repo' },
							'here'
						),
						'.'
					)
				),
				_react2.default.createElement(
					_Carousel.Pane,
					{ name: 'clone-your-repo' },
					_react2.default.createElement(
						'h4',
						null,
						'Clone Your Repository'
					),
					_react2.default.createElement(
						'p',
						null,
						'Now we\'ll set up a special folder on your computer where you\'ll store your code.'
					),
					_react2.default.createElement(
						'p',
						null,
						'First, ',
						_react2.default.createElement(
							'strong',
							null,
							'open your command prompt'
						),
						' by typing',
						' ',
						_react2.default.createElement('i', { className: 'fa fa-windows' }),
						' + r, then the letters',
						' ',
						_react2.default.createElement(
							'code',
							null,
							'cmd'
						),
						', then ',
						_react2.default.createElement(
							'code',
							null,
							'enter'
						),
						'.'
					),
					_react2.default.createElement(
						'p',
						null,
						'Next is a simple copy-and-paste job: Just',
						_react2.default.createElement(
							'strong',
							null,
							' copy and paste the following code into your command prompt.'
						),
						' ',
						'(To paste, just right-click anywhere in the command prompt.)'
					),
					_react2.default.createElement(
						_Bash.Bash,
						{ copy: true },
						clone
					),
					_react2.default.createElement(
						'p',
						null,
						'You\'ll need to enter the username and password you created for GitHub.'
					),
					this.props.statusLink
				)
			);

			return _react2.default.createElement(Content, (0, _extends3.default)({ middle: middle }, this.props));
		}
	});

	var Mac = exports.Mac = _react2.default.createClass({
		displayName: 'Mac',
		render: function render() {
			var shellCommand = getShellCommand(this.props);
			var execShell = shellCommand + '\n';
			var inlineButton = _react2.default.createElement(_CopyButton.CopyButtonContainer, { text: execShell });

			var middle = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					null,
					'Open up your terminal'
				),
				_react2.default.createElement(
					'p',
					null,
					'You can open your terminal by pressing Command+Spacebar and typing in "Terminal", then pressing enter. The terminal is a program that allows you to type in commands to your computer. It\'s pretty handy.'
				),
				_react2.default.createElement(
					'h4',
					null,
					'Copy-paste the script'
				),
				_react2.default.createElement(
					'p',
					null,
					'Next, we\'ll run one script to install a text editor called Sublime Text and create a special folder where you\'ll store your code. Just ',
					inlineButton,
					' and paste (Command + V) the following into your terminal.'
				),
				_react2.default.createElement(
					_Bash.Bash,
					{ copy: true },
					shellCommand
				),
				_react2.default.createElement(
					'p',
					null,
					'You\'ll need to enter the username and password you created for GitHub.'
				),
				_react2.default.createElement(
					'p',
					null,
					'When you\'re done, your code directory should be open in Sublime Text, and you\'ll be ready to start writing some HTML!'
				),
				this.props.statusLink
			);

			return _react2.default.createElement(Content, (0, _extends3.default)({ middle: middle }, this.props));
		}
	});

	function getShellCommand(_ref) {
		var SERVER_DOMAIN = _ref.SERVER_DOMAIN;
		var token = _ref.token;

		return 'curl ' + SERVER_DOMAIN + _paths.BASE_PATH + _paths.Paths.SETUP[1](token) + ' | sh';
	}

	exports.default = Content;

/***/ }
/******/ ]);