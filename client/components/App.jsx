import React from 'react';
import {Link} from 'react-router';
import styles from './App.css';
import DocumentTitle from 'react-document-title';

export const App = React.createClass({
	childContextTypes: {
		params: React.PropTypes.object,
	},

	getChildContext() {
		return {
			params: this.props.params,
		};
	},

	render() {
		return (
			<DocumentTitle title="HTML Tutorial">
				<div className={styles.app}>
					<h1 className={styles.header}>
						<Link className={styles.link} href="/" to="/">School of Haxx</Link>
					</h1>
					<div className={styles.body}>
						{this.props.children}
					</div>
				</div>
			</DocumentTitle>
		);
	},
});
