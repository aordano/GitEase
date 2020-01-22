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
    UPDATE_COMMIT_SUCCESS_STATUS,
    BasicWorkflowCommitAndPushType,
    COMMIT_ERROR_ALERT,
    COMMIT_SUCCESS_ALERT
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

// ---------------------------------
// --- Workflow Function Imports ---
// ---------------------------------

import { BasicWorkflow } from '../components/functions/workflows';

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
        case COMMIT_ERROR_ALERT:
            console.log(action.error)
            return Object.assign({}, state, {
                successStatus: {
                    _v: {
                        error: action.error,
                        success: "pending"
                    }
                }
            });

        case COMMIT_SUCCESS_ALERT:
            console.log("success")
            return Object.assign({}, state, {
                successStatus: {
                    _v: {
                        success: "pending"
                    }
                }
            });

        case UPDATE_COMMIT_SUCCESS_STATUS:
            if (state.successStatus?._v.success !== undefined) {
                if (state.successStatus?._v.success === "pending") {
                    return Object.assign({}, state, {
                        successStatus: {
                            _v: {
                                success: "pending"
                            }
                        }
                    });
                }
    
                if (state.successStatus?._v.success === "success") {
                    return Object.assign({}, state, {
                        successStatus: {
                            _v: {
                                success: "success"
                            }
                        }
                    });
                }
    
                return Object.assign({}, state, {
                    successStatus: {
                        _v: {
                            error: action.error,
                            success: "error"
                        }
                    }
                });
            }

            return state

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
                debugger
                const commitDeed = async () => {
                    await workflow.commitAndPush()
                }  
                const successResult = () => {
                    return {
                        error: "none",
                        success: "success"
                    } 
                }
                const errorResult = () => {
                    return {
                        error: "Generic error",
                        success: "error"
                    }                       
                    
                }

                return Object.assign({}, state, {
                    successStatus: Promise.resolve(commitDeed().then(
                        successResult,
                        errorResult
                    ))
                });
            } catch (error) {
                console.log(`error... ${error}`);
                return Object.assign({}, state, {
                    successStatus: {
                        error: {error},
                        success: "error"
                    }
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
