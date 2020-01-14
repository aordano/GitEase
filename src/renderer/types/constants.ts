import { Action } from 'redux';

export const BASIC_WORKFLOW_STAGE_AND_COMMIT = 'BASIC_WORKFLOW_STAGE_AND_COMMIT';
export const BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE = 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
export const BASIC_WORKFLOW_INIT = 'BASIC_WORKFLOW_INIT';
export const VIEW_MODIFIED_FILES = "VIEW_MODIFIED_FILES"

export interface ViewModifiedFilesType extends Action {
    type: "VIEW_MODIFIED_FILES"
}

export interface BasicWorkflowStageAndCommitType extends Action {
    type: 'BASIC_WORKFLOW_STAGE_AND_COMMIT';
    message: string;
    files: string[];
    branch?: string;
    remote?: string;
}

export interface BasicWorkflowUpdateCommitMessageType extends Action {
    type: 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
    message: string;
}

export interface BasicWorkflowInitType extends Action {
    type: 'BASIC_WORKFLOW_INIT';
}
