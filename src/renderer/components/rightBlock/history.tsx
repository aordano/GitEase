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
    GitLogObjectType,
    labelType
} from '../../types';

// ------------------------
// --- Function Imports ---
// ------------------------

import { parseLabel } from "../../functions"

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

    const generateLabel = (message: string) => {
        const messageParsed = parseLabel(message)

        const availableLabels = mockData.labelsDictionary.map((value: labelType) => {return value.label })
        
        if (messageParsed) {
            const labelName = messageParsed[0].slice(0, messageParsed[0].length - 1)
            
            if (availableLabels.indexOf(labelName) !== -1) {
                const labelData = mockData.labelsDictionary[availableLabels.indexOf(labelName)]
                return <p className={"message"}>
                    <HistoryLabel
                        label={labelData.label}
                        labelColor={labelData.labelColor}
                    /> {messageParsed[1]} </p>
            }

        }

        return <p className={"message"}>{message}</p>
    }

    return (
        <li
            className={`history-element`}
            onMouseEnter={changeContextMenuStagingAreaItem}
            onMouseLeave={changeContextMenuStagingArea}
        >
            {generateLabel(message)}
            <hr/>
            <p className={"author"}>{author_name} commited {elapsedTime(date)}</p>
            
        </li>
    )
}

export const HistoryLabel: React.FC<labelType> = ({ label, labelColor }: labelType) => {
    const style = {
        backgroundColor: `rgb(
            ${ labelColor.r },
            ${ labelColor.g },
            ${ labelColor.b }
        )`,
        color: "white"
    }
    return <a style={style} className={"commit-label"}>{label}</a>
}