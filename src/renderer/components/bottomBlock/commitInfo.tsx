// ! ###  - Commit info window - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

// ---------------------
// --- Icons Imports ---
// ---------------------

import * as Icon from 'react-feather';


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
// --- YAML Imports ---
// --------------------

import * as YAML from "js-yaml"


// --------------------
// --- Type Imports ---
// --------------------

import { 
    labelType, gitDescriptionObjectType
} from '../../types';

import { SetContextMenuIdAction } from '../../actions/commonActions.redux.action';

import {
    SetUIConfigInformationAction
} from "../../actions/configActions.redux.action"

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
    return configObject.UIConfig.language as string
}

const locale = getLanguage()

const localization = require(`../../lang/${locale}`)

type nodeIndexType = {
    nodeIndex: number
}

type hashType = {
    hash: string
}

const CommitInfoHeader: React.FC<nodeIndexType> = ({ nodeIndex }: nodeIndexType) => {

    const commitData = useSelector(state => state.updateViewTreeReducer.dataPromise.history._v.fullHistory)[nodeIndex]

    const nodeData = useSelector(state => state.updateViewTreeReducer.dataPromise.graphData._v.nodes)[nodeIndex]

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

    const commitDescription = useSelector(state =>
        state.updateViewTreeReducer.dataPromise.history._v.fullHistory
    )[nodeIndex].messageBody

    const elementsList: React.ReactElement<HTMLLIElement>[] = []

    if (commitDescription) {

        const descriptionObject: gitDescriptionObjectType[] = YAML.safeLoad(commitDescription)

        if (descriptionObject && typeof descriptionObject !== "string") {
            for (let i = 0; i < descriptionObject.length; i += 1) {
                elementsList.push(
                    <li
                        className={"commit-info-diff-message-element"}
                        key={`ID_COMMIT_INFO_DIFF_MESSAGE_ELEMENT_${i}`}
                    >
                        <p
                            className={"commit-info-diff-message-element-name"}
                        >
                            {descriptionObject[i].name}
                        </p>
                        <p
                            className={"commit-info-diff-message-element-what"}
                        >
                            {descriptionObject[i].what}
                        </p>
                        <p
                            className={"commit-info-diff-message-element-why"}
                        >
                            {descriptionObject[i].why}
                        </p>
                    </li>
                )
            }
        } else {
            elementsList.push(
                <li className={"commit-info-diff-message-element"}>
                        <p
                            className={"commit-info-diff-message-element-name"}
                        >
                            {commitDescription}
                        </p>
                    </li>
            )
        }

    } else {
        elementsList.push(
            <li className={"commit-info-diff-message-element"}>
                    <p
                        className={"commit-info-diff-message-element-name"}
                    >
                        {localization.commitInfoPaneInvalidDescription}
                    </p>
                </li>
        )
    }

    const body = document.querySelector("body") as HTMLBodyElement

    body.setAttribute("style", `--changes-name: "${localization.commitInfoPaneChanges}"; --reason-name: "${localization.commitInfoPaneReason}";`)

    return (
        <ul
            className={"commit-info-diff-message-list"}
        >
            {elementsList}
        </ul>
    )
}

const CommitInfoExtendedInformation: React.FC<nodeIndexType> = ({ nodeIndex }: nodeIndexType) => {

    const commitData = useSelector(state => state.updateViewTreeReducer.dataPromise.history._v.fullHistory)[nodeIndex]

    return (
        <div
            className={"commit-info-extended-information"}
        >
            <p>
                {localization.commitInfoPaneCommitDataMessageCommitMade}{
                    Intl.DateTimeFormat(locale.replace("_", "-")).format(Date.parse(commitData.date))
                }{localization.commitInfoPaneCommitDataMessageCommitBy}{commitData.author_name}. 
                {
                    localization.commitInfoPaneCommitDataMessagePublishedOn
                }{commitData.branch}{
                    localization.commitInfoPaneCommitDataMessageBranchAndHash
                }<a className={"commit-info-hash"}>{commitData.hash}</a>.
            </p>
        </div>
    )
}

const CommitInfoActions: React.FC<nodeIndexType> = ({ nodeIndex }: nodeIndexType) => {
    return (
        <div
            className={"commit-info-actions"}
        >
            <ul>
                <li className={"commit-info-action-element"}>
                    <Icon.RotateCcw color={"black"} size={16} /> 
                    { localization.nodeGraphContextMenuRevertCommit } (wip)
                </li>
                <li className={"commit-info-action-element"}>
                    <Icon.LogIn color={"black"} size={16} /> 
                    { localization.nodeGraphContextMenuChangeBranch } (wip)
                </li>
                <hr />
                <li className={"commit-info-action-element"}>
                    <Icon.GitBranch color={"black"} size={16} />
                    {localization.nodeGraphContextMenuCreateBranch} (wip)
                </li>
                <li className={"commit-info-action-element"}>
                    <Icon.GitMerge color={"black"} size={16} />
                    {localization.nodeGraphContextMenuMergeBranch} (wip)
                </li>
                <li className={"commit-info-action-element"}>
                    <Icon.AlertOctagon color={"black"} size={16} />
                    {localization.nodeGraphContextMenuRebase} (wip)
                </li>
            </ul>
        </div>
    )
}

const CommitInfoNavigator: React.FC = () => {

    const backToGraphView = () => {
        const currentUIConfig = store.getState()!.configInformationReducer.UIConfig

        store.dispatch(SetUIConfigInformationAction({
            language: currentUIConfig.language,
            mainView: "graph",
            selectedCommit: currentUIConfig.selectedCommit,
            showAdditionalInformation: currentUIConfig.showAdditionalInformation,
            showSidePanelsByDefault: currentUIConfig.showSidePanelsByDefault,
            theme: currentUIConfig.theme
        }))
    }

    const backToDiffView = () => {
        const currentUIConfig = store.getState()!.configInformationReducer.UIConfig

        store.dispatch(SetUIConfigInformationAction({
            language: currentUIConfig.language,
            mainView: "diff",
            selectedCommit: currentUIConfig.selectedCommit,
            showAdditionalInformation: currentUIConfig.showAdditionalInformation,
            showSidePanelsByDefault: currentUIConfig.showSidePanelsByDefault,
            theme: currentUIConfig.theme
        }))
    }

    return (
        <div
            className={"commit-info-navigator"}
        >
            <a
                onClick={backToGraphView}
                className={"commit-info-navigator-button"}
            ><Icon.GitCommit color={"black"} size={50} /> <p>{localization.commitInfoPaneNavigatorGraphView}</p>
            </a>
            <a
                onClick={backToDiffView}
                className={"commit-info-navigator-button"}
            ><Icon.Columns color={"black"} size={50} /> <p>{localization.commitInfoPaneNavigatorDiffView}</p>
            </a>
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
            <CommitInfoActions nodeIndex={nodeIndex} />
            <CommitInfoNavigator />
        </div>
    )
}