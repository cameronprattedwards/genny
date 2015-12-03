import React from 'react';
import {FakePage} from '../../utils/components/FakePage';

const Content = React.createClass({
	render() {
		return (
			<div>
				<p>Awesome! Now that your environment is all set up, let's write some HTML.</p>

				<p>HTML is just a way of formatting text so that a web browser can know how to display it to people.</p>

				<p>For example, if I write the following HTML:</p>

				<pre>
				{`
<!DOCTYPE html>
<html>
<head>
	<title>My HTML Page</title>
</head>
<body>
	<div>
	    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
	</div>
	<p>This is a new paragraph.</p>	
</body>
</html>
				`}
				</pre>

				<p>Your web browser will display it like this:</p>

				<FakePage>
				<div>
				    This is regular text. <strong>This is bold.</strong> <em>This is italic.</em>
				</div>
				<p>This is a new paragraph.</p>	
				</FakePage>
			</div>
		);
	}
});

export default Content;
