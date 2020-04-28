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

// ---------------------
// --- Icons Imports ---
// ---------------------

import * as Icon from 'react-feather';

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

import { readConfigSync } from "../../functions/config"

const getLanguage = () => { 

    // ? We do this instead of reading from state because a 
    // ? timeout or async function would get race conditions and break the components
    const configData = readConfigSync()

    let configObject

    if (configData) {
        configObject = JSON.parse(configData)
    }
    return configObject.UIConfig.language
}

const localization = require(`../../lang/${getLanguage()}`)

// -------------------------------------------
// * --- Temporary statements for testing ---
// -------------------------------------------

import { data } from '../../data.mock';

import {
    SetContextMenuIdAction,
    StoreCommitLabelAction,
    SetReactTagDataAction
} from '../../actions/commonActions.redux.action';

import { labelType, ContentNameType } from '../../types';

import { HistoryLabel } from "../rightBlock/history"

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

        // FIXME replace this for the labels config
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

    // TODO Read from state the data of what/why on the changes made and add to the commit message

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
                store.getState()?.configInformationReducer.ReposConfig.activeRepo
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

type CommitDescriptionElementType = {
    name: string,
    fullName: string,
    status: string
}

type CommitMetadataButtonType = {
    id: string
}

const CommitMetadataInputButtonWhat: React.FC<CommitMetadataButtonType> = ({ id }: CommitMetadataButtonType) => {
    
    // TODO Add prompt to write out what has been changed on the file

    // TODO Store in state the message

    // TODO Change the icon to circle-check once the prompt has ben filled

    return (
        <a
            className={"commit-description-metadata-button"}
            id={id}
        >
            <Icon.Circle color={"black"} size={18} />
        </a>
    )
}

const CommitMetadataInputButtonWhy: React.FC<CommitMetadataButtonType> = ({id}: CommitMetadataButtonType) => {
    
    // TODO Add prompt to write out why the file has been changed

    // TODO Store in state the message

    // TODO Change the icon to circle-check once the prompt has ben filled

    return (
        <a
            className={"commit-description-metadata-button"}
            id={id}
        >
            <Icon.Circle color={"black"} size={18} />
        </a>
    )
}

const CommitDescriptionElement: React.FC<CommitDescriptionElementType> = (
    { name, fullName, status }: CommitDescriptionElementType
) => {

    return (
        <li
            className={`files-${status}`}
        >
            <p>{name}</p>
            <CommitMetadataInputButtonWhat
                id={`commit-metadata-button-${fullName.replace(" ","")}-what`}
            />
            <CommitMetadataInputButtonWhy
                id={`commit-metadata-button-${fullName.replace(" ","")}-why`}
            />
        </li>
    )
}

export const CommmitDescription: React.FC = () => {
    // -- Component that contains the commit box message description
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer);

    const changesTree = useSelector(state => state.updateChangesAreaReducer.changesAreaTree)

    const stagingStatus = changesTree.map((value) => { return value.staged })

    const stagedElementsList: React.FunctionComponentElement<CommitDescriptionElementType>[] = []

    const parseName = (element: string | ContentNameType) => {
        if (typeof element === "string") {
            return element.slice(element.lastIndexOf("/") + 1, element.length)
        }

        return element.to.slice(element.to.lastIndexOf("/") + 1, element.to.length)
    }

    const parseFullName = (element: string | ContentNameType) => {
        if (typeof element === "string") {
            return element
        }

        return element.to
    }
    
    for (let i = 0; i < stagingStatus.length; i += 1) {
        if (stagingStatus[i]) {
            stagedElementsList.push(
                React.createElement(CommitDescriptionElement,{
                    name: parseName(changesTree[i].content),
                    fullName: parseFullName(changesTree[i].content),
                    status: changesTree[i].status,
                    key: `ID_COMMIT_DESCRIPTION_ELEMENT_${i}`
                })
            )
        }
    }

    return (
        <ul
            className={"commit-description-list"}
        >
            {stagedElementsList}
        </ul>
    );
};
