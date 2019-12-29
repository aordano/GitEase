import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Imports the Redux-Saga middleware creator
// More info on https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
// And the documentation is on https://redux-saga.js.org/docs/api#createsagamiddlewareoptions
// tslint:disable-next-line: import-name
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../reducers';

export const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
    const middlewares: any[] = [];
    const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
    return createStore(rootReducer, initialState, enhancer);
};

export const store = configureStore();

if (typeof module.hot !== 'undefined') {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer)
    );
}

// Exports RootState type as needed by TypeScript
export type RootState = ReturnType<typeof rootReducer>;

export default store;
