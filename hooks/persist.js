import StepService from '../domain/StepService';
import {SUCCESS} from '../domain/constants';
import {notify} from './notify';

export function persist(userId, token, branchName, status, error) {
	notify(token, branchName, status, error);
	StepService.commit(userId, branchName, status === SUCCESS, error);
}
