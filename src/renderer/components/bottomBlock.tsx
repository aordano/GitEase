// ! ###  - Bottom Block Elements - ###

// TODO This file lacks everything practically

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// tslint:disable-next-line: no-duplicate-imports
import { useState } from 'react';

// ---------------------
// --- Store Imports ---
// ---------------------

import { store } from '../store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    useSelector,
    ChangesTreeType,
    StagingCheckboxIndexType,
    SpinnerType
} from '../types';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../actions/basicWorkflowActions';

import {
    SetStagingStatusAction,
    SetGlobalStagingStatusAction
} from '../actions/commonActions';

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

    // TODO Make the viewer zoomable, scrollable and pan-able

    return (
        <div className={'bottom-block'}>
            <ViewerComponent />
        </div>
    );
};