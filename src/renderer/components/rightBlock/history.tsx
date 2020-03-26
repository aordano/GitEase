// ! ###  - History sidebar components - ###
// *
// *  The history components handle the display of
// *  commit history on the sidebar

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
    GitLogObjectType
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

// --------------------------
// --- History Components ---
// --------------------------


export const HistoryElement: React.FC<GitLogObjectType> = (
    // -- Component that creates the list element based on the different status.
    { author_name, date, hash, message, branch }: GitLogObjectType
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

    const elapsedTime = (date: string) => {
        const minutesElapsed =  Math.round(
            (Date.now() - Date.parse(date)) / 60000
        )

        if (minutesElapsed < 60) {
            return `${minutesElapsed} minutes ago`
        }

        const hoursElapsed = Math.round(minutesElapsed / 60 )

        if (hoursElapsed < 24) {
            return `${hoursElapsed} hours ago`
        }

        const daysElapsed = Math.round( hoursElapsed / 24)
        const leftoverHours = hoursElapsed % 24

        if (daysElapsed < 7) {
            return `${daysElapsed} days, ${leftoverHours} hours ago`
        }

        return date
        
    }

    return (
        <li
            className={`history-element`}
            onMouseEnter={changeContextMenuStagingAreaItem}
            onMouseLeave={changeContextMenuStagingArea}
        >
            <p className={"message"}>{message}</p>
            <hr/>
            <p className={"author"}>{author_name} commited {elapsedTime(date)}</p>
            
        </li>
    )
}