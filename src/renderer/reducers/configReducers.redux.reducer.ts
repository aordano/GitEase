// ! ###  - Common reducers main file - ###
// ! ###  - (common to all workflows) - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { Reducer } from 'redux';

import { ViewerComponent } from '../components/bottomBlock/viewer';

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
    SAVE_CONFIG_TO_FILE
} from '../types/constants';

import {
    UIConfigType,
    SSHConfigType,
    ReposConfigType,
    GitConfigType,
    ProjectConfigType,
    UserDataConfigType
} from "../types"

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    ConfigInformationAction
} from '../actions/configActions.redux.action';

// ------------------------
// --- Function Imports ---
// ------------------------

import { parseStatus, truncate, stageFile, unstageFile, removeQuotes } from '../functions';

import { parseLogTree, generateGraphData } from '../functions/gitGraph';

// --------------------------
// * --- Mock Data Imports ---
// --------------------------

import {
    data,
    labelsDictionary
} from "../data.mock"

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

export interface ConfigInformationState {
    UIConfig: UIConfigType,
    SSHConfig: SSHConfigType,
    ReposConfig: ReposConfigType,
    CurrentGitConfig: GitConfigType,
    GitConfigs: GitConfigType[]
    UserDataConfig: UserDataConfigType,
    CurrentProjectConfig: ProjectConfigType,
    ProjectConfigs: ProjectConfigType[]
}

// -----------------------------------------
// --- Reducer Default State Definitions ---
// -----------------------------------------

export const configInformationDefaultState: ConfigInformationState = {
    // TODO Make the default state is set by reading the config file, if it exists.
    
};

// ----------------
// --- Reducers ---
// ----------------

export const configInformationReducer: Reducer<ConfigInformationState> = (
    // -- This reducer takes care of handling the changes area.
    // -- Does it by having a state that involves every status change on the files,
    // and evaluationg the staging status of every file aswell as declaring the status as read
    // from the parser function.
    //
    // -- It takes two possible actions:
    //
    // -- SET_STAGING_STATUS
    // This action swaps the staging state of the selected element on the files tree.
    //
    // -- UPDATE_CHANGES_AREA
    // This action updates the files tree to the current status as reported by Git.
    state = configInformationDefaultState,
    action: ConfigInformationAction
) => {
    switch (action.type) {
        case SET_UI_CONFIG_INFORMATION:
            // -- 

            return Object.assign({}, state, {
                UIConfig: action.UIConfig
            });
        
        case SET_SSH_CONFIG_INFORMATION:
            // -- 

            return Object.assign({}, state, {
                SSHConfig: action.SSHConfig
            });
        
        case SET_REPOS_CONFIG_INFORMATION:
            // -- 

            return Object.assign({}, state, {
                ReposConfig: action.ReposConfig
            });
        
        case SET_CURRENT_GIT_CONFIG_INFORMATION:
            // -- 
            // TODO Add logic to save git config if a new one is added
            return Object.assign({}, state, {
                CurrentGitConfig: action.GitConfig
            });
        
        case SET_CURRENT_USER_DATA_CONFIG_INFORMATION:
            // -- 

            return Object.assign({}, state, {
                UserDataConfig: action.UserDataConfig
            });
        
        case SET_CURRENT_PROJECT_CONFIG_INFORMATION:
            // -- 
            // TODO Add logic to save project config if a new one is added
            return Object.assign({}, state, {
                CurrentProjectConfig: action.ProjectConfig
            });
        
        case SAVE_CONFIG_TO_FILE:
            // -- 
            // TODO  save the config to file. Config is in action.config
            return state;
        
        default:
            return state;
    }
};

