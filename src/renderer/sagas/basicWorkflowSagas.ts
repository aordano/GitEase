// ! ###  - Basic Workflow Sagas - ###

// -----------------------
// --- Effects Imports ---
// -----------------------

import { 
    put, 
    takeLatest, 
    take,
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
    CommitErrorAlertAction,
    UpdateCommitSuccessStatusAction
} from '../actions/commonActions';

import { 
    BasicWorkflowUpdateCommitMessageAction, BasicWorkflowCommitAndPushAction
} from '../actions/basicWorkflowActions';

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

function* setCommitSuccessAlertPartOne() { // ! currently not working
    // -- Generator that yields a dispatch by the put() method as to update the changes area if
    // there's a change on the git status. 
    yield delay(500)
    yield put(UpdateCommitSuccessStatusAction())
}

function* setCommitSuccessAlertPartTwo() { // ! currently not working
    // -- Generator that yields a dispatch by the put() method as to update the changes area if
    // there's a change on the git status. 
    const successStatus = store.getState()?.basicWorkflowReducer.successStatus?.success
    const error = store.getState()?.basicWorkflowReducer.successStatus?.error 

    debugger

    if (successStatus === "success") {
        return yield put(CommitSuccessAlertAction())
    }

    if (successStatus === "error") {
        return yield put(CommitErrorAlertAction(error))
    }
    yield delay(200)
    yield put(UpdateCommitSuccessStatusAction())
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
    yield takeLatest(['BASIC_WORKFLOW_COMMIT_AND_PUSH'],setCommitSuccessAlertPartOne);
}

function* watchCommitSuccessStatusPartTwo() {
    // -- Watch generator that looks for SET_GLOBAL_STAGING_STATUS events and fires up a saga 
    // to change the staging status of all elements
    yield takeLatest(["UPDATE_COMMIT_SUCCESS_STATUS"],setCommitSuccessAlertPartTwo);
}

// --------------------
// --- Export Sagas ---
// --------------------

export const basicWorkflowSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchCommit),
        fork(watchCommitSuccessStatusPartOne),
        fork(watchCommitSuccessStatusPartTwo),
    ]);
};
