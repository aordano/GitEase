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
    HistoryElement
} from "./rightBlock/history"

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

require('../static/scss/rightBlock.scss');

// ----------------------------
// --- Localization Imports ---
// ----------------------------

import { readConfigSync } from "../functions/config"

const getLanguage = () => { 

    // ? We do this instead of reading from state because a 
    // ? timeoput or async function would get race conditions and break the components
    const configData = readConfigSync()

    let configObject

    if (configData) {
        configObject = JSON.parse(configData)
    }
    return configObject.UIConfig.language
}

const localization = require(`../lang/${getLanguage()}`)

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

export const RightBlock: React.FC = () => {
    // -- Simple container that handles the left block of the screen.
    return (
        <div>
            <History />
        </div>
    );
};

// -------------------------------
// --- Changes Area Components ---
// -------------------------------


const History: React.FC = () => {
    // -- Component that creates the list of elements based on the tree generated by
    // the reducer updateChangesAreaReducer.

    const history = useSelector(state => state.updateViewTreeReducer.dataPromise?.history?._v?.fullHistory)

    let shownElement
    
    if (
        history === undefined ||
        history === null      ||
        JSON.stringify(history) === "[]"
    ) {
        // TODO maybe we should kill the spinner as it shows for the graph already
        shownElement = null
    } else {
    
        const changeContextMenuStagingArea = () => {
            store.dispatch(SetContextMenuIdAction("stagingAreaContextMenu"))
        }
    
        const restoreContextMenu = () => {
            store.dispatch(SetContextMenuIdAction("defaultContextMenu"))
        }
        
        const title = React.createElement('p', { className: "changes-list-title" }, localization.gitHistoryTitle)

        const elements = []
        for (let i = 0; i < history.length ; i += 1) {
            // -- Creates the <ChangesListElement /> elements required.
            history[i].messageBody
            ?   elements.push(
                    React.createElement(HistoryElement,{
                        author_name: history[i].author_name,
                        date: history[i].date,
                        hash: history[i].hash,
                        message: history[i].message,
                        messageBody: history[i].messageBody,
                        branch: history[i].branch,
                        parentHash: history[i].parentHash,
                        key: `ID_HISTORY${i}`
                    })
                )
            :   elements.push(
                    React.createElement(HistoryElement,{
                        author_name: history[i].author_name,
                        date: history[i].date,
                        hash: history[i].hash,
                        message: history[i].message,
                        branch: history[i].branch,
                        parentHash: history[i].parentHash,
                        key: `ID_HISTORY${i}`
                    })
                )
        }

         // -- Creates the <ul> element that contains the staging area element list.
        const HistoryList = React.createElement('ul', {
            className: "history-list",
            onMouseEnter: changeContextMenuStagingArea,
            onMouseLeave: restoreContextMenu
        }, elements)

        shownElement =  <div className={'history'}>
                            {title}
                            {HistoryList}
                        </div>
    }

    return (
       shownElement
    );
};