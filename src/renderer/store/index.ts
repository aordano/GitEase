// ! ###  - Redux Store - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { 
    applyMiddleware, 
    createStore, 
    Store 
} from 'redux';

import { rootReducer } from '../reducers';

// ------------------------
// --- DevTools Imports ---
// ------------------------

import { composeWithDevTools } from 'redux-devtools-extension';

// -------------------------------
// --- Saga Middleware Imports ---
// -------------------------------

import createSagaMiddleware from 'redux-saga';

// -----------------------------------
// --- Saga Middleware Declaration ---
// -----------------------------------

export const sagaMiddleware = createSagaMiddleware();

// ---------------------------
// --- Store Configuration ---
// ---------------------------

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
    const middlewares: any[] = [];
    const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
    return createStore(rootReducer, initialState, enhancer);
};

export const store = configureStore();

// -----------------------------
// --- Hot Reducer Reloading ---
// -----------------------------

if (typeof module.hot !== 'undefined') {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer)
    );
}

// ---------------
// --- Exports ---
// ---------------

export type RootState = ReturnType<typeof rootReducer>;

export default store;
