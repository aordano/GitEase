// ! ###  - Action-related Types - ###

// ---------------------------------
// --- Action Definition Imports ---
// ---------------------------------

import { Action } from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

import {
    ModifiedFilesStructure,
    ReactTagTagType,
    UIConfigType,
    SSHConfigType,
    ReposConfigType,
    GitConfigType,
    ProjectConfigType,
    UserDataConfigType
} from "./index"

// -----------------------------
// --- Action Type Constants ---
// -----------------------------

export const BASIC_WORKFLOW_COMMIT_AND_PUSH = 'BASIC_WORKFLOW_COMMIT_AND_PUSH';
export const BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE = 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
export const BASIC_WORKFLOW_INIT = 'BASIC_WORKFLOW_INIT'
export const UPDATE_VIEW_TREE = 'UPDATE_VIEW_TREE'
export const VIEW_MODIFIED_FILES = "VIEW_MODIFIED_FILES"
export const UPDATE_CHANGES_AREA = "UPDATE_CHANGES_AREA"
export const SET_STAGING_STATUS = "SET_STAGING_STATUS"
export const SET_GLOBAL_STAGING_STATUS = "SET_GLOBAL_STAGING_STATUS"
export const COMMIT_SUCCESS_ALERT = "COMMIT_SUCCESS_ALERT"
export const COMMIT_ERROR_ALERT = "COMMIT_ERROR_ALERT"
export const UPDATE_COMMIT_SUCCESS_STATUS = "UPDATE_COMMIT_SUCCESS_STATUS"
export const LAUNCH_REPO_CONFIGURATION_WIZARD = "LAUNCH_REPO_CONFIGURATION_WIZARD"
export const LAUNCH_FIRST_TIME_WIZARD = "LAUNCH_FIRST_TIME_WIZARD"
export const SET_CONTEXT_MENU_ID = "SET_CONTEXT_MENU_ID"
export const STORE_COMMIT_LABEL = "STORE_COMMIT_LABEL"
export const SET_REACT_TAG_DATA = "SET_REACT_TAG_DATA"
export const SET_UI_CONFIG_INFORMATION = "SET_UI_CONFIG_INFORMATION"
export const SET_SSH_CONFIG_INFORMATION = "SET_SSH_CONFIG_INFORMATION"
export const SET_REPOS_CONFIG_INFORMATION = "SET_REPOS_CONFIG_INFORMATION"
export const SET_CURRENT_GIT_CONFIG_INFORMATION = "SET_CURRENT_GIT_CONFIG_INFORMATION"
export const SET_CURRENT_PROJECT_CONFIG_INFORMATION = "SET_CURRENT_PROJECT_CONFIG_INFORMATION"
export const SET_CURRENT_USER_DATA_CONFIG_INFORMATION = "SET_CURRENT_USER_DATA_CONFIG_INFORMATION"
export const SAVE_CONFIG_TO_FILE = "SAVE_CONFIG_TO_FILE"

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
    descriptionWhat?: string[];
    descriptionWhy?: string[];
    changedElements: string[];
}

export interface BasicWorkflowUpdateCommitMessageType extends Action {
    type: 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
    message: string;
    descriptionWhat?: string[];
    descriptionWhy?: string[];
    changedElements: string[];
}

export interface BasicWorkflowInitType extends Action {
    type: 'BASIC_WORKFLOW_INIT';
}

export interface CommitSuccessAlertType extends Action {
    type: 'COMMIT_SUCCESS_ALERT';
}

export interface CommitErrorAlertType extends Action {
    type: 'COMMIT_ERROR_ALERT',
    error: string;
}

export interface UpdateCommitSuccessStatusType extends Action {
    type: 'UPDATE_COMMIT_SUCCESS_STATUS',
    error?: string;
}

export interface LaunchRepoConfigurationWizardType extends Action {
    type: 'LAUNCH_REPO_CONFIGURATION_WIZARD'
}

export interface LaunchFirstTimeWizardType extends Action {
    type: 'LAUNCH_FIRST_TIME_WIZARD'
}

export interface UpdateViewTreeType extends Action {
    type: 'UPDATE_VIEW_TREE'
}

export interface SetContextMenuIdType extends Action {
    newId: string;
    type: 'SET_CONTEXT_MENU_ID';
}

export interface StoreCommitLabelType extends Action {
    label: string,
    type: 'STORE_COMMIT_LABEL'
}

export interface SetReactTagDataType extends Action {
    tags: {
        suggestions: ReactTagTagType[],
        tagData: ReactTagTagType[]
    },
    type: 'SET_REACT_TAG_DATA'
}

export interface SetUIConfigInformationType extends Action {
    UIConfig: UIConfigType,
    type: 'SET_UI_CONFIG_INFORMATION'
}

export interface SetSSHConfigInformationType extends Action {
    SSHConfig: SSHConfigType,
    type: 'SET_SSH_CONFIG_INFORMATION'
}

export interface SetReposConfigInformationType extends Action {
    ReposConfig: ReposConfigType,
    type: 'SET_REPOS_CONFIG_INFORMATION'
}

export interface SetCurrentGitConfigInformationType extends Action {
    GitConfig: GitConfigType,
    type: 'SET_CURRENT_GIT_CONFIG_INFORMATION'
}

export interface SetCurrentProjectConfigInformationType extends Action {
    ProjectConfig: ProjectConfigType,
    type: 'SET_CURRENT_PROJECT_CONFIG_INFORMATION'
}

export interface SetUserDataConfigInformationType extends Action {
    UserDataConfig: UserDataConfigType,
    type: 'SET_CURRENT_USER_DATA_CONFIG_INFORMATION'
}

export interface SaveConfigToFileType extends Action {
    type: 'SAVE_CONFIG_TO_FILE'
}
