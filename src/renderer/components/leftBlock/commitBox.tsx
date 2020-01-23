// ! ###  - Commit Box Components - ###
// *
// *  The Commit Box components handle the 
// *  displaying and behaviour of the commit 
// *  button/message input.

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
    useSelector
} from '../../types';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../../actions/basicWorkflowActions';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../../lang/${lang}`)


// -------------------------------------------
// * --- Temporary statements for testing ---
// -------------------------------------------

export const branch = 'experiments';
const USER = 'aordano';
import {PASS} from "../../../../.secrets"
const REPO = 'github.com/aordano/GitEase';
export const remote = `https://${USER}:${PASS}@${REPO}`;

// -------------------------
// --- Commit Components ---
// -------------------------

export const CommitMessageInput: React.FC = () => {
    // -- Component that contains the commit box message description
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer)
    const handleCommitTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
        store.dispatch(
            BasicWorkflowUpdateCommitMessageAction(
                // -- Requires to pass both the message and description to the state so they
                // mantain synchronization.
                event.currentTarget.value,
                currentState.commitDescription
            )
        );
    };

    return <input 
        title={localization.commitMessageTooltip} 
        className={'commit-message'} 
        placeholder={localization.commitMessagePlaceholder} 
        value={input} 
        onChange={handleCommitTextChange} 
    />;
};

export const CommitButton: React.FC = () => {
    // -- Button that handles the commit/push on the basic workflow.

    // TODO Change the button logic to dispatch the correct action given the workflow

    const currentState = useSelector(state => state.basicWorkflowReducer);
    const handleCommitButtonPress = () => {
        store.dispatch(
            BasicWorkflowCommitAndPushAction(
                currentState.commitMessage,
                currentState.commitDescription,
                branch, 
                remote
            )
        );
    };

    return <input 
        title={localization.commitButtonTooltip} 
        type={'button'} 
        className={'commit-button'} 
        onClick={handleCommitButtonPress} 
        value={localization.commitButtonText}
    />;
};

export const CommmitDescription: React.FC = () => {
    // -- Component that contains the commit box message description
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer)

    const handleCommitDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.currentTarget.value);
        store.dispatch(
            BasicWorkflowUpdateCommitMessageAction(
                // -- Requires to pass both the message and description to the state so they
                // mantain synchronization.
                currentState.commitMessage,
                event.currentTarget.value
            )
        );
    };

    return (
        <textarea 
            placeholder={localization.commitDescriptionPlaceholder} 
            className={'commit-description'} 
            value={input}
            onChange={handleCommitDescriptionChange}
        />
    )
}