import { put, takeLatest, all, fork, delay } from 'redux-saga/effects';

import { store } from "../store"

import { 
    ViewModifiedFilesAction,
    UpdateChangesAreaAction
} from '../actions/commonActions';

// -------------
// --- Sagas ---
// -------------

// Generator that yields a dispatch by the put() method as to update the display on the parse event
// More info about generators:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* updateChangesArea() {
    yield delay(500)
    yield put(UpdateChangesAreaAction(store.getState()?.viewModifiedFilesReducer.parsedData))
    yield put(ViewModifiedFilesAction())
    // do something
}

// Watch generator that looks for PARSE events and fires up a saga to update the display
function* watchModifiedFiles() {
    // More info about this function on https://redux-saga.js.org/docs/api#takelatestpattern-saga-args
    yield takeLatest('VIEW_MODIFIED_FILES',updateChangesArea);
}

// Main export that conforms all the sagas into a root saga
export const updateChangesSaga = function* root() {
    yield all([
        fork(watchModifiedFiles)
    ]);
};
