import { combineReducers } from 'redux';

import { viewModifiedFilesReducer, ViewModifiedFilesState } from "./commonReducers"

import { BasicWorkflowState, basicWorkflowReducer } from './basicWorkflowReducer';

export interface RootState {
    basicWorkflowReducer: BasicWorkflowState;
    viewModifiedFilesReducer: ViewModifiedFilesState
}

export const rootReducer = combineReducers<RootState | undefined>({
    basicWorkflowReducer,
    viewModifiedFilesReducer
});
