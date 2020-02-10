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
    UpdateViewTreeState,
    updateViewTreeReducer
} from "./commonReducers.redux.reducer"

import { 
    BasicWorkflowState, 
    basicWorkflowReducer 
} from './basicWorkflowReducer.redux.reducer';

// ------------------------------------
// --- Root Reducer Possible States ---
// ------------------------------------

export interface RootState {
    basicWorkflowReducer: BasicWorkflowState;
    viewModifiedFilesReducer: ViewModifiedFilesState
    updateChangesAreaReducer: UpdateChangesAreaState
    updateViewTreeReducer: UpdateViewTreeState
}

// --------------------
// --- Root Reducer ---
// --------------------

export const rootReducer = combineReducers<RootState | undefined>({
    basicWorkflowReducer,
    viewModifiedFilesReducer,
    updateChangesAreaReducer,
    updateViewTreeReducer
});
