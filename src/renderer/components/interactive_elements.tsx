// ! ###  - Interactive Elements - ###

// TODO -- Refactor and divide in smaller pieces given:
// TODO --------------------------------------------------
// TODO --|- leftBlock.tsx ---> Container for the left block
// TODO --|- topBlock.tsx ---> Container for the top block
// TODO --|- bottomBlock.tsx ---> Container for the viewer Block
// TODO --|- leftBlock   -|- commitBox.tsx ---> Components for the commit box
// TODO --|---------------|- stagingArea.tsx ---> Components for the staging area
// TODO --|- topBlock    -|- actionsSpace.tsx ---> Components for the actions space
// TODO --|- bottomBlock -|- viewer.tsx ---> Components for the viewer

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
    StagingCheckboxIndexType
} from '../types';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../actions/basicWorkflowActions';

import {
    SetStagingStatusAction
} from '../actions/commonActions';

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/actions.scss');

// -------------------------------------------
// * --- Temporary statements for testing ---
// -------------------------------------------

const branch = 'experiments';
const USER = 'aordano';
import {PASS} from "../../../.secrets"
const REPO = 'github.com/aordano/GitEase';
const remote = `https://${USER}:${PASS}@${REPO}`;

// -------------------------
// --- Commit Components ---
// -------------------------

const CommitMessageInput: React.FC = () => {
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
        title={"Make it a short one that succintly describes your changes."} 
        className={'commit-message'} 
        placeholder={"Give a name to your changes"} 
        value={input} 
        onChange={handleCommitTextChange} 
    />;
};

const CommitButton: React.FC = () => {
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
        title={"Publish your changes."} 
        type={'button'} 
        className={'commit-button'} 
        onClick={handleCommitButtonPress} 
        value={"Go"}
    />;
};

const CommmitDescription: React.FC = () => {
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
            placeholder={'Describe what you did with a short explanation'} 
            className={'commit-description'} 
            value={input}
            onChange={handleCommitDescriptionChange}
        />
    )
}

const CommitBox: React.FC = () => {
    // -- Component that contains the commit box elements

    // TODO Create button for the auto-branching workflow and the manual workflow

    // TODO Swap CommitButton for the correct one given the workflow context

    return (
        <div className={'commit-box'}>
            <p>Commit your changes:</p>
            <CommitMessageInput />
            <CommitButton />
            <CommmitDescription />
        </div>
    );
};


// -------------------------------
// --- Staging Area Components ---
// -------------------------------

const ChangesSpace: React.FC = () => {
    // -- Component that creates the list of elements based on the tree generated by
    // the reducer updateChangesAreaReducer.
    const changesAreaTree = useSelector(state => state.updateChangesAreaReducer.changesAreaTree)
    const elements = []
    let title
    for (let i = 0; i < changesAreaTree.length ; i += 1) {
        // -- Creates the <ChangesListElement /> elements required.
        elements.push(
            React.createElement(ChangesListElement,{
                status: changesAreaTree[i].status,
                content: changesAreaTree[i].content,
                displayContent: changesAreaTree[i].displayContent,
                staged: changesAreaTree[i].staged,
                key: i,
                index: i
            })
        )
    }
    // -- The title changes based on the presence of elements in the tree.
    if (changesAreaTree.length === 0 ){
        title =  React.createElement('p', { className: "changes-list-title"}, "No changed files.")
    }
    else {
        title = React.createElement('p', { className: "changes-list-title"}, `${changesAreaTree.length} changed files`)
    }
    // -- Creates the <ul> element that contains the staging area element list.
    const changesList =  React.createElement('ul', { className: "changes-list"}, elements)
    return (
        <div className={'changes-area'}>
            {title}
            {changesList}
        </div>
    );
};

export const ChangesListElement: React.FC<ChangesTreeType> = (
    // -- Component that creates the list element based on the different status.
    {status, displayContent, index}: ChangesTreeType
) => {
    return (
        <li className={`files-${status}`}>
            <StagingCheckboxElement index={index}/>
            {displayContent.slice(0,displayContent.lastIndexOf("/")+1)}
            <b className={"filename"}>{
                displayContent.slice(displayContent.lastIndexOf("/")+1,displayContent.length)
                // -- This highlights the displayed filename.
            }</b>
        </li>
    )
}

export const StagingCheckboxElement: React.FC<StagingCheckboxIndexType> = (
    // -- Component that creates the checkbox element for staging/unstaging the selected file.
    {index}: StagingCheckboxIndexType
) => {
    const handleStagingCheckbox = () => {
        if (index !== undefined) {
            store.dispatch(SetStagingStatusAction(index))
        }
        
    };

    return (
        <input
            className={"stage-checkbox"}
            type={"checkbox"}  
            onChange={handleStagingCheckbox}  
        />
    )
}

// -----------------------------
// --- Left Block Components ---
// -----------------------------

export const CommitComponent: React.FC = () => {
    // -- Simple container that handles the left block of the screen.
    return (
        <div>
            <ChangesSpace />
            <CommitBox />
        </div>
    );
};


// --------------------------------
// --- Actions Space Components ---
// --------------------------------

const ActionsSpace: React.FC = () => {
    // -- Simple dummy test component.

    // TODO Create the buttons to perform the functions for every workflow

    return (
        <div className={'actions-space'}>
            <h2>Actions space</h2>
            <input type={'button'}/>
        </div>
    );
};

export const ActionsComponent: React.FC = () => {
    // -- Simple container that holds the actions space components.

    // TODO Change name from ActionsComponent to ActionsSpace

    // TODO Swao the buttons given the workflow context

    return (
        <div className={'upper-block'}>
            <ActionsSpace />
        </div>
    );
};