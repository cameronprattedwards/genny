import React from 'react';
import {Link} from 'react-router';
import styles from './App.css';

export const App = React.createClass({
	render() {
		return <div>
			<h1 className={styles.header}><Link className={styles.link} href="/" to="/">Genny</Link></h1>
			<div className={styles.body}>
				{this.props.children}
			</div>
		</div>;
	},
});
