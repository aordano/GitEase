// ! ###  - Bottom Block Elements - ###

// TODO This file lacks everything practically

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../data.mock")

const localization = require(`../lang/${mockData.lang}`)

// --------------------------
// --- Components Imports ---
// --------------------------

import {
    ViewerComponent
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
            <ViewerComponent/>
            <div
                className={"node-details-popup"}
                onMouseEnter={changeContextMenu}
                onMouseLeave={changeContextMenu}
            >
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    );
};



