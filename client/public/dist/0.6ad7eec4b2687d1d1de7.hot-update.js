exports.id = 0;
exports.modules = {

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Setup = exports.FIRST_PANE = exports.SIGN_UP_FOR_GITHUB = undefined;
	exports.setupUrl = setupUrl;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _Carousel = __webpack_require__(84);

	var _Continue = __webpack_require__(85);

	var _Button = __webpack_require__(116);

	var _Key = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../utils/components/Key\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SIGN_UP_FOR_GITHUB = exports.SIGN_UP_FOR_GITHUB = 'sign-up-for-github';
	var FIRST_PANE = exports.FIRST_PANE = SIGN_UP_FOR_GITHUB;
	var VERIFY_YOUR_EMAIL = 'verify-your-email';
	var AUTHORIZE_SCHOOL_OF_HAXX = 'authorize-school-of-haxx';
	var OPEN_YOUR_TERMINAL = 'open-your-terminal';
	var DOWNLOAD_SUBLIME_TEXT = 'download-sublime-text';

	var Setup = exports.Setup = _react2.default.createClass({
		displayName: 'Setup',
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
						'Sign up for GitHub'
					),
					_react2.default.createElement(
						'li',
						null,
						'Verify your email'
					),
					_react2.default.createElement(
						'li',
						null,
						'Authorize School of Haxx'
					),
					_react2.default.createElement(
						'li',
						null,
						'Open your terminal'
					),
					_react2.default.createElement(
						'li',
						null,
						'Download Sublime Text and your repository'
					)
				),
				_react2.default.createElement(
					_Carousel.Carousel,
					null,
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: SIGN_UP_FOR_GITHUB },
						_react2.default.createElement(
							'h2',
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
							'h2',
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
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: VERIFY_YOUR_EMAIL },
						_react2.default.createElement(
							'h2',
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
							'h2',
							null,
							'Why?'
						),
						_react2.default.createElement(
							'p',
							null,
							'To use GitHub (and this app), GitHub needs to make sure that your email address is valid.'
						)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: AUTHORIZE_SCHOOL_OF_HAXX },
						_react2.default.createElement(
							'h2',
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
							'h2',
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
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: OPEN_YOUR_TERMINAL },
						_react2.default.createElement(
							'h2',
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
								_Key.Key,
								null,
								'Command'
							),
							' ',
							_react2.default.createElement(
								_Key.Key,
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
							'h2',
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
								_Key.Key,
								null,
								'Command'
							),
							' ',
							_react2.default.createElement(
								_Key.Key,
								null,
								'Tab'
							),
							'.'
						)
					),
					_react2.default.createElement(
						_Carousel.Pane,
						{ name: DOWNLOAD_SUBLIME_TEXT },
						_react2.default.createElement(
							'h2',
							null,
							'tl;dr'
						),
						_react2.default.createElement(
							'p',
							null,
							'Copy and paste this into your terminal:'
						),
						_react2.default.createElement(
							Bash,
							{ copy: true },
							command
						),
						_react2.default.createElement(
							'p',
							null,
							'You can paste by pressing ',
							_react2.default.createElement(
								_Key.Key,
								null,
								'Command'
							),
							' ',
							_react2.default.createElement(
								_Key.Key,
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
							'h2',
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
					)
				)
			);
		},
		authorize: function authorize() {}
	});

	function setupUrl(slug) {
		return '/setup/' + slug;
	}

/***/ }

};