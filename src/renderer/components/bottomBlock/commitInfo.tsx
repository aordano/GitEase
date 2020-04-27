// ! ###  - Commit info window - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


// --------------------
// --- Type Imports ---
// --------------------

import { useSelector } from '../../types/redefinitions';

// ----------------------
// --- Static Imports ---
// ----------------------

require('../../static/scss/commitInfo.scss');

// -------------------------
// --- Component Imports ---
// -------------------------

import { SpinnerComponent } from '../misc';

// --------------------
// --- StoreImports ---
// --------------------

// tslint:disable-next-line: import-name
import store from '../../store/index.redux.store';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    labelType
} from '../../types';

import { SetContextMenuIdAction } from '../../actions/commonActions.redux.action';

import { parseLabel } from "../../functions"

import { readLabelsSync } from "../../functions/config"

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
    return configObject.UIConfig.language
}

const localization = require(`../../lang/${getLanguage()}`)

type nodeIndexType = {
    nodeIndex: number
}

type hashType = {
    hash: string
}

const CommitInfoHeader: React.FC<nodeIndexType> = ({ nodeIndex }: nodeIndexType) => {

    const commitData = store.getState()!.updateViewTreeReducer.dataPromise.history._v.fullHistory[nodeIndex]

    const nodeData = store.getState()!.updateViewTreeReducer.dataPromise.graphData._v.nodes[nodeIndex]

    const parsedMessage = parseLabel(commitData.message)

    const labelRawData = readLabelsSync()
    let labelParsedData

    if (labelRawData) {
        labelParsedData = JSON.parse(labelRawData)
    }

    const availableLabels = labelParsedData.map((value: labelType) => { return value.label })

    const parsedBranchColor = (color: string) => {
        const firstIndex = color.indexOf("(")
        const lastIndex = color.indexOf(")")
        return color.slice(firstIndex + 1, lastIndex)
    }

    if (parsedMessage) {
    
        const labelName = parsedMessage[0].slice(0, parsedMessage[0].length - 1)

        let labelData

        if (availableLabels.indexOf(labelName) !== -1) {
            labelData = labelParsedData[availableLabels.indexOf(labelName)]
        } else {
            labelData = {
                label: "None", 
                labelColor: {
                    r: 55,
                    g: 55,
                    b: 55
                }
            }
        }

        return (
            <div
                className={"commit-info-header"}
            >
                <h3>
                    {parsedMessage[1]}
                </h3>
                <hr />
                <p
                    className={"commit-info-label"}
                    style={{
                        backgroundColor: `rgb(
                            ${ labelData.labelColor.r },
                            ${ labelData.labelColor.g },
                            ${ labelData.labelColor.b }
                        )`
                    }}
                >
                    {labelData.label}
                </p>
                <div
                    className={"separator"}
                />
                <p
                    className={"commit-info-branch"}
                    style={{
                        backgroundColor: `rgba(${parsedBranchColor(nodeData.color)}, 0.5)`,
                        border: `2px solid ${nodeData.color}`
                    }}
                >
                    {commitData.branch}
                </p>
            </div>
        )
    }

    return null
}

const CommitInfoDiffMessage: React.FC<nodeIndexType> = ({ nodeIndex }: nodeIndexType) => {
    return (
        <div
            className={"commit-info-diff-message"}
        >

        </div>
    )
}

const CommitInfoExtendedInformation: React.FC<nodeIndexType> = ({ nodeIndex }: nodeIndexType) => {
    return (
        <div
            className={"commit-info-extended-information"}
        >

        </div>
    )
}

export const CommitInfoPane: React.FC<hashType> = ({ hash }: hashType) => {

    const hashes = store.getState()!.updateViewTreeReducer.dataPromise.history._v.hashes.hashList
    const nodeIndex = hashes.indexOf(hash)

    return (
        <div
            className={"commit-info-pane"}
        >
            <CommitInfoHeader nodeIndex={nodeIndex}/>
            <CommitInfoDiffMessage nodeIndex={nodeIndex} />
            <CommitInfoExtendedInformation nodeIndex={nodeIndex} />
        </div>
    )
}