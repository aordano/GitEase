// ###  - Basic Workflow Reducers - ###

// ---------------
// --- Imports ---
// ---------------

import { Reducer } from 'redux';


// --------------------
// --- Type Imports ---
// --------------------

import {
    BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE,
    BASIC_WORKFLOW_INIT,
    BASIC_WORKFLOW_COMMIT_AND_PUSH,
    COMMIT_SUCCESS_ALERT,
    COMMIT_ERROR_ALERT
} from '../types/constants';

import {
    GitCommitType
} from "../types"


// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowAction
} from '../actions/basicWorkflowActions';

// ------------------------------
// --- Alert Function Imports ---
// ------------------------------

import { 
    displayCommitErrorAlert,
    displayCommitSuccessAlert
} from '../functions';

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

export type BasicWorkflowState = GitCommitType

// -----------------------------------------
// --- Reducer Default State Definitions ---
// -----------------------------------------

const basicWorkflowDefaultState: BasicWorkflowState = {
    commitMessage: '',
    commitDescription: "",
    branch: "master",
    remote: "origin",
    successStatus: {
        _v: {
            error: "none",
            success: "pending"
        }
    }
};

// ----------------
// --- Reducers ---
// ----------------

export const basicWorkflowReducer: Reducer<BasicWorkflowState> = (
    // -- This reducer takes care of handling the basic workflow
    // -- Does it by having a state that involves commit data and workflow initialization
    //
    // -- It takes five possible actions:
    //
    // -- BASIC_WORKFLOW_COMMIT_AND_PUSH
    // This action handles the commit and push of the previously-staged elements
    //
    // -- BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE
    // This action handles the changes in the commit message boxes and links them to the state.
    //
    // -- BASIC_WORKFLOW_INIT
    // This action initializes the workflow.
    //
    // -- COMMIT_ERROR_ALERT
    // This action updates the state upon an unsuccessful commit/push, and displays
    // an error message.
    //
    // -- COMMIT_SUCCESS_ALERT
    // This action updates the state upon an successful commit/push, and displays
    // an success message.
    state = basicWorkflowDefaultState,
    action: BasicWorkflowAction
) => {
    switch (action.type) {
        case COMMIT_ERROR_ALERT:
            displayCommitErrorAlert(action.error)
            return Object.assign({}, state, {
                successStatus: {
                    _v: {
                        error: action.error,
                        success: "pending"
                    }
                }
            });

        case COMMIT_SUCCESS_ALERT:
            displayCommitSuccessAlert()
            return Object.assign({}, state, {
                commitMessage: "",
                commitDescription: "",
                successStatus: {
                    _v: {
                        success: "pending"
                    }
                }
            });

        case BASIC_WORKFLOW_COMMIT_AND_PUSH:
            // -- This reducer grabs the current commit message data and executes the commit
            // for the previously staged files.
            
            // TODO Clear input values of the input boxes on success

            return Object.assign({}, state, {
                commitMessage: action.message,
                commitDescription: action.description,
                branch: action.branch,
                remote: action.remote,
                successStatus: {
                    success: "pending"
                }
            });
        case BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE:
            // -- This reducer grabs the current input value of the message boxes and links it
            // to the reducer state.
            return Object.assign({}, state, {
                commitMessage: action.message,
                commitDescription: action.description

            });
        case BASIC_WORKFLOW_INIT:
            // -- This reducer initializes the basic workflow.
            return Object.assign({}, state, {
                commitMessage: 'Default',
                commitDescription: "default"
            });
        default:
            return state;
    }
};
