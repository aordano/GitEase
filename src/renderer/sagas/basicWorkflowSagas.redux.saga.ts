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

// --------------------
// --- Type Imports ---
// --------------------

import { gitDescriptionObjectType } from "../types"

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
    const descriptionWhat = store.getState()?.gitCommitDescriptionReducer.descriptionWhat
    const descriptionWhy = store.getState()?.gitCommitDescriptionReducer.descriptionWhy
    const changedElements = store.getState()!.gitCommitDescriptionReducer.changedElements

    // TODO Generare error result if not every element is readied
    const elementsReadiedIndexes: number[] = []

    store.getState()?.gitCommitDescriptionReducer.completionStatus
        .forEach((value, index) => {
            if (value.isWhatCompleted && value.isWhyCompleted) {
                elementsReadiedIndexes.push(index)
            }
        })
    
    const readiedElements: string[] = []

    if (elementsReadiedIndexes) {
        let localIndex = 0
        changedElements.forEach((value, index) => {
            if (index === elementsReadiedIndexes[localIndex]) {
                localIndex += 1
                readiedElements.push(value)
            }
        })
        
    }
   
    const remote = store.getState()?.configInformationReducer.CurrentGitConfig.currentRemote
    const branch = store.getState()?.configInformationReducer.CurrentGitConfig.currentBranch
    const workingDir = store.getState()?.configInformationReducer.ReposConfig.activeRepo

    const composeDescription = (
        descriptionWhat: string[],
        descriptionWhy: string[],
        readiedElements: string[]
    ) => {
        const descriptionObject: gitDescriptionObjectType[] = []

        for (let i = 0; i < readiedElements.length; i += 1) {
            
            descriptionObject.push({
                name: readiedElements[i],
                what: descriptionWhat[elementsReadiedIndexes[i]],
                why: descriptionWhy[elementsReadiedIndexes[i]]
            })
        }

        return descriptionObject
    }

    // Then passes the information to the workflow constructor

    let workflow: BasicWorkflow

    if (descriptionWhat && descriptionWhy && readiedElements) {
        workflow = new BasicWorkflow(
            message ?? "There was no supplied message.",
            composeDescription(descriptionWhat, descriptionWhy, readiedElements),
            branch ?? 'master',
            remote ?? 'origin',
            workingDir ?? ""
        );
    } else {
        workflow = new BasicWorkflow(
            message ?? "There was no supplied message.",
            [],
            branch ?? 'master',
            remote ?? 'origin',
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
