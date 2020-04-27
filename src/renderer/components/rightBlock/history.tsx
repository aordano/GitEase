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

import { readLabelsSync } from "../../functions/config"

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

import { readConfigSync } from "../../functions/config"

const getLanguage = () => { 

    // ? We do this instead of reading from state because a 
    // ? timeout or async function would get race conditions and break the components
    const configData = readConfigSync()

    let configObject

    if (configData) {
        configObject = JSON.parse(configData)
    }
    return configObject.UIConfig.language as string
}

const locale = getLanguage()

const localization = require(`../../lang/${locale}`)

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
            return `${minutesElapsed} ${localization.gitHistoryElementMinutesAgo}`
        }

        const hoursElapsed = Math.round(minutesElapsed / 60 )

        if (hoursElapsed < 24) {
            return `${hoursElapsed} ${localization.gitHistoryElementHoursAgo}`
        }

        const daysElapsed = Math.round( hoursElapsed / 24)
        const leftoverHours = hoursElapsed % 24

        if (daysElapsed < 7) {
            return `${daysElapsed} ${localization.gitHistoryElementDaysAgo}, ${leftoverHours} ${localization.gitHistoryElementHoursAgo}`
        }

        return `${localization.gitHistoryElementArticle} ${Intl.DateTimeFormat(locale.replace("_", "-")).format(Date.parse(date))}`
        
    }

    const generateLabel = (message: string) => {
        const messageParsed = parseLabel(message)

        const labelRawData = readLabelsSync()
        let labelParsedData

        if (labelRawData) {
            labelParsedData = JSON.parse(labelRawData)
        }

        const availableLabels = labelParsedData.map((value: labelType) => {return value.label })
        
        if (messageParsed) {
            const labelName = messageParsed[0].slice(0, messageParsed[0].length - 1)
            
            if (availableLabels.indexOf(labelName) !== -1) {
                const labelData = labelParsedData[availableLabels.indexOf(labelName)]
                return <p className={"message"}>
                    <HistoryLabel
                        label={labelData.label}
                        labelColor={labelData.labelColor}
                    /> {messageParsed[1]} </p>
            }

        }

        return <p className={"message"}>{message}</p>
    }

    const hashesList = store.getState()!.updateViewTreeReducer.dataPromise.history._v.hashes.hashList
    
    const branchColor = store.getState()!.updateViewTreeReducer
        .dataPromise.graphData._v.nodes[hashesList.indexOf(hash)].color

    return (
        <li
            style={{
                borderLeft: `3px solid ${branchColor}`
            }}
            tabIndex={-1}
            className={`history-element`}
            onMouseEnter={changeContextMenuStagingAreaItem}
            onMouseLeave={changeContextMenuStagingArea}
            id={`ID_HISTORY_ELEMENT_${hash}`}
        >
            {generateLabel(message)}
            <hr/>
            <p className={"author"}>{author_name} {localization.gitHistoryCommitedName} {elapsedTime(date)}</p>
            
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