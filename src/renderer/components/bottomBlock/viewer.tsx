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

import { ReactD3GraphNodeType, GitGraphNodeMetadataType, GitLogObjectType } from '../../types';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = 'en_US';

const localization = require(`../../lang/${lang}`);

// ------------------------
// --- Viewer Component ---
// ------------------------

// TODO style the viewer
// TODO Document it better

const generateLabelProperty = (node: ReactD3GraphNodeType) => {

    // FIXME this can't load children data sometimes, saying "undefined" on the target branch

    const historyData = store.getState()?.updateViewTreeReducer.dataPromise.history._v

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

    // TODO Open diff and more info screen on double click
    //const onClickNode = function(nodeId) {
    //    window.alert('Clicked node ${nodeId}');
    //};

    // TODO Generate a contextual menu for actions on the given commit
    //const onRightClickNode = function(event, nodeId) {
    //    window.alert('Right clicked node ${nodeId}');
    //};
    
    // TODO Generate the alert for commit info on mouseover
    const onMouseOverNode = (nodeId: string) => {
        const history = store.getState()?.updateViewTreeReducer.dataPromise.history._v
        const hashes = history?.hashes.hashList
        const nodeIndex = hashes!.indexOf(nodeId) // ? If this gets called the data should be present
        const nodeData = history!.fullHistory[nodeIndex]
        const nodeSubject = `${localization.nodeSubject}: ${nodeData.message}`
        const nodeAuthor =`${localization.nodeAuthor}: ${nodeData.author_name}`
        const nodeHash = `${localization.nodeHash}: ${nodeData.hash}` 
        const nodeDetails = document.querySelector(".node-details-popup") as HTMLDivElement
        const nodeSVG = document.getElementById(`${nodeData.hash}`)?.children[0] as SVGElement

        if (nodeDetails && nodeSVG) {
            nodeSVG.setAttribute("transform", "scale(5)")
            nodeSVG.setAttribute("opacity", "0.9")
            nodeSVG.setAttribute("stroke-width", "1")
            nodeSVG.setAttribute("stroke-dasharray","2 1")
            nodeDetails.style.opacity = "1"
            nodeDetails.style.zIndex = "9999"
            if (nodeDetails.children) {
                nodeDetails.children[0].textContent = nodeSubject
                nodeDetails.children[1].textContent = nodeAuthor
                nodeDetails.children[2].textContent = nodeHash
            }
            return
        }
    };
    
    // TODO Remove the commit info alert on mouseout    
    const onMouseOutNode = (nodeId: string) => {
        const nodeDetails = document.querySelector(".node-details-popup") as HTMLDivElement
        const nodeSVG = document.getElementById(`${nodeId}`)?.children[0] as SVGElement
        if (nodeDetails && nodeSVG) {
            nodeSVG.setAttribute("transform", "scale(1)")
            nodeSVG.setAttribute("opacity", "1")
            nodeSVG.setAttribute("stroke-width", "3")
            nodeSVG.setAttribute("stroke-dasharray","")
            nodeDetails.style.opacity = "0"
            nodeDetails.style.zIndex = "-9999"
        }
        return
    };

    const graphConfig = {
        nodeHighlightBehavior: true,
        highlightOpacity: 0.2,
        height: 550,
        width: 650,
        collapsible: false,
        directed: true,
        staticGraph: false,
        highlightDegree: 2,
        d3: {
            gravity: -570,
            alphaTarget: 0.55,
            linkLength: 40
        },
        node: {
            strokeColor: "#333333",
            renderLabel: true,
            size: 550,
            strokeWidth: 3,
            labelProperty: generateLabelProperty
        },
        link: {
            highlightColor: "#333333",
            type: "STRAIGHT",
            strokeWidth: 5,
            color: "#333333",
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
                ]
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
        ]
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
                data: graphData,
                id: "graphViewer",
                config: graphConfig,
                // onClickNode: onClickNode,
                // onRightClickNode: onRightClickNode,
            }
        )
    }

    const generateGraph = () => {
        return shownElement
    }

    
    return generateGraph()

    
};