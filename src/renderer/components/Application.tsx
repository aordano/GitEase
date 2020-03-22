// ! ###  - Main App Component - ###

// TODO Refactor context menus components in a separate file

// ---------------------
// --- React Imports ---
// ---------------------

import { hot } from 'react-hot-loader/root';
import * as React from 'react';

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/main.scss');

// -------------------------
// --- Component Imports ---
// -------------------------

import {
    LeftBlock
} from "./leftBlock"

import {
    TopBlock
} from "./topBlock"

import {
    BottomBlock
} from "./bottomBlock"

import {
    FirstTimeWizard
} from "./wizards/firstTime"

import { useSelector } from '../types/redefinitions';

// --------------------------
// --- Main App Component ---
// --------------------------

const Application = () => {

    const leftBlock = React.createElement(
        "div", 
        { className: "left-block"}, 
        <LeftBlock key={"IDLEFT"}/>
    )
        

    const mainBlock = React.createElement(
        "div", 
        { className: "main-block"}, 
        [
            <TopBlock  key={"IDTOP"}/>,
            <BottomBlock key={"IDBOTTOM"}/>,
        ]
    )

    const currentContextMenu = useSelector(state => state.setContextMenuIdReducer.id)

    const contextMenuTrigger = React.createElement(
        ContextMenuTrigger,
        { id: currentContextMenu },
        [
            leftBlock,
            mainBlock,
            <ContextMenu
                id="defaultContextMenu"
                key={"IDDEFAULT_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                default - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                default - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                default - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="nodeGraphContextMenu"
                key={"IDNODE_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                node - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                node - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                node - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>
        ]
    )

    let app

    if (localStorage.getItem("firstTimeWizardCompleted") === "0") {
        app = React.createElement (
            "div",
            { className: "main-app"},
            [
                <FirstTimeWizard key={"IDFIRSTWIZARD"}/>
            ]
        )
    }

    else {
        app = React.createElement (
            "div",
            { className: "main-app"},
            [
                contextMenuTrigger
            ]
        )  
    }

     

    return app
};

export default hot(Application);
