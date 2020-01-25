// ! ###  - Main App Component - ###

// ---------------------
// --- React Imports ---
// ---------------------

import { hot } from 'react-hot-loader/root';
import * as React from 'react';

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
            <BottomBlock key={"IDBOTTOM"}/>
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
                leftBlock,
                mainBlock
            ]
        )  
    }

     

    return app
};

export default hot(Application);
