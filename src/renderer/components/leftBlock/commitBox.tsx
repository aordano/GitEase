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

// tslint:disable-next-line: import-name
import ReactTags from 'react-tag-autocomplete'

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

const mockData = require("../../data.mock")

const localization = require(`../../lang/${mockData.lang}`)

// -------------------------------------------
// * --- Temporary statements for testing ---
// -------------------------------------------

import { data } from '../../data.mock';

import {
    SetContextMenuIdAction,
    StoreCommitLabelAction,
    SetReactTagDataAction
} from '../../actions/commonActions.redux.action';

import { labelType } from '../../types';

import { HistoryLabel } from "../rightBlock/history"

// -------------------------
// --- Commit Components ---
// -------------------------

export const CommitMessageInput: React.FC = () => {
    // -- Component that contains the commit box message description
    
    // TODO replace por useSelector and redux state

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

    const tags = useSelector(state => state.reactTagDataReducer.tags)

    const handleDelete = () => {
        // dummy function.
        return
    }
     
    const handleAddition = (tag: any) => { // HACK TS complains about types but won't let me import the Tag type here
        store.dispatch(SetReactTagDataAction({ tagData: [tag], suggestions: tags.suggestions }))
    }
        
    const removeTag = () => {
        if (tags.tagData) {
            const workingTags = tags.tagData
            workingTags.forEach(() => { workingTags.shift() })
            store.dispatch(SetReactTagDataAction({ tagData: workingTags, suggestions: tags.suggestions }))
            store.dispatch(StoreCommitLabelAction(""))
        }
    }

    if (tags.tagData && tags.tagData.length > 0) {

        const tagNames = tags.tagData.map((value) => { return value.name })
        
        const tagsPayload = `${tagNames[0]}:`

        store.dispatch(StoreCommitLabelAction(tagsPayload))

        const availableLabels = mockData.labelsDictionary.map((value: labelType) => { return value.label })
        
        return <div className={"commit-message-subwrapper"}>
                    <div
                        style={{display: "inherit"}}
                        onClick={removeTag}
                    >
                        <HistoryLabel
                            label={tagsPayload}
                            labelColor={mockData.labelsDictionary[availableLabels.indexOf(tagNames[0])].labelColor}
                        />
                    </div>
                    <input
                        title={localization.commitMessageTooltip}
                        className={'commit-message'}
                        placeholder={localization.commitMessagePlaceholder}
                        value={input}
                        onChange={handleCommitTextChange}
                    />
                </div>
    }

    return (
        <ReactTags
            suggestions={tags.suggestions as any}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
        />
    );
};

export const CommitButton: React.FC = () => {
    // -- Button that handles the commit/push on the basic workflow.

    // TODO Change the button logic to dispatch the correct action given the workflow

    const currentState = useSelector(state => state.basicWorkflowReducer);
    const commitLabel = useSelector(state => state.reactTagDataReducer.label)
    const handleCommitButtonPress = () => {
        const commitLabel = store.getState()?.reactTagDataReducer.label
        store.dispatch(
            BasicWorkflowCommitAndPushAction(
                `${commitLabel}${currentState.commitMessage}`,
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

    if (commitLabel === "") {
        return null
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
