import React from 'react';
import cx from 'classnames';

import styles from './Bash.css';
import {Code} from './Code';

export const Bash = React.createClass({
	render() {
		const classNames = cx('bash', styles.bash);
		return <Code className={classNames} {...this.props}>{this.props.children}</Code>;
	},
});
