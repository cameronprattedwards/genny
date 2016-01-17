exports.id = 0;
exports.modules = {

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Button = undefined;

	var _extends2 = __webpack_require__(11);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(117);

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

/***/ }

};