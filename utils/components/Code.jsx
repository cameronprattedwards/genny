import Highlight from 'react-highlight';
import React from 'react';
import cx from 'classnames';

import styles from './Code.css';
import {CopyButtonContainer} from './CopyButton';
import {NoSelect} from './NoSelect';

export const Code = React.createClass({
	render() {
		const classNames = cx(this.props.className, styles.code);
		let code = <Highlight className={classNames}>{this.props.children}</Highlight>;

		if (this.props.copy) {
			let child = null;
			if (typeof this.props.children === 'string') {
				child = this.props.children;
			} else {
				child = React.Children.only(this.props.children);
			}
			let execText = `${child}\n`;

			return (
				<div className={styles.relative}>
					{code}
					<CopyButtonContainer text={execText} className={styles.button} />
				</div>
			);
		} else if (this.props.noSelect) {
			return (
				<NoSelect>{code}</NoSelect>
			);
		} else {
			return code;
		}
	},
});
