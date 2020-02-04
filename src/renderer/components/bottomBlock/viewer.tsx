// ! ###  - Viewer - ###

// TODO -- Refactor according to interactive_elements.tsx

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';


// -----------------------------
// --- React D3 Tree Imports ---
// -----------------------------

// tslint:disable-next-line: import-name
import Tree from 'react-d3-tree';

// --------------------
// --- Type Imports ---
// --------------------

import { useSelector } from "../../types"

// ----------------------
// --- Static Imports ---
// ----------------------

require('../../static/scss/viewer.scss');

// ------------------------
// --- Function Imports ---
// ------------------------

import {
    generateJSONTree
} from "../../functions"

// -------------------------
// --- Component Imports ---
// -------------------------

import {
    SpinnerComponent
} from "../misc"

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../../lang/${lang}`)

// -------------------------------
// --- Node-related Components ---
// -------------------------------

type NodeLabelType = {
    nodeData?: any,      // * Don't know the nodeData type so hack with any
    className: string
}

const clickLastNode = (node:Element) => {
    const eventObject = document.createEvent('Events');
    eventObject.initEvent("click", true, false);
    node.dispatchEvent(eventObject);
}

export const NodeLabel: React.FC<NodeLabelType> = ({
    className, 
    nodeData
}:NodeLabelType) => {

    const hashList = useSelector(state => 
        state.updateViewTreeReducer.fullHistoryPromise?._v?.hashes?.hashList ??
            {
                hashList: [
                    "default"
                ]
            }
    )

    const nodeSubject = `${localization.nodeSubject}: ${nodeData.attributes.message}`
    const nodeAuthor =`${localization.nodeAuthor}: ${nodeData.attributes.author}`
    const nodeHash = `${localization.nodeHash}: ${nodeData.attributes.hash}` 
    const nodeDetails = document.querySelector(".node-details-popup") as HTMLDivElement
    const nodeContainer = document.getElementById(`${nodeData.attributes.hash}-node-container`) as HTMLDivElement

    let isGraphicDrawn = false

    const showNodeDetails = () => {
        if (nodeDetails && nodeContainer) {
            nodeContainer.style.backgroundColor = "rgba(255,255,255,0.5)"
            nodeContainer.style.borderRadius = "5px"
            nodeDetails.style.opacity = "1"
            nodeDetails.style.zIndex = "9999"
            if (nodeDetails.children) {
                nodeDetails.children[0].textContent = nodeSubject
                nodeDetails.children[1].textContent = nodeAuthor
                nodeDetails.children[2].textContent = nodeHash
            }
            return
        }
        // -- Last node needs to be clicked so the whole tree "expands" and then the mouseover does not fail
    

        const container = document.querySelector(".rd3t-tree-container")
        // React D3 Tree always contains an svg, which contains a group inside thus the two .children[0]
        const lastNode = container?.children[0].children[0].lastElementChild
        if (lastNode && !isGraphicDrawn) {
            clickLastNode(lastNode)
            isGraphicDrawn = true
        }
    }

    const hideNodeDetails = () => {
        nodeContainer.style.backgroundColor = "rgba(0,0,0,0.2)"
        nodeContainer.style.borderRadius = "50%"
        nodeDetails.style.opacity = "0"
        nodeDetails.style.zIndex = "-9999"
    }

    if (nodeData.name) {
        return (
            <div 
                onMouseEnter={showNodeDetails} 
                onMouseLeave={hideNodeDetails} 
                className={`${className}-named`}
            >
                <div className={"node-details-container"} id={`${nodeData.attributes.hash}-node-container`}/>
                <h2>{nodeData.name}</h2>
            </div>
        )
    }

    return (
        <div 
            onMouseEnter={showNodeDetails} 
            onMouseLeave={hideNodeDetails} 
            className={className}
        >
            <div className={"node-details-container"} id={`${nodeData.attributes.hash}-node-container`}/>
        </div>
    )

    
}

// ------------------------
// --- Viewer Component ---
// ------------------------

// TODO style the viewer
// TODO Document it better

export const ViewerComponent: React.FC = () => {

    const fullHistory = useSelector(state => 
        state.updateViewTreeReducer.fullHistoryPromise?._v?.fullHistory ??
            {
                fullhistory: [{
                    author_email: "default",
                    author_name: "default",
                    date: "default",
                    hash: "default",
                    parentHash: "default",
                    message: "default",
                    branch: "default"
                }]
            }
    )

    const hashList = useSelector(state => 
        state.updateViewTreeReducer.fullHistoryPromise?._v?.hashes?.hashList ??
            {
                hashList: [
                    "default"
                ]
            }
    )

    const branchesList = useSelector(state => 
        state.updateViewTreeReducer.fullHistoryPromise?._v?.branchesList ??
            {
                branchesList: [
                    "master"
                ]
            }
    )  

    const mergeCommitList = useSelector(state => 
        state.updateViewTreeReducer.fullHistoryPromise?._v?.mergeCommitList ??
            {
                mergeCommitList: [{
                    hash: "default",
                    parentHashes: [""]
                }]
            }
    )  

    const gitTree = generateJSONTree({fullHistory,branchesList,hashList,mergeCommitList})

    let shownElement: any

    // This dummy data is in place to avoid type errors if instead of it we'd return null or undefined
    const loadingData = {
        name: "loading",
        attributes: {
            message: "loading",
            author: "loading",
            hash: "loading"
        },
        nodeSvgShape: {
            shape: 'rect',
            shapeProps: {
                rx: 5,
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                fill: `rgb(0,0,0)`,
            },
        },
        children: []
    }
    
    if (gitTree === null || gitTree === undefined || gitTree.attributes.hash === loadingData.attributes.hash) {
        shownElement = React.createElement(
            SpinnerComponent,
            {
                name: "tree",
                message: localization.gitTreeLoadingMessage
            }
        )
    }

    else {
        shownElement = React.createElement(
            Tree,
            {
                data: gitTree,
                styles: {
                    links: {
                        strokeWidth: 5
                    }
                },
                allowForeignObjects: true,
                nodeLabelComponent: {
                    render: <NodeLabel className={'node-label'} />,
                    foreignObjectWrapper: {
                        y: -25,
                        x: -25
                    }
                },
                transitionDuration: 0,
                collapsible: true,
                zoom: 1,
                translate: {
                    x: -(137 * hashList.length), // * Magic number to show latest commit
                    y: 200
                }
            }
        )
    }

    const generateTree = () => {
        return shownElement
    }

    
    return generateTree()
};