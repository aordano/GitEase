import { ActionCreator } from 'redux';

import {
    BASIC_WORKFLOW_STAGE_AND_COMMIT,
    BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE,
    BASIC_WORKFLOW_INIT,
    BasicWorkflowStageAndCommitType,
    BasicWorkflowUpdateCommitMessageType,
    BasicWorkflowInitType
} from '../types/constants';

export type BasicWorkflowAction =
    | BasicWorkflowStageAndCommitType
    | BasicWorkflowUpdateCommitMessageType
    | BasicWorkflowInitType;

export const BasicWorkflowUpdateCommitMessageAction: ActionCreator<BasicWorkflowUpdateCommitMessageType> = message => {
    return {
        message,
        type: BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE
    };
};

export const BasicWorkflowInitAction: ActionCreator<BasicWorkflowInitType> = () => {
    return {
        type: BASIC_WORKFLOW_INIT
    };
};

export const BasicWorkflowStageAndCommitAction: ActionCreator<BasicWorkflowStageAndCommitType> = (
    message,
    files,
    branch?,
    remote?
) => {
    return {
        message,
        files,
        branch,
        remote,
        type: BASIC_WORKFLOW_STAGE_AND_COMMIT
    };
};
