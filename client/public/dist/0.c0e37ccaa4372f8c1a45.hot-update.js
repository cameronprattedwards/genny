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

	var _Setup = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/Setup\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = exports.routes = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: _App.App },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home.HomeContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/step/:stepName(/:pane)', component: _Step.StepContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/setup/:pane', component: _Setup.Setup }),
		_react2.default.createElement(_reactRouter.Route, { path: '/the-end', component: _End.End })
	);

/***/ },
/* 1 */,
/* 2 */,
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

	var _Setup = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./Setup\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _Spinner = __webpack_require__(77);

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
					' to pick up where you left off.'
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

/***/ }
];