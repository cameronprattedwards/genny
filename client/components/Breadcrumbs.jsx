import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router';

import styles from './Breadcrumbs.css';

const Breadcrumb = React.createClass({
	render() {
		const {step, active, isLink} = this.props;
		const success = step.get('success');
		const successClasses = cx(styles.breadcrumbSuccess, 'fa', 'fa-check');
		const classNames = cx({
			[styles.breadcrumbActive]: active,
		});
		let content = step.get('name');

		if (isLink) {
			content = <Link to={`/step/${step.get('branchName')}`} className={styles.breadcrumbLink}>
				{success && <i className={successClasses}></i>}
				{content}
			</Link>;
		}

		return (
			<li className={classNames}>
				{content}
			</li>
		);
	},
});

export const Breadcrumbs = React.createClass({
	render() {
		let {steps, active} = this.props;
		let isLink = true;

		return (
			<ul className={styles.breadcrumbs}>
				{steps.map(step => {
					let makeActive = step.get('branchName') === active;
					let el = <Breadcrumb 
						key={step.get('branchName')} 
						step={step} 
						active={makeActive} 
						isLink={isLink} 
					/>;
					return el;
				})}
			</ul>
		);
	},
});