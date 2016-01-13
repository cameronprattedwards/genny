import React from 'react';
import styles from './Keyboard.css';

export const Key = React.createClass({
	render() {
		return <span className={styles.key}>{this.props.children}</span>;
	},
});
