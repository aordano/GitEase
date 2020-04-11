// ! ###  - Staging Area Components - ###
// *
// *  The Staging Area components handle the logic and 
// *  behaviour of the staging/changes area elements.

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ---------------------
// --- Store Imports ---
// ---------------------

import { store } from '../../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    ChangesTreeType,
    StagingCheckboxIndexType
} from '../../types';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    SetStagingStatusAction,
    SetGlobalStagingStatusAction,
    SetContextMenuIdAction
} from '../../actions/commonActions.redux.action';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../../data.mock")

const localization = require(`../../lang/${mockData.lang}`)

// -------------------------------
// --- Staging Area Components ---
// -------------------------------

const StagingCheckboxElement: React.FC<StagingCheckboxIndexType> = (
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

export const ChangesListElement: React.FC<ChangesTreeType> = (
    // -- Component that creates the list element based on the different status.
    {status, displayContent, index}: ChangesTreeType
) => {
    
    
    const changeContextMenuStagingAreaItem = () => {
        store.dispatch(SetContextMenuIdAction("stagingAreaItemContextMenu"))
    }
    
    const changeContextMenuStagingArea = () => {
        store.dispatch(SetContextMenuIdAction("stagingAreaContextMenu"))
    }

    const restoreContextMenu = () => {
        store.dispatch(SetContextMenuIdAction("defaultContextMenu"))
    }

    return (
        <li
            className={`files-${status}`}
            onMouseEnter={changeContextMenuStagingAreaItem}
            onMouseLeave={changeContextMenuStagingArea}
        >
            <StagingCheckboxElement index={index}/>
            {displayContent.slice(0,displayContent.lastIndexOf("/")+1)}
            <b className={"filename"}>{
                displayContent.slice(displayContent.lastIndexOf("/")+1,displayContent.length)
                // -- This highlights the displayed filename.
            }</b>
        </li>
    )
}

export const GlobalStagingCheckboxElement: React.FC = (
    // -- Component that creates the checkbox element for staging/unstaging all files.
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