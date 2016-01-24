import React from 'react';
import styles from './NoSelect.css';

export const NoSelect = React.createClass({
	getDefaultProps() {
		return {
			component: 'div',
		};
	},

	render() {
		const {component} = this.props;
		return <component className={styles.noSelect}>{this.props.children}</component>;
	},
});
