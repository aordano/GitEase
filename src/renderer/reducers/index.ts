import { combineReducers } from 'redux';

import { 
    viewModifiedFilesReducer, 
    ViewModifiedFilesState,
    updateChangesAreaReducer,
    UpdateChangesAreaState
} from "./commonReducers"

import { BasicWorkflowState, basicWorkflowReducer } from './basicWorkflowReducer';

export interface RootState {
    basicWorkflowReducer: BasicWorkflowState;
    viewModifiedFilesReducer: ViewModifiedFilesState
    updateChangesAreaReducer: UpdateChangesAreaState
}

export const rootReducer = combineReducers<RootState | undefined>({
    basicWorkflowReducer,
    viewModifiedFilesReducer,
    updateChangesAreaReducer
});
