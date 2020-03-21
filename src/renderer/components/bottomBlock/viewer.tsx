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
    //const onMouseOverNode = function(nodeId) {
    //    window.alert(`Mouse over node ${nodeId}`);
    //};
    
    // TODO Remove the commit info alert on mouseout    
    //const onMouseOutNode = function(nodeId) {
    //    window.alert(`Mouse out node ${nodeId}`);
    //};

    const graphConfig = {
        nodeHighlightBehavior: true,
        highlightOpacity: 0.2,
        height: 550,
        width: 650,
        collapsible: false,
        directed: true,
        staticGraph: false,
        d3: {
            gravity: -570,
            alphaTarget: 0.55,
            linkLength: 50
        },
        node: {
            strokeColor: "black",
            renderLabel: false
        },
        link: {
            highlightColor: "lightblue",
            type: "STRAIGHT"
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
                data: graphData,
                id: "graphViewer",
                config: graphConfig,
                // onClickNode: onClickNode,
                // onRightClickNode: onRightClickNode,
                // onMouseOverNode: onMouseOverNode,
                // onMouseOutNode: onMouseOutNode 
            }
        )
    }

    const generateGraph = () => {
        return shownElement
    }

    
    return generateGraph()

    
};

// HACK Don't know the nodeData type so hack with any
type NodeLabelType = {
    nodeData?: any,      
    className: string
}

export const NodeLabel: React.FC<NodeLabelType> = ({
    className, 
    nodeData
}:NodeLabelType) => {

    const hashList = useSelector(state => 
        state.updateViewTreeReducer.dataPromise.history?._v.hashes?.hashList ??
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


/*






*/
