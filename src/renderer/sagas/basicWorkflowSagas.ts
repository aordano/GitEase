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
    // -- Generator that yields a dispatch by the put() method as to clear commit boxes.
    yield put(BasicWorkflowUpdateCommitMessageAction("",""))
    const commitMessageBox: HTMLInputElement = 
        document.querySelector(".commit-box .commit-message") as HTMLInputElement
    const commitMessageDescription: HTMLTextAreaElement = 
        document.querySelector(".commit-box .commit-description") as HTMLTextAreaElement
    commitMessageBox.value  = ""
    commitMessageDescription.value = ""
}

// -------------------
// --- Watch Sagas ---
// -------------------

function* watchCommit() {
    // -- Watch generator that looks for VIEW_MODIFIED_FILES events and fires up a saga 
    // to update the changes area display
    yield takeLatest('COMMIT_SUCCESS_ALERT',clearCommitBox);
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
