// ! ###  - Left Block Components - ###
// *
// *  The left block components handle the 
// * changes/staging area and the commit box.

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// --------------------------
// --- Components Imports ---
// --------------------------

import {
    SpinnerComponent
} from "./misc"

import {
    CommitButton,
    CommitMessageInput,
    CommmitDescription
} from "./leftBlock/commitBox"

import {
    ChangesListElement,
    GlobalStagingCheckboxElement
} from "./leftBlock/stagingArea"

// --------------------
// --- Type Imports ---
// --------------------

import { useSelector } from "../types/redefinitions"

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/leftBlock.scss');

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../lang/${lang}`)

// ---------------------
// --- Store Imports ---
// ---------------------

import { store } from "../store/index.redux.store"

// ------------------------------
// --- Action Creator Imports ---
// ------------------------------

import { SetContextMenuIdAction } from "../actions/commonActions.redux.action"

// -------------------------------
// --- Hierarchical Components ---
// -------------------------------

export const LeftBlock: React.FC = () => {
    // -- Simple container that handles the left block of the screen.
    return (
        <div>
            <ChangesSpace />
            <CommitBox />
        </div>
    );
};

// -------------------------
// --- Commit Components ---
// -------------------------

export const CommitBox: React.FC = () => {
    // -- Component that contains the commit box elements

    // TODO Create button for the auto-branching workflow and the manual workflow

    // TODO Swap CommitButton for the correct one given the workflow context

    return (
        <div className={"commit-overlay"}>
            <SpinnerComponent name={"commit-box"} message={localization.commitProcessMessage}/>
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
// --- Changes Area Components ---
// -------------------------------


const ChangesSpace: React.FC = () => {
    // -- Component that creates the list of elements based on the tree generated by
    // the reducer updateChangesAreaReducer.
    
    const changeContextMenuStagingArea = () => {
        store.dispatch(SetContextMenuIdAction("stagingAreaContextMenu"))
    }

    const restoreContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("defaultContextMenu"))
    }

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
                key: `ID${i}`,
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
                {
                    className: "changes-list-title"
                }, 
                `${changesAreaTree.length} ${localization.changesAreaChangesTitle}`
            )
        ]
    }

    // -- Creates the <ul> element that contains the staging area element list.
    const changesList = React.createElement('ul', {
        className: "changes-list",
        onMouseEnter: changeContextMenuStagingArea,
        onMouseLeave: restoreContextMenu
    }, elements)
    return (
        <div className={'changes-area'}>
            {title}
            {changesList}
        </div>
    );
};