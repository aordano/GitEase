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

import { store } from '../../store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    useSelector,
    ChangesTreeType,
    StagingCheckboxIndexType,
    SpinnerType
} from '../../types';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../../actions/basicWorkflowActions';

import {
    SetStagingStatusAction,
    SetGlobalStagingStatusAction
} from '../../actions/commonActions';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../../lang/${lang}`)

// ----------------------
// --- Static Imports ---
// ----------------------

require('../../static/scss/wizards/firstTime.scss');

// --------------------------------
// --- Actions Space Components ---
// --------------------------------

export const FirstTimeWizard: React.FC = () => {
    // -- Simple dummy test component.

    // TODO Create the buttons to perform the functions for every workflow

    return (
        <div className={'first-time-wizard'}>
            <h2>{localization.firstTimeWizardTitle}</h2>
        </div>
    )
};