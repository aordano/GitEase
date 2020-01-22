// ! ###  - Basic Workflow Action Creators - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { ActionCreator } from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

import {
    BASIC_WORKFLOW_COMMIT_AND_PUSH,
    BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE,
    BASIC_WORKFLOW_INIT,
    BasicWorkflowCommitAndPushType,
    BasicWorkflowUpdateCommitMessageType,
    BasicWorkflowInitType,
    UpdateCommitSuccessStatusType,
    CommitErrorAlertType,
    CommitSuccessAlertType
} from '../types/constants';

// ---------------------------------------
// --- Viable Action Types Definitions ---
// ---------------------------------------

export type BasicWorkflowAction =
    | BasicWorkflowCommitAndPushType
    | BasicWorkflowUpdateCommitMessageType
    | BasicWorkflowInitType
    | UpdateCommitSuccessStatusType
    | CommitErrorAlertType
    | CommitSuccessAlertType;

// -----------------------
// --- Action Creators ---
// -----------------------

export const BasicWorkflowUpdateCommitMessageAction: 
    ActionCreator<BasicWorkflowUpdateCommitMessageType> = (
        message, 
        description
) => {
        return {
            message,
            description,
            type: BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE
        };
    };

export const BasicWorkflowInitAction: ActionCreator<BasicWorkflowInitType> = () => {
    return {
        type: BASIC_WORKFLOW_INIT
    };
};

export const BasicWorkflowCommitAndPushAction: 
    ActionCreator<BasicWorkflowCommitAndPushType> = (
        message,
        branch?,
        remote?,
        description?
) => {
        return {
            message,
            description,
            branch,
            remote,
            type: BASIC_WORKFLOW_COMMIT_AND_PUSH
        };
    };
