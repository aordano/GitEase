import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { BasicWorkflowInitAction } from './actions/basicWorkflowActions.redux.action';

import Application from './components/Application';
import { store, sagaMiddleware } from './store/index.redux.store';

// Imports Sagas
import { rootSaga } from './sagas/index.redux.saga';
import { ViewModifiedFilesAction, UpdateViewTreeAction } from './actions/commonActions.redux.action';

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
