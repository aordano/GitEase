// ! ###  - Action-related Types - ###

// ---------------------------------
// --- Action Definition Imports ---
// ---------------------------------

import { Action } from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

import {ModifiedFilesStructure} from "./index"

// -----------------------------
// --- Action Type Constants ---
// -----------------------------

export const BASIC_WORKFLOW_COMMIT_AND_PUSH = 'BASIC_WORKFLOW_COMMIT_AND_PUSH';
export const BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE = 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
export const BASIC_WORKFLOW_INIT = 'BASIC_WORKFLOW_INIT';
export const VIEW_MODIFIED_FILES = "VIEW_MODIFIED_FILES"
export const UPDATE_CHANGES_AREA = "UPDATE_CHANGES_AREA"
export const SET_STAGING_STATUS = "SET_STAGING_STATUS"
export const SET_GLOBAL_STAGING_STATUS = "SET_GLOBAL_STAGING_STATUS"
export const COMMIT_SUCCESS_ALERT = "COMMIT_SUCCESS_ALERT"

// --------------------------
// --- Action Definitions ---
// --------------------------

export interface SetStagingStatusType extends Action {
    type: "SET_STAGING_STATUS",
    index: number
}

export interface SetGlobalStagingStatusType extends Action {
    type: "SET_GLOBAL_STAGING_STATUS",
    index?: number
}

export interface UpdateChangesAreaType extends Action {
    type: "UPDATE_CHANGES_AREA",
    filesTree?: ModifiedFilesStructure
}

export interface ViewModifiedFilesType extends Action {
    type: "VIEW_MODIFIED_FILES"
}

export interface BasicWorkflowCommitAndPushType extends Action {
    type: 'BASIC_WORKFLOW_COMMIT_AND_PUSH';
    message: string;
    description?: string;
    branch?: string;
    remote?: string;
}

export interface BasicWorkflowUpdateCommitMessageType extends Action {
    type: 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
    message: string;
    description: string;
}

export interface BasicWorkflowInitType extends Action {
    type: 'BASIC_WORKFLOW_INIT';
}

export interface CommitSuccessAlertType extends Action {
    type: 'COMMIT_SUCCESS_ALERT';
}