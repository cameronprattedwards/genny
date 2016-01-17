exports.id = 0;
exports.modules = {

/***/ 100:
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
						'into Sublime Text. Press ',
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
						_Html.Html,
						{ copy: true },
						'<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Your First Webpage!</title>\n\t</head>\n\t<body>\n\t\t<h1>This Is Your First Webpage!</h1>\n\t\t<p>\n\t\t\tThis your very first webpage ever. Congratulations!\n\t\t</p>\n\t\t<p>\n\t\t\tYou deserve to celebrate. Go eat some ice cream or something.\n\t\t\tThen go back to School of Haxx to learn some more about HTML.\n\t\t</p>\n\t</body>\n</html>\t'
					),
					_react2.default.createElement(
						'p',
						null,
						'Then, to look at your handiwork in a browser, type this in your terminal:'
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
						'Check that out. You just created your first webpage! Nicely done. To move on to the next step (and write some HTML from scratch), just send your code back to us by copy-pasting the following into the terminal:'
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

/***/ }

};