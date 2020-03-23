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

import { store } from '../../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { useSelector } from '../../types/redefinitions';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../../actions/basicWorkflowActions.redux.action';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = 'en_US';

const localization = require(`../../lang/${lang}`);

// -------------------------------------------
// * --- Temporary statements for testing ---
// -------------------------------------------

import { data } from '../../data.mock';
import { SetContextMenuIdAction } from '../../actions/commonActions.redux.action';

// -------------------------
// --- Commit Components ---
// -------------------------

export const CommitMessageInput: React.FC = () => {
    // -- Component that contains the commit box message description
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer);
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

    return (
        <input
            title={localization.commitMessageTooltip}
            className={'commit-message'}
            placeholder={localization.commitMessagePlaceholder}
            value={input}
            onChange={handleCommitTextChange}
        />
    );
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
                data.branch, // TODO Populate with values from config
                data.remote,
                data.workingDir
            )
        );
    };

    const changeContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("commitButtonContextMenu"))
    }

    const restoreContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("defaultContextMenu"))
    }

    return (
        <input
            title={localization.commitButtonTooltip}
            type={'button'}
            className={'commit-button'}
            onClick={handleCommitButtonPress}
            onMouseEnter={changeContextMenu}
            onMouseLeave={restoreContextMenu}
            value={localization.commitButtonText}
        />
    );
};

export const CommmitDescription: React.FC = () => {
    // -- Component that contains the commit box message description
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer);

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
    );
};
