// ! ###  - Root Saga File - ###

// ---------------------
// --- Sagas Imports ---
// ---------------------

import { commonSaga } from "./commonSagas.redux.saga"
import { basicWorkflowSaga } from "./basicWorkflowSagas.redux.saga";

// -----------------------
// --- Effects Imports ---
// -----------------------

import { 
    all, 
    fork 
} from 'redux-saga/effects';

// -------------
// --- Sagas ---
// -------------

export const rootSaga = function* root() {
    // -- Main export that conforms all the sagas into a root saga
    yield all([
        fork(commonSaga),
        fork(basicWorkflowSaga)
    ]);
};
