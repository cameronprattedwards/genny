import React from 'react';
import {connect} from 'react-redux';

import {Paths, reversePath} from '../../api/paths';
import {Button} from '../../utils/components/Button';
import {setChildWindow} from '../../flux/actionCreators';

const loginPath = reversePath(Paths.LOGIN, false);

export const Authorize = React.createClass({
	render() {
		return <Button onClick={e => this.onClick(e)}>{this.props.children}</Button>;
	},

	onClick(event) {
		event.preventDefault();
		const child = window.open(loginPath, '', 'width=500,height=500');
		this.props.setChildWindow(child);
	}
});

function mapDispatchToProps(dispatch) {
	return {
		setChildWindow: child => dispatch(setChildWindow(child)),
	};
}

export const AuthorizeContainer = connect(null, mapDispatchToProps)(Authorize);
