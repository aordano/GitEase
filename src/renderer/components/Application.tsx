// ! ###  - Main App Component - ###

// ---------------------
// --- React Imports ---
// ---------------------

import { hot } from 'react-hot-loader/root';
import * as React from 'react';

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/main.scss');

// -------------------------
// --- Component Imports ---
// -------------------------

import { 
    CommitComponent, 
    ActionsComponent 
} from './interactive_elements';

import { ViewerComponent } from './viewer';

// --------------------------
// --- Main App Component ---
// --------------------------

const Application = () => (
    <div>
        <div className={'left-block'}>
            <CommitComponent />
        </div>
        <div className={'main-block'}>
            <ActionsComponent />
            <ViewerComponent />
        </div>
    </div>
);

export default hot(Application);
