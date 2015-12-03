import React from 'react';
import styles from './FakePage.css';

console.log('hurrah!');
console.log(styles);

export const FakePage = React.createClass({
	render() {
		return <div className={styles.fakePage}>{this.props.children}</div>;
	}
});
