// ! ###  - Miscelaneous Components - ###
// *
// *  Components that did not fit in specific categories.
// *  As this file grows it may be refactored into smaller ones.

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    SpinnerType
} from '../types';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../lang/${lang}`)

// ----------------------------------
// --- Loading-Related Components ---
// ----------------------------------

export const SpinnerComponent: React.FC<SpinnerType> = ({name, message}: SpinnerType)=> {
    // -- Simple container that holds the loading spinner.

    return (
        <div className={`spinner-${name}`}>
            <div className={"sk-cube-grid"}>
                <div className={"sk-cube sk-cube1"}/>
                <div className={"sk-cube sk-cube2"}/>
                <div className={"sk-cube sk-cube3"}/>
                <div className={"sk-cube sk-cube4"}/>
                <div className={"sk-cube sk-cube5"}/>
                <div className={"sk-cube sk-cube6"}/>
                <div className={"sk-cube sk-cube7"}/>
                <div className={"sk-cube sk-cube8"}/>
                <div className={"sk-cube sk-cube9"}/>
            </div>
            <p>{message}</p>
        </div>
    );
};
