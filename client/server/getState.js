import {createStore} from 'redux';
import {Map, fromJS} from 'immutable';

import {getUserState} from '../../api/state';
import {setOs} from '../../flux/actionCreators';
import {getOs} from '../../utils/getOs';
import db from '../../steps';

export const getState = async function getState(request, token) {
	const os = getOs(request.get('user-agent'));

	let state = {
		ui: fromJS({os}),
		db: fromJS(db),
		env: fromJS({
			SERVER_DOMAIN: process.env.SERVER_DOMAIN,
		}),
		user: Map(),
	};

	let store = createStore(() => state);

	if (token) {
		store = await getUserState(token);
		store.dispatch(setOs(os));
	}

	return store;
}
