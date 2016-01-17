exports.id = 0;
exports.modules = {

/***/ 91:
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

/***/ 118:
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

};