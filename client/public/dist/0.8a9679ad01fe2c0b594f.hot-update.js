exports.id = 0;
exports.modules = {

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StepContainer = exports.Step = undefined;

	var _extends2 = __webpack_require__(11);

	var _extends3 = _interopRequireDefault(_extends2);

	var _isomorphicFetch = __webpack_require__(8);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(4);

	var _reactRouter = __webpack_require__(2);

	var _reactDocumentTitle = __webpack_require__(27);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _content = __webpack_require__(28);

	var _content2 = _interopRequireDefault(_content);

	var _Step = __webpack_require__(105);

	var _Step2 = _interopRequireDefault(_Step);

	var _paths = __webpack_require__(5);

	var _Breadcrumbs = __webpack_require__(106);

	var _Continue = __webpack_require__(85);

	var _Spinner = __webpack_require__(114);

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

/***/ }

};