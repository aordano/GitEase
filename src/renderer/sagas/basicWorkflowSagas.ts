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
    CommitErrorAlertAction,
    UpdateCommitSuccessStatusAction
} from '../actions/commonActions';

import { 
    BasicWorkflowUpdateCommitMessageAction,
    BasicWorkflowDeedDoneAction, 
    BasicWorkflowDeedFailedAction
} from '../actions/basicWorkflowActions';

// ---------------------------------
// --- Workflow Function Imports ---
// ---------------------------------

import { BasicWorkflow } from '../components/functions/workflows';


import { 
    displayCommitInProcessAlert
} from '../components/functions';

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

    yield delay(50)

    const successStatus = store.getState()?.basicWorkflowReducer.successStatus?._v.success
    const error = store.getState()?.basicWorkflowReducer.successStatus?._v.error 

    if (successStatus === "success") {
        yield put(CommitSuccessAlertAction())
        return
    }

    if (successStatus === "error") {
        yield put(CommitErrorAlertAction(error))
        return
    }

    yield delay(200)
    yield put(UpdateCommitSuccessStatusAction())
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

    function* failure() {
        yield put(BasicWorkflowDeedDoneAction())
    }

    function* success() {
        yield put(BasicWorkflowDeedDoneAction())
    }

    yield commitDeed().then(
        success,
        failure
    )
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

function* watchCommitSuccessStatusPartTwo() {
    // -- Watch generator that looks for SET_GLOBAL_STAGING_STATUS events and fires up a saga 
    // to change the staging status of all elements
    yield takeLatest(["UPDATE_COMMIT_SUCCESS_STATUS"],setCommitSuccessAlert);
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
