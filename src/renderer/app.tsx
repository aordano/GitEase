import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { basicWorkflowInitAction } from './actions/basicWorkflowActions';

import Application from './components/Application';
import { store, sagaMiddleware } from './store';

// Imports Sagas
import { rootSaga } from './sagas';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
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

render(Application);

store.dispatch(basicWorkflowInitAction());

// Executes root saga
sagaMiddleware.run(rootSaga);
