import React from 'react';
import {
	titles, 
	VERIFY_YOUR_EMAIL, 
	AUTHORIZE_SCHOOL_OF_HAXX, 
	SetupLink,
} from './metadata';
import {Continue} from '../../../utils/components';

export const VerifyYourEmail = React.createClass({
	render() {
		return (
			<div>
				<h2>Setup Step Two: {titles[VERIFY_YOUR_EMAIL]}</h2>
				<h3>tl;dr</h3>
				<p><strong>Verify your email address.</strong></p>
				<p>
					Visit the inbox for the email you provided to GitHub. 
					Click on the email titled "[GitHub] Please verify your email address." 
					Then click on "Verify Email Address."
				</p>
				<p>Then come right back here.</p>
				<Continue>
					<SetupLink to={AUTHORIZE_SCHOOL_OF_HAXX}>My Email is Verified</SetupLink>
				</Continue>
				<h3>Why?</h3>
				<p>
					To use GitHub (and this School of Haxx), 
					GitHub needs to make sure that your email address is valid.
				</p>
			</div>
		);
	},
});
