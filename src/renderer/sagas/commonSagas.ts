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

import { store } from "../store"

// ----------------------
// --- Action Imports ---
// ----------------------

import { 
    ViewModifiedFilesAction,
    UpdateChangesAreaAction
} from '../actions/commonActions';

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

// -------------------
// --- Watch Sagas ---
// -------------------

function* watchModifiedFiles() {
    // -- Watch generator that looks for VIEW_MODIFIED_FILES events and fires up a saga 
    // to update the changes area display
    yield takeLatest('VIEW_MODIFIED_FILES',updateChangesArea);
}

// --------------------
// --- Export Sagas ---
// --------------------

export const updateChangesSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchModifiedFiles)
    ]);
};
