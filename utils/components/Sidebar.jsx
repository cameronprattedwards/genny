import React from 'react';
import styles from './Sidebar.css';

export const Sidebar = React.createClass({
	render() {
		return (
			<div className={styles.sidebar}>
				<h5 className={styles.header}>In Case You Were Interested...</h5>
				{this.props.children}
			</div>
		);
	},
});

