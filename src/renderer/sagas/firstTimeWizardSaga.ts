// ! ###  - First Time Wizard Sagas - ###

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

// --------------------
// --- Effect Sagas ---
// --------------------

function* launchWizard() {
    // -- Generator that yields a dispatch by the put() method as to update the changes area if
    // there's a change on the git status.
    
}
// -------------------
// --- Watch Sagas ---
// -------------------


function* watchWizardLaunch() {
    // -- Watch generator that looks for SET_GLOBAL_STAGING_STATUS events and fires up a saga 
    // to change the staging status of all elements
    yield takeLatest('LAUNCH_FIRST_TIME_WIZARD',launchWizard);
}

// --------------------
// --- Export Sagas ---
// --------------------

export const firstTimeWizardSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(watchWizardLaunch)
    ]);
};
