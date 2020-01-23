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

// --------------------------
// --- Main App Component ---
// --------------------------

const Application = () => (
    <div>
        <div className={'left-block'}>
            <LeftBlock />
        </div>
        <div className={'main-block'}>
            <TopBlock />
            <BottomBlock />
        </div>
    </div>
);

export default hot(Application);
