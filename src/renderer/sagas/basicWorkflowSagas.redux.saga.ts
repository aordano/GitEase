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

import { store } from "../store/index.redux.store"

// ----------------------
// --- Action Imports ---
// ----------------------

import { 
    BasicWorkflowUpdateCommitMessageAction, BasicWorkflowInitAction
} from '../actions/basicWorkflowActions.redux.action';

// ---------------------------------
// --- Workflow Function Imports ---
// ---------------------------------

import { BasicWorkflow } from '../functions/workflows';

import { 
    displayCommitInProcessAlert
} from '../functions';

import { UpdateViewTreeAction } from '../actions/commonActions.redux.action';

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
    const descriptionWhat = store.getState()?.basicWorkflowReducer.commitDescriptionWhat
    const descriptionWhy = store.getState()?.basicWorkflowReducer.commitDescriptionWhy
    const changedElements = store.getState()?.basicWorkflowReducer.changedElements
    const remote = store.getState()?.configInformationReducer.CurrentGitConfig.currentRemote
    const branch = store.getState()?.configInformationReducer.CurrentGitConfig.currentBranch
    const workingDir = store.getState()?.configInformationReducer.ReposConfig.activeRepo

    const composeDescription = (
        descriptionWhat: string[],
        descriptionWhy: string[],
        changedElements: string[]
    ) => {
        let descriptionString = ""

        for (let i = 0; i < changedElements.length; i += 1) {
            if (i === 0) {
                descriptionString = `//FILE// ${changedElements[i]} //WHAT// ${descriptionWhat[i]} //WHY// ${descriptionWhy[i]}`
            }

            descriptionString = `${descriptionString}\n//FILE//${changedElements[i]}//WHAT//${descriptionWhat[i]}//WHY//${descriptionWhy[i]}`
        }

        return descriptionString
    }

    // Then passes the information to the workflow constructor

    let workflow: BasicWorkflow

    if (descriptionWhat && descriptionWhy && changedElements) {
        workflow = new BasicWorkflow(
            message ?? "There was no supplied message.",
            branch ?? 'master',
            remote ?? 'origin',
            composeDescription(descriptionWhat, descriptionWhy, changedElements) ?? "",
            workingDir ?? ""
        );
    } else {
        workflow = new BasicWorkflow(
            message ?? "There was no supplied message.",
            branch ?? 'master',
            remote ?? 'origin',
            "",
            workingDir ?? ""
        );
    }

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
