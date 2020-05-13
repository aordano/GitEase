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
        descriptionWhat?,
        descriptionWhy?,
        changedElements?
) => {
        return {
            message,
            descriptionWhat,
            descriptionWhy,
            changedElements,
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
        descriptionWhat?,
        descriptionWhy?,
        changedElements?
) => {
        return {
            message,
            changedElements,
            descriptionWhat,
            descriptionWhy,
            type: BASIC_WORKFLOW_COMMIT_AND_PUSH
        };
    };
