import React from 'react';
import cx from 'classnames';

import styles from './Bash.css';
import {Code} from './Code';

export const Bash = React.createClass({
	render() {
		const classNames = cx('bash', styles.bash, {
			[this.props.className]: !!this.props.className,
		});
		const wrapperClass = cx({
			[styles.wrapper]: this.props.expand,
		});

		return (
			<div className={wrapperClass}>
				<Code {...this.props} className={classNames}>{this.props.children}</Code>
			</div>
		);
	},
});
