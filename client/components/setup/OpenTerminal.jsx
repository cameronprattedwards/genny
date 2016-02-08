import React from 'react';
import {titles, OPEN_YOUR_TERMINAL, DOWNLOAD_SUBLIME_TEXT, SetupLink} from './metadata';
import {Continue, Key} from '../../../utils/components';

export const OpenTerminal = React.createClass({
	render() {
		return (
			<div>
				<h2>Setup Step Four: {titles[OPEN_YOUR_TERMINAL]}</h2>

				<h3>tl;dr</h3>

				<p>Open your terminal.</p>

				<p>
					Just press <Key>Command</Key> <Key>Spacebar</Key>, 
					then type "Terminal" and press enter.
				</p>

				<p>Then come on back here.</p>

				<Continue>
					<SetupLink to={DOWNLOAD_SUBLIME_TEXT}>My terminal is open.</SetupLink>
				</Continue>

				<h3>Why?</h3>

				<p>
					The terminal is a helpful tool that you will use to tell your computer 
					what you want it to do. You do that by typing in "commands." We'll show you how.
				</p>

				<p>
					You'll be using the terminal quite a bit. 
					You'll probably want to maximize the window by clicking the little green button 
					in the upper left hand corner. 
					If you maximize it, you can switch between the terminal and your computer by swiping 
					left or right with three fingers or by pressing <Key>Command</Key> <Key>Tab</Key>.
				</p>
			</div>
		);
	},
});
