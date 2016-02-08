import React from 'react';
import {titles, AUTHORIZE_SCHOOL_OF_HAXX, OPEN_YOUR_TERMINAL, SetupLink} from './metadata';
import {Continue} from '../../../utils/components/Continue';
import {Spinner} from '../../../utils/components/Spinner';
import {AuthorizeContainer} from '../Authorize';

export const Authorize = React.createClass({
	render() {
		const callToAction = getCallToAction(this.props);

		return (
			<div>
				<h2>Setup Step Three: {titles[AUTHORIZE_SCHOOL_OF_HAXX]}</h2>
				<h3>tl;dr</h3>
				<p>
					<AuthorizeContainer>
						Authorize School of Haxx
					</AuthorizeContainer>
					{' '}to access your GitHub account.
				</p>

				{callToAction}

				<h3>Why?</h3>
				<p>
					We're going to be sharing a GitHub repository with you. 
					You just need to tell GitHub that you want to share your code with us. 
					We'll also need your email to help you set up your programming environment.
				</p>

				<p>But we won't send you any spam. We promise.</p>
			</div>
		);
	},
});

function getCallToAction({token, loading}) {
	if (token) {
		return (
			<Continue>
				You've authorized School of Haxx!{' '}
				<SetupLink to={OPEN_YOUR_TERMINAL}>Go to the next step.</SetupLink>
			</Continue>
		);
	}

	if (loading) {
		return (
			<div>
				<Spinner /> We're customizing the tutorial for you.
			</div>
		);
	}

	return null;
}
