/**
 * # app.tsx
 * 
 * ## This file is the entry point for the renderer side of Electron.
 * 
 * ## It contains mainly imports from other parts of the application, plus a couple of things that must be executed first;
 * 
 * * Renders the react view
 * * Generates the titlebar
 * * Fires the selected workflow (WIP)
 * * Fires the action for the main view
 * * Fires the action for the changes area
 *  
 * @packageDocumentation
 */

// ---------------------
// --- React imports ---
// ---------------------

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// ---------------------
// --- Redux imports ---
// ---------------------

import { Provider } from 'react-redux';

import { BasicWorkflowInitAction } from './actions/basicWorkflowActions.redux.action';
import { ViewModifiedFilesAction, UpdateViewTreeAction } from './actions/commonActions.redux.action';

import { store, sagaMiddleware } from './store/index.redux.store';

// --------------------------
// --- Redux Saga imports ---
// --------------------------

import { rootSaga } from './sagas/index.redux.saga';

// ---------------------------
// --- Hot Loading imports ---
// ---------------------------

import { AppContainer } from 'react-hot-loader';

// --------------------------
// --- Components imports ---
// --------------------------

import Application from './components/Application';

import { createMenu } from "./components/menuBar"

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Create render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        mainElement
    );
};

// Generates menu bar
createMenu();

// Render components
render(Application);

if (
    localStorage.getItem("firstTimeWizardCompleted") === undefined || 
    localStorage.getItem("firstTimeWizardCompleted") === null
) {
    localStorage.setItem("firstTimeWizardCompleted","0") // ! Change this to "0" to avoid wizard skip
}

// Inits the workflow given by the config file on the working dir
// TODO -- Actually make this dependent on the .gitease file on the working dir
// TODO and not preset to the basic workflow.
store.dispatch(BasicWorkflowInitAction());


// Executes the viewer initialization after a timeout to avoid race condition errors
setTimeout(() => {
    store.dispatch(ViewModifiedFilesAction())
},50)

// Executes root saga
sagaMiddleware.run(rootSaga);

// Executes the git tree viewer after a timeout to avoid race condition errors
setTimeout(() => {
    store.dispatch(UpdateViewTreeAction())
}, 5000)
