import Highlight from 'react-highlight';
import React from 'react';
import styles from './Bash.css';
import cx from 'classnames';

export const Bash = React.createClass({
	render() {
		const classNames = cx('bash', styles.bash);
		return <Highlight className={classNames}>{this.props.children}</Highlight>;
	},
});
