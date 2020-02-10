// ! ###  - Top Block Elements - ###

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

import { store } from '../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    ChangesTreeType,
    StagingCheckboxIndexType,
    SpinnerType
} from '../types';

import { useSelector } from "../types/redefinitions"

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../actions/basicWorkflowActions.redux.action';

import {
    SetStagingStatusAction,
    SetGlobalStagingStatusAction
} from '../actions/commonActions.redux.action';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../lang/${lang}`)

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/topBlock.scss');

// --------------------------
// --- Components Imports ---
// --------------------------

import {
    ActionsSpace
} from "./topBlock/actionsSpace"

// ----------------------------
// --- Top Block Components ---
// ----------------------------

export const TopBlock: React.FC = () => {
    // -- Simple container that holds the actions space components.

    // TODO Change name from ActionsComponent to ActionsSpace

    // TODO Swao the buttons given the workflow context

    return (
        <div className={'top-block'}>
            <ActionsSpace />
        </div>
    );
};