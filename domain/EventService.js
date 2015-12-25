import squel from 'squel';
import mysql from '../utils/mysql';
import _ from 'lodash';

export const EVENT_TYPE_KEY = 'type';
const TIME_KEY = 'eventTime';

export const MODULE_CREATE = 'MODULE_CREATE';
export const STEP_CREATE = 'STEP_CREATE';
export const STEP_BRANCH_NAME_UPDATE = 'STEP_BRANCH_NAME_UPDATE';
export const STEP_COMMIT = 'STEP_COMMIT';
export const STEP_VISIT = 'STEP_VISIT';
export const STEP_DELETE = 'STEP_DELETE';

export class EventService {
	constructor(userId) {
		this._userId = userId;
	}

	async getEventsForUser() {
		let allPromises = [
			this._getStepCommits(),
			this._getStepVisits(),
		];

		let allEventArrays = await Promise.all(allPromises);

		let events = allEventArrays.reduce((previousValue, currentValue) => previousValue.concat(currentValue));

		return _.sortBy(events, TIME_KEY);
	}

	_getStepCommits() {
		let query = squel.select().from('Step_commit').order('committedAt')
			.where(`User_id = ${this._userId}`)
			.field('Step_id', 'step')
			.field('success')
			.field('failureMessage')
			.field('committedAt', TIME_KEY)
			.field(`'${STEP_COMMIT}'`, EVENT_TYPE_KEY);

		return mysql(query);
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
