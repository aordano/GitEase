// ! ###  - Viewer - ###

// TODO -- Refactor according to interactive_elements.tsx

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ------------------------------
// --- React D3 Graph Imports ---
// ------------------------------

import { Graph } from "react-d3-graph";

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

require('../../static/scss/viewer.scss');

// ------------------------
// --- Function Imports ---
// ------------------------

import { generateGraphData } from '../../functions/gitGraph';

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

import { SetUIConfigInformationAction } from "../../actions/configActions.redux.action"

import { ReactD3GraphNodeType, GitGraphNodeMetadataType, GitLogObjectType, colorTripletType } from '../../types';
import { SetContextMenuIdAction } from '../../actions/commonActions.redux.action';

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

// ------------------------
// --- Viewer Component ---
// ------------------------

// TODO style the viewer
// TODO Document it better

const generateLabelProperty = (node: ReactD3GraphNodeType) => {

    // FIXME this can't load children data sometimes, saying "undefined" on the target branch

    const historyData = store.getState()!.updateViewTreeReducer.dataPromise.history._v

    const currentNodeIndex = historyData?.hashes.hashList.indexOf(node.id) ?? 0

    const currentNodeMetadata = historyData?.metadataList[currentNodeIndex]

    if (currentNodeMetadata?.isInitial) {
        return `${localization.labelInitialCommit} - ${currentNodeMetadata.branch.branchName}`
    }

    if (currentNodeMetadata?.isMerge && !currentNodeMetadata.isDivergence) {
        const parentHashes = currentNodeMetadata.childrenOf
        const parentBranches = parentHashes.map((value) => {
            const currentIndex = historyData?.hashes.hashList.indexOf(value) ?? 0
            const currentMetadata = historyData?.metadataList[currentIndex]
            return currentMetadata?.branch.branchName
        })
        const childrenHash = currentNodeMetadata.parentOf[0]
        const childrenIndex = historyData?.hashes.hashList.indexOf(childrenHash) ?? 0
        const childrenMetadata = historyData?.metadataList[childrenIndex]
        const childrenBranch = childrenMetadata?.branch.branchName
        
        const receiverBranchIndex = parentBranches.indexOf(childrenBranch)

        const parentBranchesLocalIndexes = parentBranches.map((value, index) => {
            return index
        })
        
        parentBranchesLocalIndexes.splice(receiverBranchIndex,1)

        let branchesString = ""
        parentBranchesLocalIndexes.forEach((branchIndex, loopIndex) => {
            if (loopIndex === 0) {
                branchesString = `${parentBranches[branchIndex]}`
            } else {
                branchesString = `${branchesString}, ${parentBranches[branchIndex]}`                
            }
        })

        return `${branchesString} -> ${childrenBranch}`
    }
}

export const ViewerComponent: React.FC = () => {

    const onClickNode= (nodeId: string) => {
        const currentUIConfig = useSelector(state => state.configInformationReducer.UIConfig)

        store.dispatch(SetUIConfigInformationAction({
            language: currentUIConfig.language,
            mainView: "commitInfo",
            selectedCommit: nodeId,
            showAdditionalInformation: currentUIConfig.showAdditionalInformation,
            showSidePanelsByDefault: currentUIConfig.showSidePanelsByDefault,
            theme: currentUIConfig.theme
        }))
    }    
    
    const onMouseOverNode = (nodeId: string) => {
        const history =  useSelector(state => state.updateViewTreeReducer.dataPromise.history._v)
        const hashes = history?.hashes.hashList
        const nodeIndex = hashes!.indexOf(nodeId) // ? If this gets called the data should be present
        const nodeData = history!.fullHistory[nodeIndex]
        const nodeSVG = document.getElementById(`${nodeData.hash}`)?.children[0] as SVGElement

        const historyListElement = document.getElementById(`ID_HISTORY_ELEMENT_${nodeData.hash}`) as HTMLLIElement

        const mouseOverBranchInfoElement = document.querySelector(".mouse-over-branch-info-tag") as HTMLHeadingElement
        const branchColor = useSelector(state =>
            state.updateViewTreeReducer.dataPromise.graphData._v.nodes
        )[nodeIndex].color
        
        const parsedBranchColor = (color: string) => {
            const firstIndex = color.indexOf("(")
            const lastIndex = color.indexOf(")")
            return color.slice(firstIndex + 1, lastIndex)
        }

        historyListElement.focus()

        // --------------------------------------------------------------------

        // Change contextMenu component on mouseover

        store.dispatch(SetContextMenuIdAction("nodeGraphContextMenu"))

        // --------------------------------------------------------------------

        // Highlight the node

        if (nodeSVG) {
            nodeSVG.setAttribute("transform", "scale(3)")
            nodeSVG.setAttribute("opacity", "0.9")
            nodeSVG.setAttribute("stroke-width", "0.5")
            nodeSVG.setAttribute("stroke-dasharray","2 1")
        }

        // --------------------------------------------------------------------

        // Show branch info popup

        mouseOverBranchInfoElement.style.opacity = "1"
        mouseOverBranchInfoElement.textContent = nodeData.branch
        mouseOverBranchInfoElement.style.backgroundColor = `rgba(${parsedBranchColor(branchColor)}, 0.5)`

    };
    
    const onMouseOutNode = (nodeId: string) => {

        const mouseOverBranchInfoElement = document.querySelector(".mouse-over-branch-info-tag") as HTMLHeadingElement

        // Clears the contextMenu change
        store.dispatch(SetContextMenuIdAction("defaultContextMenu"))

        const nodeSVG = document.getElementById(`${nodeId}`)?.children[0] as SVGElement
        if (nodeSVG) {
            nodeSVG.setAttribute("transform", "scale(1)")
            nodeSVG.setAttribute("opacity", "1")
            nodeSVG.setAttribute("stroke-width", "2")
            nodeSVG.setAttribute("stroke-dasharray","")
        }

        // --------------------------------------------------------------------

        // Show branch info popup

        mouseOverBranchInfoElement.style.opacity = "0"
    };

    const mainBlockRect = document.querySelector("div.main-block")?.getBoundingClientRect()

    const graphConfig = {
        nodeHighlightBehavior: false,
        // highlightOpacity: 0.2,
        height: mainBlockRect?.height ?? 200,
        width: mainBlockRect?.width ?? 200,
        collapsible: false,
        directed: true,
        staticGraph: false,
        // highlightDegree: 2,
        automaticRearrangeAfterDropNode: true,
        minZoom: 0.01,
        panAndZoom: true,
        d3: {
            gravity: -1000,
            alphaTarget: 1,
            linkLength: 5,
            linkStrength: 2
        },
        node: {
            strokeColor: "rgba(0,0,0,0.75)",
            renderLabel: true,
            size: 550,
            strokeWidth: 2,
            labelProperty: generateLabelProperty
        },
        link: {
            highlightColor: "rgba(0,0,0,0.25)",
            type: "STRAIGHT",
            strokeWidth: 2,
            color: "rgba(0,0,0,0.35)",
            markerWidth: 3,
            markerHeight: 9
        }
    }

    const graphData = useSelector(state =>
        state.updateViewTreeReducer.dataPromise.graphData._v ??
            {
                nodes: [
                    {
                        id: "placeholder",
                        color: "placeholder",
                        size: 200,
                        symbolType: "placeholder"
                    }
                ],
                links: [
                    {
                        source: "placeholder",
                        target: "placeholder",
                        color: "rgb(200,200,200)"
                    }
                ],
                focusedNodeId: "placeholder"
            }
    )

    let shownElement: any

    const placeholderData = {
        nodes: [
            {
                id: "placeholder",
                color: "placeholder",
                size: 200,
                symbolType: "placeholder"
            }
        ],
        links: [
            {
                source: "placeholder",
                target: "placeholder",
                color: "rgb(200,200,200)"
            }
        ],
        focusedNodeId: "placeholder"
    }
    
    if (
        graphData === undefined ||
        graphData === null ||
        JSON.stringify(graphData) === JSON.stringify(placeholderData) ||
        JSON.stringify(graphData).indexOf("nodes") === -1
    ) {
        shownElement = React.createElement(
            SpinnerComponent,
            {
                name: "graph",
                message: localization.gitGraphLoadingMessage
            }
        )
    }

    else {
        shownElement = React.createElement(
            Graph,
            {
                onMouseOverNode,
                onMouseOutNode,
                onClickNode,
                data: graphData,
                id: "graphViewer",
                config: graphConfig,
                // onClickNode: onClickNode,
            }
        )
    }

    const generateGraph = () => {
        return shownElement
    }

    
    return generateGraph()

    
};

export const MouseOverBranchInfo: React.FC= () => {

    return (
        <h2
            className={"mouse-over-branch-info-tag"}
        />
    )
}