import React from 'react';
import styles from './Spinner.css';
import cx from 'classnames';

export const SpinnerSizes = {
	SMALL: styles.small,
	GIANT: styles.giant,
};

export const Spinner = React.createClass({
	getDefaultProps() {
		return {
			size: SpinnerSizes.SMALL,
		};
	},

	render() {
		const classNames = cx(
			'fa',
			'fa-spinner',
			'fa-spin',
			this.props.size,
		);

		return <i className={classNames} />;
	},
});
