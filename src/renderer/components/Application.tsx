// ! ###  - Main App Component - ###

// ---------------------
// --- React Imports ---
// ---------------------

import { hot } from 'react-hot-loader/root';
import * as React from 'react';


import {
    MemoryRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import { TransitionGroup, CSSTransition } from "react-transition-group";

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
    FirstTimeWizardGreeter,
    FirstTimeWizardP2
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

    // TODO finish fixing the router for transitions between routes

    return <div className={"main-app"}>
                <Router>
                    <Route
                        // tslint:disable-next-line: jsx-no-lambda
                        render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition
                                timeout={400}
                                classNames={'fade'}
                                key={location.key}
                            >
                                <Switch  location={location}>
                                    <Route exact={true} path="/">
                                        {contextMenuTrigger}
                                    </Route>
                                    <Route path={"/firstwizardgreeting"}>
                                        <FirstTimeWizardGreeter/>
                                    </Route>
                                    <Route path={"/firstwizardp2"}>
                                        <FirstTimeWizardP2/>
                                    </Route>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}/>
                </Router>
           </div>
};

export default hot(Application);
