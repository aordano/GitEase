import { Reducer } from 'redux';

import {
    BASIC_WORKFLOW_STAGE_AND_COMMIT,
    BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE,
    BASIC_WORKFLOW_INIT
} from '../types/constants';

import {
    basicWorkflowStageAndCommitAction,
    BasicWorkflowAction
} from '../actions/basicWorkflowActions';

import { BasicWorkflow } from '../components/functions/workflows';

export interface BasicWorkflowState {
    commitMessage: string;
    commitDescription?: string;
    modifiedFiles: string[];
    readyToStageFiles: string[];
    branch?: string;
    remote?: string;
}

const basicWorkflowDefaultState: BasicWorkflowState = {
    commitMessage: '',
    modifiedFiles: [''],
    readyToStageFiles: ['']
};

export const basicWorkflowReducer: Reducer<BasicWorkflowState> = (
    state = basicWorkflowDefaultState,
    action: BasicWorkflowAction
) => {
    switch (action.type) {
        case BASIC_WORKFLOW_STAGE_AND_COMMIT:
            const workflow = new BasicWorkflow(
                action.message,
                action.files,
                action.branch ?? 'master',
                action.remote ?? 'origin'
            );
            try {
                console.log('trying...');
                workflow.stageAndCommit();
            } catch (err) {
                console.log(`error... ${err}`);
                return Object.assign({}, state, {
                    error: err
                });
            } finally {
                console.log(`profit?`);
                return Object.assign({}, state, {
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
