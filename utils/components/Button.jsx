import React from 'react';
import styles from './Button.css';

export const Button = React.createClass({
	getDefaultProps() {
		return {
			component: 'button',
		};
	},

	render() {
		const Component = this.props.component;

		return <Component className={styles.button} {...this.props}>{this.props.children}</Component>;
	},
});
