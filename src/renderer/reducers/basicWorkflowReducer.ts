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
    BASIC_WORKFLOW_COMMIT_AND_PUSH
} from '../types/constants';


// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowAction
} from '../actions/basicWorkflowActions';

// ---------------------------------
// --- Workflow Function Imports ---
// ---------------------------------

import { BasicWorkflow } from '../components/functions/workflows';

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

export interface BasicWorkflowState {
    commitMessage: string;
    commitDescription?: string;
    branch?: string;
    remote?: string;
}

// -----------------------------------------
// --- Reducer Default State Definitions ---
// -----------------------------------------

const basicWorkflowDefaultState: BasicWorkflowState = {
    commitMessage: '',
    commitDescription: "",
    branch: "master",
    remote: "origin"
};

// ----------------
// --- Reducers ---
// ----------------

export const basicWorkflowReducer: Reducer<BasicWorkflowState> = (
    // -- This reducer takes care of handling the basic workflow
    // -- Does it by having a state that involves commit data and workflow initialization
    //
    // -- It takes three possible actions:
    //
    // -- BASIC_WORKFLOW_COMMIT_AND_PUSH
    // This action handles the commit and push of the previously-staged elements
    //
    // -- BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE
    // This action handles the changes in the commit message boxes and links them to the state.
    //
    // -- BASIC_WORKFLOW_INIT
    // This action initializes the workflow.
    state = basicWorkflowDefaultState,
    action: BasicWorkflowAction
) => {
    switch (action.type) {
        case BASIC_WORKFLOW_COMMIT_AND_PUSH:
            // -- This reducer grabs the current commit message data and executes the commit
            // for the previously staged files.

            // TODO create alert on success or failure of the process
            
            // TODO Clear input values of the input boxes on success

            const workflow = new BasicWorkflow(
                action.message,
                action.branch ?? 'master',
                action.remote ?? 'origin',
                action.description ?? ""
            );
            try {
                workflow.commitAndPush();
            } catch (error) {
                console.log(`error... ${error}`);
                return Object.assign({}, state, {
                    error: {error}
                });
            } finally {
                return Object.assign({}, state, {
                    updateStatus: 'up to date'
                });
            }
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
