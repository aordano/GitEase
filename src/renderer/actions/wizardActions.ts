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
    LaunchRepoConfigurationWizardType
} from '../types/constants';

// ---------------------------------------
// --- Viable Action Types Definitions ---
// ---------------------------------------

export type LaunchRepoConfigurationWizardAction = LaunchRepoConfigurationWizardType

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