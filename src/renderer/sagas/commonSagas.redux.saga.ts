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

// ------------------------
// --- Function Imports ---
// ------------------------

import {
    parseStatus
} from "../functions/index"

// ----------------------
// --- Action Imports ---
// ----------------------

import { 
    SetStagingStatusAction
} from '../actions/commonActions.redux.action';

// --------------------
// --- Effect Sagas ---
// --------------------

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
        fork(watchGlobalStagingStatus)
    ]);
};
