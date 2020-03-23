// ! ###  - Actions Space Elements - ###

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

import { store } from '../../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    ChangesTreeType,
    StagingCheckboxIndexType,
    SpinnerType
} from '../../types';

import { useSelector } from "../../types/redefinitions"

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../../actions/basicWorkflowActions.redux.action';

import {
    SetStagingStatusAction,
    SetGlobalStagingStatusAction
} from '../../actions/commonActions.redux.action';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../../data.mock")

const localization = require(`../../lang/${mockData.lang}`)

// --------------------------------
// --- Actions Space Components ---
// --------------------------------

export const ActionsSpace: React.FC = () => {
    // -- Simple dummy test component.

    // TODO Create the buttons to perform the functions for every workflow

    return (
        <div className={'actions-space'}>
            <h2>Actions space</h2>
            <input type={'button'}/>
        </div>
    );
};