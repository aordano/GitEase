import { ActionCreator } from 'redux';

import {
    BASIC_WORKFLOW_COMMIT_AND_PUSH,
    BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE,
    BASIC_WORKFLOW_INIT,
    BasicWorkflowCommitAndPushType,
    BasicWorkflowUpdateCommitMessageType,
    BasicWorkflowInitType
} from '../types/constants';

export type BasicWorkflowAction =
    | BasicWorkflowCommitAndPushType
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

export const BasicWorkflowCommitAndPushAction: ActionCreator<BasicWorkflowCommitAndPushType> = (
    message,
    branch?,
    remote?
) => {
    return {
        message,
        branch,
        remote,
        type: BASIC_WORKFLOW_COMMIT_AND_PUSH
    };
};
