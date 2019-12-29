import { combineReducers } from 'redux';

import { BasicWorkflowState, basicWorkflowReducer } from './basicWorkflowReducer';

export interface RootState {
    basicWorkflowReducer: BasicWorkflowState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    basicWorkflowReducer
});
