// ! ###  - Main App Component - ###

// ---------------------
// --- React Imports ---
// ---------------------

import { hot } from 'react-hot-loader/root';
import * as React from 'react';


import {
    MemoryRouter as Router,
    Route,
    Switch,
    useHistory
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
    LeftBlock,
    HideButtonLeft
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
    FirstTimeWizardP2,
    FirstTimeWizardP3,
    FirstTimeWizardP4,
    FirstTimeWizardP4b,
    FirstTimeWizardP5,
} from "./wizards/firstTime"

import { useSelector } from '../types/redefinitions';

// --------------------------
// --- Main App Component ---
// --------------------------

const Application = () => {

    const leftBlock = React.createElement(
        "div", 
        {
            className: "left-block",
            key: "ID_LEFT_WRAPPER"
        }, 
        [
            <LeftBlock key={"ID_LEFT"}/>
        ]
    )
        

    const mainBlock = React.createElement(
        "div", 
        {
            className: "main-block",
            key: "ID_MAIN_WRAPPER"
        }, 
        [
            <BottomBlock key={"ID_MAIN"}/>,
        ]
    )

    const rightBlock = React.createElement(
        "div", 
        {
            className: "right-block",
            key: "ID_RIGHT_WRAPPER"
        }, 
        <RightBlock key={"ID_RIGHT"}/>
    )

    const currentContextMenu = useSelector(state => state.setContextMenuIdReducer.id)

    const contextMenuTrigger = React.createElement(
        ContextMenuTrigger,
        {
            id: currentContextMenu,
            key: "ID_CONTEXT_MENU_TRIGGER"
        },
        [
            leftBlock,
            <HideButtonLeft key={"ID_HIDE_LEFT_SIDEBAR"}/>,
            mainBlock,
            rightBlock,
            contextMenus
        ]
    )           
    
    /*
    
    // TODO Fix why the hook throws an error
    if (localStorage.getItem("firstTimeWizardCompleted") === "0") {
        setTimeout(() => {
            const routerHistory = useHistory()
            routerHistory.push("/firstwizardgreeting")
        },50)
    } 
    */

    // TODO finish fixing the router for transitions between routes

    return <div
        className={"main-app"}
        key={"ID_MAIN_APP"}
    >
                <Router
                    initialEntries={["/","/firstwizardgreeting"]}
                >
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
                                    <Route path={"/firstwizardp3"}>
                                        <FirstTimeWizardP3/>
                                    </Route>
                                    <Route path={"/firstwizardp4"}>
                                        <FirstTimeWizardP4/>
                                    </Route>
                                    <Route path={"/firstwizardp4b"}>
                                        <FirstTimeWizardP4b/>
                                    </Route>
                                    <Route path={"/firstwizardp5"}>
                                        <FirstTimeWizardP5/>
                                    </Route>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}/>
                </Router>
           </div>
};

export default hot(Application);
