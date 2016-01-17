exports.id = 0;
exports.modules = {

/***/ 0:
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
		_react2.default.createElement(_reactRouter.Route, { path: '/setup/:pane', component: _Setup.Setup }),
		_react2.default.createElement(_reactRouter.Route, { path: '/the-end', component: _End.End })
	);

/***/ },

/***/ 3:
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

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _titles;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Setup = exports.FIRST_PANE = exports.SIGN_UP_FOR_GITHUB = undefined;
	exports.setupUrl = setupUrl;

	var _defineProperty2 = __webpack_require__(11);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Carousel = __webpack_require__(15);

	var _Continue = __webpack_require__(16);

	var _Button = __webpack_require__(18);

	var _Keyboard = __webpack_require__(35);

	var _Bash = __webpack_require__(37);

	var _Setup = __webpack_require__(76);

	var _Setup2 = _interopRequireDefault(_Setup);

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
				_react2.default.createElement(
					_Continue.Continue,
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: setupUrl(OPEN_YOUR_TERMINAL) },
						'I Have Authorized School of Haxx'
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
				_react2.default.createElement('img', { src: '/public/images/xcrun.png' }),
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
						_react2.default.createElement(SignUpForGithub, null)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: VERIFY_YOUR_EMAIL },
						_react2.default.createElement(VerifyYourEmail, null)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: AUTHORIZE_SCHOOL_OF_HAXX },
						_react2.default.createElement(Authorize, null)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: OPEN_YOUR_TERMINAL },
						_react2.default.createElement(OpenTerminal, null)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: DOWNLOAD_SUBLIME_TEXT },
						_react2.default.createElement(DownloadSublime, null)
					)
				)
			);
		},
		authorize: function authorize() {}
	});

	function setupUrl(slug) {
		return '/setup/' + slug;
	}

/***/ },

/***/ 76:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"setup":"_3THZySxez1Q_bN6gbw36JR"};

/***/ }

};