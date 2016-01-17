exports.id = 0;
exports.modules = [
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

	var _End = __webpack_require__(116);

	var _App = __webpack_require__(117);

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

/***/ }
];