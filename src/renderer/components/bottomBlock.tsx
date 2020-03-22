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

const lang = "en_US"

const localization = require(`../lang/${lang}`)

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
    const viewerElement = document.getElementById("graphViewer-graph-wrapper") as HTMLElement

    const setBottomBlockContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("backgroundGraphContextMenu"))

        const rightClick = new MouseEvent("oncontextmenu")

        viewerElement.dispatchEvent(rightClick)

    }

    if (viewerElement) {
        viewerElement.addEventListener("oncontextmenu", setBottomBlockContextMenu) 
    }

    return (
        <div className={'bottom-block'}>
            <ViewerComponent />
            <div className={"node-details-popup"}>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    );
};



