// ! ###  - Repo Configuration Wizard Reducers - ###

// ---------------
// --- Imports ---
// ---------------

import { Reducer } from 'redux';


// --------------------
// --- Type Imports ---
// --------------------

import {
    LAUNCH_REPO_CONFIGURATION_WIZARD
} from '../types/constants.d';

import {
    RepoConfigDataType
} from "../types/index"

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    LaunchRepoConfigurationWizardAction
} from '../actions/wizardActions.redux.action';

// -----------------------------------------------
// --- Storage and Git Config Function Imports ---
// -----------------------------------------------

import { 
    
} from '../functions';

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

export type RepoConfigurationState = RepoConfigDataType

// -----------------------------------------
// --- Reducer Default State Definitions ---
// -----------------------------------------

const repoConfigurationDefaultState: RepoConfigDataType = {
    repo: "",
    workingDir: ""
};

// ----------------
// --- Reducers ---
// ----------------