// ! ###  - Common Action Creators - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { ActionCreator} from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

import {
    SET_UI_CONFIG_INFORMATION,
    SET_SSH_CONFIG_INFORMATION,
    SET_CURRENT_GIT_CONFIG_INFORMATION,
    SET_REPOS_CONFIG_INFORMATION,
    SET_CURRENT_PROJECT_CONFIG_INFORMATION,
    SET_CURRENT_USER_DATA_CONFIG_INFORMATION,
    SAVE_CONFIG_TO_FILE,
    SetUIConfigInformationType,
    SetSSHConfigInformationType,
    SetCurrentGitConfigInformationType,
    SetReposConfigInformationType,
    SetCurrentProjectConfigInformationType,
    SetUserDataConfigInformationType,
    SaveConfigToFileType
} from '../types/constants.d';

// --------------------
// --- Type Imports ---
// --------------------

import {
    UIConfigType,
    SSHConfigType,
    ReposConfigType,
    GitConfigType,
    ProjectConfigType,
    UserDataConfigType
} from "../types"

import {
    ConfigInformationState
} from "../reducers/configReducers.redux.reducer"

// ---------------------------------------
// --- Viable Action Types Definitions ---
// ---------------------------------------

export type ConfigInformationAction =
      SetUIConfigInformationType
    | SetSSHConfigInformationType
    | SetCurrentGitConfigInformationType
    | SetReposConfigInformationType
    | SetCurrentProjectConfigInformationType
    | SetUserDataConfigInformationType
    | SaveConfigToFileType

// ------------------------------
// --- Config Action Creators ---
// ------------------------------

export const SetUIConfigInformationAction: ActionCreator<
    SetUIConfigInformationType
> = (UIConfig: UIConfigType) => {
    return {
        UIConfig,
        type: SET_UI_CONFIG_INFORMATION
    };
};

export const SetSSHConfigInformationAction: ActionCreator<
    SetSSHConfigInformationType
> = (SSHConfig: SSHConfigType) => {
    return {
        SSHConfig,
        type: SET_SSH_CONFIG_INFORMATION
    };
};

export const SetCurrentGitConfigInformationAction: ActionCreator<
    SetCurrentGitConfigInformationType
> = (GitConfig: GitConfigType) => {
    return {
        GitConfig,
        type: SET_CURRENT_GIT_CONFIG_INFORMATION
    };
};

export const SetReposConfigInformationAction: ActionCreator<
    SetReposConfigInformationType
> = (ReposConfig: ReposConfigType) => {
    return {
        ReposConfig,
        type: SET_REPOS_CONFIG_INFORMATION
    };
};

export const SetCurrentProjectConfigInformationAction: ActionCreator<
    SetCurrentProjectConfigInformationType
> = (ProjectConfig: ProjectConfigType) => {
    return {
        ProjectConfig,
        type: SET_CURRENT_PROJECT_CONFIG_INFORMATION
    };
};

export const SetUserDataConfigInformationAction: ActionCreator<
    SetUserDataConfigInformationType
> = (UserDataConfig: UserDataConfigType) => {
    return {
        UserDataConfig,
        type: SET_CURRENT_USER_DATA_CONFIG_INFORMATION
    };
};

export const SaveConfigToFileAction: ActionCreator<
    SaveConfigToFileType
> = (config: ConfigInformationState) => {
    return {
        type: SAVE_CONFIG_TO_FILE
    };
};