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

import {
    UpdateCommitDescriptionViewAction,
    UpdateCommitDescriptionElementNameAction,
    UpdateCommitDescriptionElementWhatAction,
    UpdateCommitDescriptionElementWhyAction,
    UpdateCommitDescriptionElementCompletionStatusAction,
    SetContextMenuIdAction,
    StoreCommitLabelAction,
    SetReactTagDataAction
} from "../../actions/commonActions.redux.action"

// ----------------------------
// --- Localization Imports ---
// ----------------------------

import { readConfigSync, readLabelsSync } from "../../functions/config"

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

import { ContentNameType } from '../../types';

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
                currentState.commitDescriptionWhat,
                currentState.commitDescriptionWhy,
                currentState.changedElements
            )
        );
    };

    const tags = useSelector(state => state.reactTagDataReducer.tags)

    const handleDelete = () => {
        // ? Dummy function. Needed because is required by the ReactTags component
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

        const availableLabels = store.getState()!.reactTagDataReducer.tags.suggestions.map(
            (value) => { return value.name }
        )

        const labelRawData = readLabelsSync()
        let labelParsedData

        if (labelRawData) {
            labelParsedData = JSON.parse(labelRawData)
        }
        
        return <div className={"commit-message-subwrapper"}>
                    <div
                        style={{display: "inherit"}}
                        onClick={removeTag}
                    >
                        <HistoryLabel
                            label={tagsPayload}
                            labelColor={labelParsedData[availableLabels.indexOf(tagNames[0])].labelColor}
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
    
    // ? Gets called in a child arrow function so we can't use a hook here
    const commitLabel = store.getState()?.reactTagDataReducer.label

    const handleCommitButtonPress = () => {

        store.dispatch(
            BasicWorkflowCommitAndPushAction(
                `${commitLabel}${currentState.commitMessage}`,
                currentState.changedElements,
                currentState.commitDescriptionWhat,
                currentState.commitDescriptionWhy,
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
    status: string,
    index: number
}

type CommitMetadataButtonType = {
    id: string,
    index: number,
    name: string
}

const CommitMetadataInputButtonWhat: React.FC<CommitMetadataButtonType> = (
    { id, index, name}: CommitMetadataButtonType
) => {

    const completionStatus = useSelector(state => state.gitCommitDescriptionReducer.completionStatus)[index]
    
    const handleWhatMetadataPopup = () => {

        store.dispatch(UpdateCommitDescriptionViewAction("what"))
        store.dispatch(UpdateCommitDescriptionElementNameAction(index, name))
        window.localStorage.setItem("currentSelectedIndex", String(index))
    }

    return (
        <a
            onClick={handleWhatMetadataPopup}
            className={"commit-description-metadata-button"}
            id={id}
        >
            {
                completionStatus.isWhatCompleted
                ? <Icon.CheckCircle color={"black"} size={18} />
                : <Icon.Circle color={"black"} size={18} />
            }
        </a>
    )
}

const CommitMetadataInputButtonWhy: React.FC<CommitMetadataButtonType> = (
    { id, index, name}: CommitMetadataButtonType
) => {

    const completionStatus = useSelector(state => state.gitCommitDescriptionReducer.completionStatus)[index]
    
    const handleWhyMetadataPopup = () => {
        store.dispatch(UpdateCommitDescriptionViewAction("why"))
        store.dispatch(UpdateCommitDescriptionElementNameAction(index, name))
        window.localStorage.setItem("currentSelectedIndex", String(index))
    }

    return (
        <a
            onClick={handleWhyMetadataPopup}
            className={"commit-description-metadata-button"}
            id={id}
        >
            {
                completionStatus.isWhyCompleted
                ? <Icon.CheckCircle color={"black"} size={18} />
                : <Icon.Circle color={"black"} size={18} />
            }
        </a>
    )
}

const CommitDescriptionElement: React.FC<CommitDescriptionElementType> = (
    { name, fullName, status, index}: CommitDescriptionElementType
) => {

    return (
        <li
            className={`files-${status}`}
        >
            <p>{name}</p>
            <CommitMetadataInputButtonWhat
                index={index}
                name={name}
                id={`commit-metadata-button-${fullName.replace(" ","")}-what`}
            />
            <CommitMetadataInputButtonWhy
                name={name}
                index={index}
                id={`commit-metadata-button-${fullName.replace(" ","")}-why`}
            />
        </li>
    )
}


type CommitDescriptionElement = {
    isWhat: boolean
}

const CommitDescriptionTextArea: React.FC<CommitDescriptionElement> = (
    { isWhat }: CommitDescriptionElement
) => {
    const [input, setInput] = useState('');

    const handleDescriptionTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setInput(event.currentTarget.value)
    };

    const handleTextApproval = () => {

        const indexValueString = window.localStorage.getItem("currentSelectedIndex")
        let index = store.getState()!.gitCommitDescriptionReducer.currentIndex

        if (indexValueString) {
            index = parseInt(indexValueString, 10) 
        }

        const currentCompletionStatus = store.getState()!.gitCommitDescriptionReducer.completionStatus[index]

        if (isWhat) {

            store.dispatch(UpdateCommitDescriptionElementWhatAction(index, input))
            store.dispatch(UpdateCommitDescriptionElementCompletionStatusAction(index, {
                isWhatCompleted: true,
                isWhyCompleted: currentCompletionStatus.isWhyCompleted
            }))

        } else {

            store.dispatch(UpdateCommitDescriptionElementWhyAction(index, input))
            store.dispatch(UpdateCommitDescriptionElementCompletionStatusAction(index, {
                isWhatCompleted: currentCompletionStatus.isWhatCompleted,
                isWhyCompleted: true
            }))
        }
        
        store.dispatch(UpdateCommitDescriptionViewAction("list"))
    }

    return (
        <div className={"commit-description-textarea-wrapper"}>
            <textarea
                className={"commit-description-textarea"}
                value={input}
                onChange={handleDescriptionTextChange}
            />
            <a
                onClick={handleTextApproval}
                className={"commit-description-textarea-confirmation-button"}
            >OK
            </a>
        </div>
    )
}

export const CommmitDescription: React.FC = () => {
    // -- Component that contains the commit box message description
    
    const currentView = useSelector(state => state.gitCommitDescriptionReducer.currentView)

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

        const elementName = store.getState()?.gitCommitDescriptionReducer.changedElements[i]
        const completionStatus = store.getState()?.gitCommitDescriptionReducer.completionStatus[i]
        const elementDescriptionWhat = store.getState()?.gitCommitDescriptionReducer.descriptionWhat[i]
        const elementDescriptionWhy = store.getState()?.gitCommitDescriptionReducer.descriptionWhy[i]

        if (!elementName) {
            store.dispatch(UpdateCommitDescriptionElementNameAction(i, parseName(changesTree[i].content)))
        }

        if (!completionStatus) {
            store.dispatch(UpdateCommitDescriptionElementCompletionStatusAction(i, {
                isWhatCompleted: false,
                isWhyCompleted: false
            }))
        }

        if (!elementDescriptionWhat) {
            store.dispatch(UpdateCommitDescriptionElementWhatAction(i,""))
        }

        if (!elementDescriptionWhy) {
            store.dispatch(UpdateCommitDescriptionElementWhyAction(i,""))
        }
        
        if (stagingStatus[i]) {
            stagedElementsList.push(
                React.createElement(CommitDescriptionElement,{
                    name: parseName(changesTree[i].content),
                    fullName: parseFullName(changesTree[i].content),
                    status: changesTree[i].status,
                    key: `ID_COMMIT_DESCRIPTION_ELEMENT_${i}`,
                    index: i
                })
            )
        }
    }

    if (currentView === "what") {
        return (
            <CommitDescriptionTextArea
                isWhat={true}
            />
        )
        
    }

    if (currentView === "why") {
        return (
            <CommitDescriptionTextArea
                isWhat={false}
            />
        )
        
    }

    return (
        <ul
            className={"commit-description-list"}
        >
            {stagedElementsList}
        </ul>
    );
};
