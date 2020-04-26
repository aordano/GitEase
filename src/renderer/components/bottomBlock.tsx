// ! ###  - Bottom Block Elements - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// --------------------------
// --- Components Imports ---
// --------------------------

import {
    ViewerComponent,
    MouseOverBranchInfo
} from "./bottomBlock/viewer"

// ---------------------
// --- Store Imports ---
// ---------------------

// tslint:disable-next-line: import-name
import store from '../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { SetContextMenuIdAction } from '../actions/commonActions.redux.action';

// -------------------------------
// --- Bottom Block Components ---
// -------------------------------

export const BottomBlock: React.FC = () => {
    // -- Simple container that holds the viewer components.
    
    const changeContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("graphBackgroundContextMenu"))
    }

    const restoreContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("defaultContextMenu"))
    }

    return (
        <div
            className={'bottom-block'}
            onMouseEnter={changeContextMenu}
            onMouseLeave={restoreContextMenu}
        >
            <ViewerComponent />
            <MouseOverBranchInfo />
        </div>
    );
};



