import React from 'react';
import {FILENAME, DOCTYPE} from '../html-from-scratch/content';
import {HEADER, PARAGRAPH} from '../body-tag/content';
import {Html} from '../../../utils/components/Html';
import {NoSelect} from '../../../utils/components/NoSelect';
import {Bash} from '../../../utils/components/Bash';
import {FakePage} from '../../../utils/components/FakePage';

const IMG_URL = 'http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/92893070.jpg';

const Content = React.createClass({
render() {
	const {step} = this.props;
	const branchName = step.get('branchName');

	return (
		<div>
		</div>
	);
},
});

export default Content;
