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

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/actions.scss');

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../lang/${lang}`)


// -------------------------------------------
// * --- Temporary statements for testing ---
// -------------------------------------------

export const branch = 'experiments';
const USER = 'aordano';
import {PASS} from "../../../.secrets"
const REPO = 'github.com/aordano/GitEase';
export const remote = `https://${USER}:${PASS}@${REPO}`;

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
        title={localization.commitMessageTooltip} 
        className={'commit-message'} 
        placeholder={localization.commitMessagePlaceholder} 
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
        title={localization.commitButtonTooltip} 
        type={'button'} 
        className={'commit-button'} 
        onClick={handleCommitButtonPress} 
        value={localization.commitButtonText}
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
            placeholder={localization.commitDescriptionPlaceholder} 
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
        <div className={"commit-overlay"}>
            <SpinnerComponent name={"commit-box"}/>
            <div className={'commit-box'}>
                <p>{localization.commitBoxTitle}</p>
                <CommitMessageInput />
                <CommitButton />
                <CommmitDescription />
            </div>
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
        title =  React.createElement('p', { className: "changes-list-title"}, localization.changesAreaNoChangesTitle)
    }
    else {
        title = [
            React.createElement(GlobalStagingCheckboxElement),
            React.createElement(
                'p', 
                { className: "changes-list-title"}, 
                `${changesAreaTree.length} ${localization.changesAreaChangesTitle}`
            )
        ]
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
            title={localization.changesAreaElementCheckboxTooltip} 
            type={"checkbox"}  
            onChange={handleStagingCheckbox}  
        />
    )
}

export const GlobalStagingCheckboxElement: React.FC = (
    // -- Component that creates the checkbox element for staging/unstaging the selected file.
) => {
    const handleGlobalStagingCheckbox = () => {
        store.dispatch(SetGlobalStagingStatusAction())
        
    };

    return (
        <input
            className={"stage-checkbox-global"}
            title={localization.changesAreaGlobalCheckboxTooltip} 
            type={"checkbox"}  
            onChange={handleGlobalStagingCheckbox}  
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


// ------------------------
// --- Misc. Components ---
// ------------------------

export const SpinnerComponent: React.FC<SpinnerType> = ({name}: SpinnerType)=> {
    // -- Simple container that holds the loading spinner.

    return (
        <div className={`spinner-${name}`}>
            <div className={"sk-cube-grid"}>
                <div className={"sk-cube sk-cube1"}/>
                <div className={"sk-cube sk-cube2"}/>
                <div className={"sk-cube sk-cube3"}/>
                <div className={"sk-cube sk-cube4"}/>
                <div className={"sk-cube sk-cube5"}/>
                <div className={"sk-cube sk-cube6"}/>
                <div className={"sk-cube sk-cube7"}/>
                <div className={"sk-cube sk-cube8"}/>
                <div className={"sk-cube sk-cube9"}/>
            </div>
        </div>
    );
};

            