import { put, take, all, fork } from 'redux-saga/effects';

import { basicWorkflowUpdateCommitMessageAction } from '../actions/basicWorkflowActions';

import { store } from '../store';

// -------------
// --- Sagas ---
// -------------

// Generator that yields a dispatch by the put() method as to update the display on the parse event
// More info about generators:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* updateCommitMessageStateSaga() {
    // Reads state of the parseReducer containing the result
    // do something
}

// Watch generator that looks for PARSE events and fires up a saga to update the display
function* watchCommitMessageUpdate() {
    // More info about this function on https://redux-saga.js.org/docs/api#takelatestpattern-saga-args
    yield take('BASIC_WORKFLOW_UPDATE_COMMIT_MESSAGE');
    yield fork(updateCommitMessageStateSaga);
}

// Main export that conforms all the sagas into a root saga
export const basicWorkflowSaga = function* root() {
    yield all([fork(watchCommitMessageUpdate)]);
};
