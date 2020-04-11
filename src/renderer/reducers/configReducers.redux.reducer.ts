// ! ###  - Config reducers main file - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { Reducer } from 'redux';

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
} from "../types/constants.d"

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

import { writeConfigToFile, checkIfConfigExist, readConfig, readConfigSync } from "../functions/config" 

import * as Path from "path"

import * as Electron from "electron"

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


const generateConfigInformationDefaultState = () => {
    // TODO Make the default state is set by reading the config file, if it exists.
    if (checkIfConfigExist()) {
        const config = readConfigSync()
        if (config) {
            const parsedConfig = JSON.parse(config)
            return {
                UIConfig: parsedConfig.config.UIConfig,
                SSHConfig: parsedConfig.configSSHConfig,
                ReposConfig: parsedConfig.configReposConfig,
                CurrentGitConfig: parsedConfig.configGitConfig,
                GitConfigs: parsedConfig.config.GitConfig,
                UserDataConfig: parsedConfig.config.UserDataConfig,
                CurrentProjectConfig: parsedConfig.config.ProjectConfig,
                ProjectConfigs: parsedConfig.config.ProjectConfig
            }
        }
    }
    return {
        UIConfig: {
            language: "en_US",
            theme: "light",
            mainView: "graph",
            showSidePanelsbyDefault: true,
            showAdditionalInformation: true
        },
        SSHConfig: {
            currentKeysLocation: Path.join(Electron.remote.app.getPath("home"), ".ssh"),
            keysDefaultLocation: Path.join(Electron.remote.app.getPath("home"), ".ssh"),
            keysLocation: [
                Path.join(Electron.remote.app.getPath("home"), ".ssh")
            ]
        },
        ReposConfig: {
            reposDefaultLocation: Path.join(Electron.remote.app.getPath("home"), "repositories"),
            reposLocation: Path.join(Electron.remote.app.getPath("home"), "repositories"),
            activeRepo: Path.join(Electron.remote.app.getPath("home"))
        },
        CurrentGitConfig: {
            excludedPaths: [
                ""
            ],
            submodules: false,
            submodulesPaths: [
                ""
            ],
            enforcePreCommitHooks: false,
            enforcePrePushHooks: false,
            enforcePostCommitHooks: false,
            enforcePostMergeHooks: false,
            enforceAllHooks: false,
            currentBranch: "master",
            currentRemote: "origin"
        },
        GitConfigs: [
            {
                excludedPaths: [
                    ""
                ],
                submodules: false,
                submodulesPaths: [
                    ""
                ],
                enforcePreCommitHooks: false,
                enforcePrePushHooks: false,
                enforcePostCommitHooks: false,
                enforcePostMergeHooks: false,
                enforceAllHooks: false,
                currentBranch: "master",
                currentRemote: "origin"
            }
        ],
        UserDataConfig: {
            currentUser: {
                userName: "Default",
                userEmail: "default@example.com",
                userProfilePic: "",
                userFetchedFrom: "local"
            },
            usersList: [
                {
                    userName: "Default",
                    userEmail: "default@example.com",
                    userProfilePic: "",
                    userFetchedFrom: "local"
                }
            ]
        },
        CurrentProjectConfig: {
            currentWorkflow: "basic",
            handholding: true,
            autoSaveChanges: true,
            autoSaveTimeoutMinutes: 5,
            opinionatedWorkflow: true,
            resolveSubmodulesAsIndependentRepos: true,
            integration: "local"
        },
        ProjectConfigs: [
            {
                currentWorkflow: "basic",
                handholding: true,
                autoSaveChanges: true,
                autoSaveTimeoutMinutes: 5,
                opinionatedWorkflow: true,
                resolveSubmodulesAsIndependentRepos: true,
                integration: "local"
            }
        ]
    }
    
};

export const configInformationDefaultState: ConfigInformationState = generateConfigInformationDefaultState()


// ----------------
// --- Reducers ---
// ----------------

export const configInformationReducer: Reducer<ConfigInformationState, ConfigInformationAction> = (
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
            writeConfigToFile(action.config)
            return state;
        
        default:
            return state;
    }
};

