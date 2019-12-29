import { basicWorkflowSaga } from './basicWorkflowSagas';

import { all, fork } from 'redux-saga/effects';

// -------------
// --- Sagas ---
// -------------

// Generator that yields a dispatch by the put() method as to update the display on the parse event
// More info about generators:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

// Main export that conforms all the sagas into a root saga
export const rootSaga = function* root() {
    yield all([fork(basicWorkflowSaga)]);
};
