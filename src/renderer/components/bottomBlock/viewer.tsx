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

    const gitTree = generateJSONTree({fullHistory,branchesList,hashList})

    let shownElement: any
    
    if (gitTree === undefined) {
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
                transitionDuration: 0
            }
        )
    }

    const generateTree = () => {
        return shownElement
    }

    
    return generateTree()
};