import squel from 'squel';
import mysql from '../utils/mysql';
import _ from 'lodash';
import {
	STEP_SUCCESS,
	STEP_FAILURE,
	STEP_VISIT,
} from '../flux/actionCreators';

const EVENT_TYPE_KEY = 'type';
const TIME_KEY = 'eventTime';

export class EventService {
	constructor(userId) {
		this._userId = userId;
	}

	async getEventsForUser() {
		let allPromises = [
			...this._getStepCommits(),
			this._getStepVisits(),
		];

		let allEventArrays = await Promise.all(allPromises);

		let events = allEventArrays.reduce((previousValue, currentValue) => previousValue.concat(currentValue));

		return _.sortBy(events, TIME_KEY);
	}

	_getStepCommits() {
		let baseQuery = () => squel.select().from('Step_commit').order('committedAt')
			.where(`User_id = ${this._userId}`)
			.field('Step_id', 'stepId')
			.field('error', 'error')
			.field('committedAt', TIME_KEY);

		let successQuery = baseQuery().field(`'${STEP_SUCCESS}'`, EVENT_TYPE_KEY)
			.where(`success = 1`);

		let failureQuery = baseQuery().field(`'${STEP_FAILURE}'`, EVENT_TYPE_KEY)
			.where(`success = 0`);

		return [
			mysql(successQuery),
			mysql(failureQuery),
		];
	}

	_getStepVisits() {
		let query = squel.select().from('Step_visit').order('visitedAt', false)
			.where(`User_id = ${this._userId}`)
			.limit(1)
			.field('Step_id', 'step')
			.field('visitedAt', TIME_KEY)
			.field(`'${STEP_VISIT}'`, EVENT_TYPE_KEY);

		return mysql(query);
	}
}
