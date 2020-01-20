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
    CommitSuccessAlertAction,
    CommitErrorAlertAction
} from '../actions/commonActions';

import { 
    BasicWorkflowUpdateCommitMessageAction,
    BasicWorkflowCommitAndPushAction
} from '../actions/basicWorkflowActions';

// ---------------------------
// --- Placeholder Imports ---
// ---------------------------

import {
    branch,
    remote
} from "../components/interactive_elements"

// --------------------
// --- Effect Sagas ---
// --------------------

function* clearCommitBox() { // ! currently not working
    // -- Generator that yields a dispatch by the put() method as to clear commit boxes.
    yield put(BasicWorkflowUpdateCommitMessageAction("",""))
    const commitMessageBox: HTMLInputElement = 
        document.querySelector(".commit-box .commit-message") as HTMLInputElement
    const commitMessageDescription: HTMLTextAreaElement = 
        document.querySelector(".commit-box .commit-description") as HTMLTextAreaElement
    commitMessageBox.value  = ""
    commitMessageDescription.value = ""
}

function* setCommitSuccessAlert() { // ! currently not working
    // -- Generator that yields a dispatch by the put() method as to update the changes area if
    // there's a change on the git status. 
    debugger
    const successStatus = store.getState()?.basicWorkflowReducer.successStatus?.success
    const error = store.getState()?.basicWorkflowReducer.successStatus?.error 
    yield () => {
        if (successStatus === "success") {
            put(CommitSuccessAlertAction())
        }
    }
    yield () => {
        if (successStatus === "error") {
            put(CommitErrorAlertAction(error))
        }
    }
    yield () => {
        if (successStatus === "pending") {
            delay(100)
            put(BasicWorkflowCommitAndPushAction(
                store.getState()?.basicWorkflowReducer.commitMessage,
                store.getState()?.basicWorkflowReducer.commitDescription,
                branch, 
                remote
            ))
        }
    }
}

// -------------------
// --- Watch Sagas ---
// -------------------

function* watchCommit() {
    // -- Watch generator that looks for VIEW_MODIFIED_FILES events and fires up a saga 
    // to update the changes area display
    yield takeLatest('COMMIT_SUCCESS_ALERT',clearCommitBox);
}

function* watchCommitSuccessStatus() {
    // -- Watch generator that looks for SET_GLOBAL_STAGING_STATUS events and fires up a saga 
    // to change the staging status of all elements
    yield takeLatest('BASIC_WORKFLOW_COMMIT_AND_PUSH',setCommitSuccessAlert);
}

// --------------------
// --- Export Sagas ---
// --------------------

export const basicWorkflowSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchCommit),
        fork(watchCommitSuccessStatus)
    ]);
};
