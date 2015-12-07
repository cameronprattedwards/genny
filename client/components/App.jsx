import React from 'react';
import styles from './App.css';

export const App = React.createClass({
	render() {
		return <div>
			<h1 className={styles.header}>Genny</h1>
			<div className={styles.body}>
				{this.props.children}
			</div>
		</div>;
	},
});
