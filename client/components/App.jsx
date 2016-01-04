import React from 'react';
import {Link} from 'react-router';
import styles from './App.css';
import DocumentTitle from 'react-document-title';

export const App = React.createClass({
	render() {
		return (
			<DocumentTitle title="HTML Tutorial">
				<div>
					<h1 className={styles.header}><Link className={styles.link} href="/" to="/">School of Haxx</Link></h1>
					<div className={styles.body}>
						{this.props.children}
					</div>
				</div>
			</DocumentTitle>
		);
	},
});
