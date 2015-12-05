import React from 'react';
import styles from './FakePage.css';

export const FakePage = React.createClass({
	render() {
		return <div className={styles.fakePage}>{this.props.children}</div>;
	}
});
