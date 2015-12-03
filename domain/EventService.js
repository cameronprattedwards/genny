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
		let moduleCreations = await this._getModuleCreations();
		let stepCreations = await this._getStepCreations();
		let stepBranchNameUpdates = await this._getStepBranchNameUpdates();
		let stepCommits = await this._getStepCommits();
		let stepVisits = await this._getStepVisits();
		let stepDeletions = await this._getStepDeletions();
		console.log('stepdeletions!');
		console.log(stepDeletions);

		let events = [
			...moduleCreations,
			...stepCreations,
			...stepBranchNameUpdates,
			...stepCommits,
			...stepVisits,
			...stepDeletions,
		];

		return _.sortBy(events, TIME_KEY);
	}

	_getModuleCreations() {
		let query = squel.select().from('Module').order('createdAt')
			.field('name')
			.field('id')
			.field('`index`')
			.field('createdAt', TIME_KEY)
			.field(`'${MODULE_CREATE}'`, EVENT_TYPE_KEY);

		return mysql(query);
	}

	_getStepCreations() {
		let query = squel.select().from('Step').order('createdAt')
			.field('name')
			.field('id')
			.field('`index`')
			.field('Module_id', 'module')
			.field('createdAt', TIME_KEY)
			.field(`'${STEP_CREATE}'`, EVENT_TYPE_KEY);

		return mysql(query);
	}

	_getStepDeletions() {
		let query = squel.select().from('Step_delete').order('deletedAt')
			.field('Step_id', 'step')
			.field('deletedAt', TIME_KEY)
			.field(`'${STEP_DELETE}'`, EVENT_TYPE_KEY);

		return mysql(query);
	}

	_getStepBranchNameUpdates() {
		let query = squel.select().from('Step_branchName_update').order('updatedAt')
			.field('Step_id', 'step')
			.field('branchName')
			.field('updatedAt', TIME_KEY)
			.field(`'${STEP_BRANCH_NAME_UPDATE}'`, EVENT_TYPE_KEY);

		return mysql(query);
	}

	_getStepCommits() {
		let query = squel.select().from('Step_commit').order('committedAt')
			.where(`User_id = ${this._userId}`)
			.field('Step_id', 'step')
			.field('success')
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
