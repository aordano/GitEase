// ! ###  - Basic Workflow Sagas - ###

// -----------------------
// --- Effects Imports ---
// -----------------------

import { 
    put, 
    takeLatest, 
    all, 
    fork, 
    delay 
} from 'redux-saga/effects';

// ---------------------
// --- Store Imports ---
// ---------------------

import { store } from "../store"

// ----------------------
// --- Action Imports ---
// ----------------------

import { 
    BasicWorkflowUpdateCommitMessageAction
} from '../actions/basicWorkflowActions';

// --------------------
// --- Effect Sagas ---
// --------------------

function* clearCommitBox() {
    // -- Generator that yields a dispatch by the put() method as to update the changes area if
    yield put(BasicWorkflowUpdateCommitMessageAction("",""))
}

// -------------------
// --- Watch Sagas ---
// -------------------

function* watchCommit() {
    // -- Watch generator that looks for VIEW_MODIFIED_FILES events and fires up a saga 
    // to update the changes area display
    yield takeLatest('BASIC_WORKFLOW_COMMIT_AND_PUSH',clearCommitBox);
}

// --------------------
// --- Export Sagas ---
// --------------------

export const basicWorkflowSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchCommit)
    ]);
};
