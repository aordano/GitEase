import { Reducer } from 'redux';

import {
    BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE,
    BASIC_WORKFLOW_INIT,
    BASIC_WORKFLOW_COMMIT_AND_PUSH
} from '../types/constants';

import {
    BasicWorkflowAction
} from '../actions/basicWorkflowActions';

import { BasicWorkflow } from '../components/functions/workflows';

export interface BasicWorkflowState {
    commitMessage: string;
    commitDescription?: string;
    branch?: string;
    remote?: string;
}

const basicWorkflowDefaultState: BasicWorkflowState = {
    commitMessage: '',
    commitDescription: "",
    branch: "master",
    remote: "origin"
};

export const basicWorkflowReducer: Reducer<BasicWorkflowState> = (
    state = basicWorkflowDefaultState,
    action: BasicWorkflowAction
) => {
    switch (action.type) {
        case BASIC_WORKFLOW_COMMIT_AND_PUSH:
            const workflow = new BasicWorkflow(
                action.message,
                action.branch ?? 'master',
                action.remote ?? 'origin'
            );
            try {
                workflow.commitAndPush();
            } catch (err) {
                console.log(`error... ${err}`);
                return Object.assign({}, state, {
                    error: err
                });
            } finally {
                return Object.assign({}, state, {
                    commitMessage: "",
                    updateStatus: 'up to date'
                });
            }
        case BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE:
            return Object.assign({}, state, {
                commitMessage: action.message
            });
        case BASIC_WORKFLOW_INIT:
            return Object.assign({}, state, {
                commitMessage: 'Default'
            });
        default:
            return state;
    }
};
