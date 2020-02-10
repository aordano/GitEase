// ! ###  - Common Action Creators - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { ActionCreator } from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

import {
    LAUNCH_REPO_CONFIGURATION_WIZARD,
    LAUNCH_FIRST_TIME_WIZARD,
    LaunchRepoConfigurationWizardType,
    LaunchFirstTimeWizardType
} from '../types/constants.d';

// ---------------------------------------
// --- Viable Action Types Definitions ---
// ---------------------------------------

export type LaunchRepoConfigurationWizardAction = LaunchRepoConfigurationWizardType

export type LaunchFirstTimeWizardAction = LaunchFirstTimeWizardType

// -------------------------------------------------
// --- Repo Configuration Wizard Action Creators ---
// -------------------------------------------------

export const LaunchRepoConfigurationWizardAction: ActionCreator<LaunchRepoConfigurationWizardType> = (
    repo,
    workingDir
) => {
    return {
        repo,
        workingDir,
        type: LAUNCH_REPO_CONFIGURATION_WIZARD
    }
}

// -----------------------------------------
// --- First Time Wizard Action Creators ---
// -----------------------------------------

export const LaunchFirstTimeWizardAction: ActionCreator<LaunchFirstTimeWizardType> = () => {
    return {
        type: LAUNCH_FIRST_TIME_WIZARD
    }
}