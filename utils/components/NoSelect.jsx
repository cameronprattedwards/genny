import React from 'react';
import styles from './NoSelect.css';

export const NoSelect = React.createClass({
	render() {
		return <div className={styles.noSelect}>{this.props.children}</div>;
	},
});
