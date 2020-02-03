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
    BasicWorkflowUpdateCommitMessageAction, BasicWorkflowInitAction
} from '../actions/basicWorkflowActions';

// ---------------------------------
// --- Workflow Function Imports ---
// ---------------------------------

import { BasicWorkflow } from '../functions/workflows';

import { 
    displayCommitInProcessAlert
} from '../functions';

import { UpdateViewTreeAction } from '../actions/commonActions';

// --------------------
// --- Effect Sagas ---
// --------------------

function* clearCommitBox() {
    // -- This generator is in place because sometimes because of race conditions the 
    // state cleared on the success alert reducer may not get late enough as to keep cleared.
    // -- Generator that yields a dispatch by the put() method as to clear commit boxes.
    yield put(BasicWorkflowUpdateCommitMessageAction("",""))
    const commitMessageBox: HTMLInputElement = 
        document.querySelector(".commit-box .commit-message") as HTMLInputElement
    const commitMessageDescription: HTMLTextAreaElement = 
        document.querySelector(".commit-box .commit-description") as HTMLTextAreaElement
    commitMessageBox.value  = ""
    commitMessageDescription.value = ""
}

function* updateViewTree() {
    // -- 
    yield put(UpdateViewTreeAction())
}


function* doCommitAndPush() {
    // Function Generator that executes the commit and push process.

    // Grabs information from the state
    const message = store.getState()?.basicWorkflowReducer.commitMessage
    const description = store.getState()?.basicWorkflowReducer.commitDescription
    const remote = store.getState()?.basicWorkflowReducer.remote
    const branch = store.getState()?.basicWorkflowReducer.branch
    const workingDir = store.getState()?.basicWorkflowReducer.workingDir

    // Then passes the information to the workflow constructor
    const workflow = new BasicWorkflow(
        message ?? "There was no supplied message.",
        branch ?? 'master',
        remote ?? 'origin',
        description ?? "",
        workingDir ?? ""
    );

    // -- Defines the async proccess for the displaying of the loader and the execution
    // of the commit, push and fetch.
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
    // -- Watch generator that looks for a commit succes flag and fires up a saga 
    // to clear the commit textbox.
    yield takeLatest('COMMIT_SUCCESS_ALERT',clearCommitBox);
    yield takeLatest('COMMIT_SUCCESS_ALERT',updateViewTree);
}

function* watchCommitSuccessStatus() {
    // -- Watch generator that looks for commit button events and fires up a saga 
    // to execute the commit, push and fetch.
    yield takeLatest(['BASIC_WORKFLOW_COMMIT_AND_PUSH'],doCommitAndPush);
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
