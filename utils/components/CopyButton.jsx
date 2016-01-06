import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard';
import cx from 'classnames';
import {connect} from 'react-redux';

import styles from './CopyButton.css';
import {markCopied} from '../../flux/actionCreators';

export const CopyButton = React.createClass({
	render() {
		let copyVerb = this.props.copiedText === this.props.text ? 'Copied' : 'Copy';

		let classes = [styles.button];
		if (this.props.className) {
			classes.push(this.props.className);
		}
		classes = cx(...classes);

		return (
			<ReactZeroClipboard text={this.props.text} onAfterCopy={() => this.onAfterCopy()}>
				<button className={classes}>{copyVerb}</button>
			</ReactZeroClipboard>
		);
	},

	onAfterCopy() {
		this.props.markCopied(this.props.text);
	},
});

function mapStateToProps(state) {
	return {
		copiedText: state.ui.get('copiedText'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		markCopied: text => dispatch(markCopied(text)),
	};
}

export const CopyButtonContainer = connect(mapStateToProps, mapDispatchToProps)(CopyButton);
