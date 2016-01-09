import React from 'react';
import styles from './Continue.css';

export const Continue = React.createClass({
	render() {
		return <div className={styles.continue}>{this.props.children}</div>;
	},
});
