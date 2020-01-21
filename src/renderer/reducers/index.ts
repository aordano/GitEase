// ! ###  - Main Reducers file - ###

// ---------------
// --- Imports ---
// ---------------

import { combineReducers } from 'redux';

// -----------------------------------
// --- Reducers and States Imports ---
// -----------------------------------

import { 
    viewModifiedFilesReducer, 
    ViewModifiedFilesState,
    updateChangesAreaReducer,
    UpdateChangesAreaState,
    CommitErrorAlertReducer,
    CommitSuccessAlertReducer
} from "./commonReducers"

import { 
    BasicWorkflowState, 
    basicWorkflowReducer 
} from './basicWorkflowReducer';

// ------------------------------------
// --- Root Reducer Possible States ---
// ------------------------------------

export interface RootState {
    basicWorkflowReducer: BasicWorkflowState;
    viewModifiedFilesReducer: ViewModifiedFilesState
    updateChangesAreaReducer: UpdateChangesAreaState
    CommitErrorAlertReducer: {}
    CommitSuccessAlertReducer: {}
}

// --------------------
// --- Root Reducer ---
// --------------------

export const rootReducer = combineReducers<RootState | undefined>({
    basicWorkflowReducer,
    viewModifiedFilesReducer,
    updateChangesAreaReducer,
    CommitErrorAlertReducer,
    CommitSuccessAlertReducer
});
