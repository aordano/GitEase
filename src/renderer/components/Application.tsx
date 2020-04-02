// ! ###  - Main App Component - ###

// ---------------------
// --- React Imports ---
// ---------------------

import { hot } from 'react-hot-loader/root';
import * as React from 'react';


import {
    MemoryRouter as Router,
    Route,
} from "react-router-dom";

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenuTrigger } from "react-contextmenu";

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
    BottomBlock
} from "./bottomBlock"

import {
    RightBlock
} from "./rightBlock"

import {
    contextMenus
} from "./contextMenus"

import "./menuBar"

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
            <BottomBlock key={"IDBOTTOM"}/>,
        ]
    )

    const rightBlock = React.createElement(
        "div", 
        { className: "right-block"}, 
        <RightBlock key={"IDRIGHT"}/>
    )

    const currentContextMenu = useSelector(state => state.setContextMenuIdReducer.id)

    const contextMenuTrigger = React.createElement(
        ContextMenuTrigger,
        { id: currentContextMenu },
        [
            leftBlock,
            mainBlock,
            rightBlock,
            contextMenus
        ]
    )

    const app = React.createElement (
        "div",
        { className: "main-app"},
        [
            <Router key={"IDROUTER"}>
                <Route exact={true} path="/">
                    {contextMenuTrigger}
                </Route>
                <Route key={"IDROUTERFIRSTWIZARD"} path={"/firstwizard"}>
                    <FirstTimeWizard key={"IDFIRSTWIZARD"}/>
                </Route>
            </Router>
        ]
    )     

    return app
};

export default hot(Application);
