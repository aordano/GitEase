// ! ###  - Bottom Block Elements - ###

// TODO This file lacks everything practically

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

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

// -------------------------------
// --- Bottom Block Components ---
// -------------------------------

export const BottomBlock: React.FC = () => {
    // -- Simple container that holds the viewer components.

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