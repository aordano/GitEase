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

import { CommitInfoPane } from "./bottomBlock/commitInfo"

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
    
    const changeContextMenuGraph = () => {
        store.dispatch(SetContextMenuIdAction("graphBackgroundContextMenu"))
    }
    
    const changeContextMenuCommitInfo = () => {
        store.dispatch(SetContextMenuIdAction("graphBackgroundContextMenu"))
    }
    
    const changeContextMenuDiffViewer = () => {
        store.dispatch(SetContextMenuIdAction("graphBackgroundContextMenu"))
    }

    const restoreContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("defaultContextMenu"))
    }

    const currentView = store.getState()!.configInformationReducer.UIConfig.mainView
    const selectedCommit = store.getState()!.configInformationReducer.UIConfig.selectedCommit

    switch (currentView) {
        case "graph":
            return (
                <div
                    className={'bottom-block'}
                    onMouseEnter={changeContextMenuGraph}
                    onMouseLeave={restoreContextMenu}
                >
                    <ViewerComponent />
                    <MouseOverBranchInfo />
                </div>
            )
        case "commitInfo":
            return (
                <div
                    className={'bottom-block'}
                    onMouseEnter={changeContextMenuCommitInfo}
                    onMouseLeave={restoreContextMenu}
                >
                    <CommitInfoPane hash={selectedCommit}/>
                </div>
            )
        
    }

    return null
};



