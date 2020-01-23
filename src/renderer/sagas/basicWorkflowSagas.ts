// ! ###  - Basic Workflow Sagas - ###

// -----------------------
// --- Effects Imports ---
// -----------------------

import { 
    put, 
    takeLatest, 
    all, 
    fork
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

// ---------------------------------
// --- Workflow Function Imports ---
// ---------------------------------

import { BasicWorkflow } from '../functions/workflows';


import { 
    displayCommitInProcessAlert
} from '../functions';

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

function* doCommitAndPush() {
    const message = store.getState()?.basicWorkflowReducer.commitMessage
    const description = store.getState()?.basicWorkflowReducer.commitDescription
    const remote = store.getState()?.basicWorkflowReducer.remote
    const branch = store.getState()?.basicWorkflowReducer.branch

    const workflow = new BasicWorkflow(
        message ?? "There was no supplied message.",
        branch ?? 'master',
        remote ?? 'origin',
        description ?? ""
    );

    const commitDeed = async () => {
        displayCommitInProcessAlert()
        workflow.commitAndPush()
    }  

    yield commitDeed()
}
// -------------------
// --- Watch Sagas ---
// -------------------

function* watchCommit() {
    // -- Watch generator that looks for VIEW_MODIFIED_FILES events and fires up a saga 
    // to update the changes area display
    yield takeLatest('COMMIT_SUCCESS_ALERT',clearCommitBox);
}

function* watchCommitSuccessStatusPartOne() {
    // -- Watch generator that looks for SET_GLOBAL_STAGING_STATUS events and fires up a saga 
    // to change the staging status of all elements
    yield takeLatest(['BASIC_WORKFLOW_COMMIT_AND_PUSH'],doCommitAndPush);
}
// --------------------
// --- Export Sagas ---
// --------------------

export const basicWorkflowSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchCommit),
        fork(watchCommitSuccessStatusPartOne)
    ]);
};
