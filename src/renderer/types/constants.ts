/**
 * # constants.d.ts
 * 
 * ## This file contains definitions related to the redux actions.
 * 
 * The segment of action type constants (defined by being in all caps) define the strings used as action types as constants, 
 * to ease the use of type fitting in the reducers.
 * 
 * The segment of action interface definitions define actions to be read by the action creators and consumed by the reducers.
 *  
 * @packageDocumentation
 */

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
    UserDataConfigType,
    CompletionStatusType
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
export const UPDATE_COMMIT_DESCRIPTION_VIEW = "UPDATE_COMMIT_DESCRIPTION_VIEW"
export const UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT = "UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT"
export const UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY = "UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY"
export const UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME = "UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME"
export const UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS = "UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS"

// --------------------------
// --- Action Definitions ---
// --------------------------

/**
 * ## Action definition for setting the staging status of a single element
 * 
 * -----------
 * @property **index** | Reflects the index of the element to change the status to 
*/
export interface SetStagingStatusType extends Action {
    type: "SET_STAGING_STATUS",
    index: number
}

/**
 * ## Action definition for setting the staging status of all elements
 * 
 * -----------
 * @property **index** | I don't really recall why this is here 
 *
 * TODO Find out why there's an optional index property in this interface
*/
export interface SetGlobalStagingStatusType extends Action {
    type: "SET_GLOBAL_STAGING_STATUS",
    index?: number
}

/**
 * ## Action definition for updating state with the promise of modified files on working tree
 * 
 * -----------
 * @property **filesTree** | Files tree contains the promise of the changed files given by `git status`
*/
export interface UpdateChangesAreaType extends Action {
    type: "UPDATE_CHANGES_AREA",
    filesTree?: ModifiedFilesStructure
}

/**
 * ## Action definition to update the changes area given the modified files on state
*/
export interface ViewModifiedFilesType extends Action {
    type: "VIEW_MODIFIED_FILES"
}

/**
 * ## Action definition for setting the metadata before the the commit is realized in the basic workflow
 * 
 * -----------
 * @property **message** | Message contains the main commit message
 * @property **descriptionWhat** | This contains the (should not be optional) array of strings containing 
 * the description of what has been changed on the staged elements
 * @property **descriptionWhy** | Akin to `descriptionWhat` but regarding the why of the changes
 * @property **changedElements** | Simply contains the list of staged elements
*/
export interface BasicWorkflowCommitAndPushType extends Action {
    type: 'BASIC_WORKFLOW_COMMIT_AND_PUSH';
    message: string;
    descriptionWhat?: string[];
    descriptionWhy?: string[];
    changedElements: string[];
}

/**
 * ## Action definition for updating state with the metadata for the commit in the basic workflow.
 * 
 * -----------
 * See {@link BasicWorkflowCommitAndPushType}
*/
export interface BasicWorkflowUpdateCommitMessageType extends Action {
    type: 'BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE';
    message: string;
    descriptionWhat?: string[];
    descriptionWhy?: string[];
    changedElements: string[];
}

/**
 * ## Action definition for starting the basic workflow.
*/
export interface BasicWorkflowInitType extends Action {
    type: 'BASIC_WORKFLOW_INIT';
}

/**
 * ## Action definition for stating success on commit and firing a saga.
*/
export interface CommitSuccessAlertType extends Action {
    type: 'COMMIT_SUCCESS_ALERT';
}

/**
 * ## Action definition for stating error on commit and firing a saga.
 * 
 * -----------
 * @property **error** | Defines the error message string
*/
export interface CommitErrorAlertType extends Action {
    type: 'COMMIT_ERROR_ALERT',
    error: string;
}

/**
 * ## Action definition for updating state with the status of the commit deed.
 * 
 * -----------
 * @property **error** | Defines the error message string
*/
export interface UpdateCommitSuccessStatusType extends Action {
    type: 'UPDATE_COMMIT_SUCCESS_STATUS',
    error?: string;
}

/**
 * ## Action definition to fire the repo configuration wizard
*/
export interface LaunchRepoConfigurationWizardType extends Action {
    type: 'LAUNCH_REPO_CONFIGURATION_WIZARD'
}

/**
 * ## Action definition to launch the first time wizard
*/
export interface LaunchFirstTimeWizardType extends Action {
    type: 'LAUNCH_FIRST_TIME_WIZARD'
}

/**
 * ## Action definition to fire the update of the main view
 * TODO the name is legacy and should be changed to reflect recent changes
*/
export interface UpdateViewTreeType extends Action {
    type: 'UPDATE_VIEW_TREE'
}

/**
 * ## Action definition for updating state with the correct context menu given the context
 * 
 * -----------
 * @property **newId** | Context menu identifier string
*/
export interface SetContextMenuIdType extends Action {
    newId: string;
    type: 'SET_CONTEXT_MENU_ID';
}

/**
 * ## Action definition for updating state with the selected commit label on the commit box
 * 
 * -----------
 * @property **label** | Selected label name
*/
export interface StoreCommitLabelType extends Action {
    label: string,
    type: 'STORE_COMMIT_LABEL'
}

/**
 * ## Action definition for updating the ReactTags information on the commitBox selection
 * 
 * -----------
 * @property **tags** | Contains the tags data according to the ReactTags requirements. 
 * See https://github.com/i-like-robots/react-tags
 * @property **tags.suggestions** | Contains the suggestions library to select the tag.
 * @property **tags.tagData** | Contains the selected tag.
*/
export interface SetReactTagDataType extends Action {
    tags: {
        suggestions: ReactTagTagType[],
        tagData: ReactTagTagType[]
    },
    type: 'SET_REACT_TAG_DATA'
}

/**
 * ## Action definition for updating the state/config file for the UI Configuration
 * 
 * -----------
 * @property **UIConfig** | Contains the UI Configuration
 * See {@link UIConfigType}
*/
export interface SetUIConfigInformationType extends Action {
    UIConfig: UIConfigType,
    type: 'SET_UI_CONFIG_INFORMATION'
}

/**
 * ## Action definition for updating the state/config file for the SSH Configuration
 * 
 * -----------
 * @property **SSHConfig** | Contains the SSH Configuration
 * See {@link SSHConfigType}
*/
export interface SetSSHConfigInformationType extends Action {
    SSHConfig: SSHConfigType,
    type: 'SET_SSH_CONFIG_INFORMATION'
}

/**
 * ## Action definition for updating the state/config file for the Repositories Configuration
 * 
 * -----------
 * @property **ReposConfig** | Contains the repositories Configuration
 * See {@link ReposConfigType}
*/
export interface SetReposConfigInformationType extends Action {
    ReposConfig: ReposConfigType,
    type: 'SET_REPOS_CONFIG_INFORMATION'
}

/**
 * ## Action definition for updating the state/config file for the Git Configuration
 * 
 * -----------
 * @property **GitConfig** | Contains the Git Configuration
 * See {@link GitConfigType}
*/
export interface SetCurrentGitConfigInformationType extends Action {
    GitConfig: GitConfigType,
    type: 'SET_CURRENT_GIT_CONFIG_INFORMATION'
}

/**
 * ## Action definition for updating the state/config file for the current project
 * 
 * -----------
 * @property **ProjectConfig** | Contains the Current Project Configuration
 * See {@link ProjectConfigType}
*/
export interface SetCurrentProjectConfigInformationType extends Action {
    ProjectConfig: ProjectConfigType,
    type: 'SET_CURRENT_PROJECT_CONFIG_INFORMATION'
}

/**
 * ## Action definition for updating the state/config file for the User Data Configuration
 * 
 * -----------
 * @property **UserDataConfig** | Contains the User Data Configuration
 * See {@link UserDataConfigType}
*/
export interface SetUserDataConfigInformationType extends Action {
    UserDataConfig: UserDataConfigType,
    type: 'SET_CURRENT_USER_DATA_CONFIG_INFORMATION'
}

/**
 * ## Action definition to save config from state to config file
*/
export interface SaveConfigToFileType extends Action {
    type: 'SAVE_CONFIG_TO_FILE'
}

/**
 * ## Action definition for updating the state with the target for the description textarea box
 * 
 * -----------
 * @property **view** | View to be selected. Values could be `what` or `why` according to the target.
*/
export interface UpdateCommitDescriptionViewType extends Action {
    view: string,
    type: 'UPDATE_COMMIT_DESCRIPTION_VIEW'
}

/**
 * ## Action definition for updating the state with the data of the staged element
 * 
 * -----------
 * @property **index** | Index of the staged element in the list of staged elements
 * @property **name** | Filename with extension of the changed file
*/
export interface UpdateCommitDescriptionElementNameType extends Action {
    index: number,
    name: string,
    type: 'UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME'
}

/**
 * ## Action definition for updating the state with the metadata (specifically what was changed) for the selected element
 * 
 * -----------
 * @property **index** | Index of the element to update its metadata
 * @property **what** | Metadata of the changes made to the file 
*/
export interface UpdateCommitDescriptionElementWhatType extends Action {
    index: number,
    what: string,
    type: 'UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT'
}

/**
 * ## Action definition for updating the state with the metadata (specifically why changes were made) for the selected element
 * 
 * -----------
 * @property **index** | Index of the element to update its metadata
 * @property **why** | Metadata of the reason changes were made to the file
*/
export interface UpdateCommitDescriptionElementWhyType extends Action {
    index: number,
    why: string,
    type: 'UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY'
}

/**
 * ## Action definition for updating the state with the completion status of the selected element
 * 
 * -----------
 * @property **index** | Selected element to set completion status metadata
 * @property **completionStatus** | Metadata of what description was completed
*/
export interface UpdateCommitDescriptionElementCompletionStatusType extends Action {
    index: number,
    completionStatus: CompletionStatusType
    type: 'UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS'
}