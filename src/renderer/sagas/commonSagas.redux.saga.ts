// ! ###  - Common Sagas - ###

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
    ViewModifiedFilesAction,
    UpdateChangesAreaAction,
    SetStagingStatusAction
} from '../actions/commonActions.redux.action';

// --------------------
// --- Effect Sagas ---
// --------------------

function* updateChangesArea() {
    // -- Generator that yields a dispatch by the put() method as to update the changes area if
    // there's a change on the git status.
    yield delay(500)
    yield put(UpdateChangesAreaAction(store.getState()?.viewModifiedFilesReducer.parsedData))
    yield put(ViewModifiedFilesAction())
}

function* setGlobalStagingStatus() {
    // -- Generator that yields a dispatch by the put() method to change the staging
    // status of all elements present in the staging area.
    const changesTree = store.getState()?.updateChangesAreaReducer.changesAreaTree ?? []
    for (let i = 0; i < changesTree?.length ; i += 1) {
        yield put(SetStagingStatusAction(i))
        const currentCheckbox: any = document.querySelectorAll(".changes-list input")[i]
        currentCheckbox.checked = !currentCheckbox.checked
    }
}

// -------------------
// --- Watch Sagas ---
// -------------------

function* watchModifiedFiles() {
    // -- Watch generator that looks for VIEW_MODIFIED_FILES events and fires up a saga 
    // to update the changes area display
    yield takeLatest('VIEW_MODIFIED_FILES',updateChangesArea);
}

function* watchGlobalStagingStatus() {
    // -- Watch generator that looks for SET_GLOBAL_STAGING_STATUS events and fires up a saga 
    // to change the staging status of all elements
    yield takeLatest('SET_GLOBAL_STAGING_STATUS',setGlobalStagingStatus);
}

// --------------------
// --- Export Sagas ---
// --------------------

export const commonSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchModifiedFiles),
        fork(watchGlobalStagingStatus)
    ]);
};
