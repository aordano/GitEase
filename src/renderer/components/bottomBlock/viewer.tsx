// ! ###  - Viewer - ###

// TODO -- Refactor according to interactive_elements.tsx

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ------------------------
// --- GitGraph Imports ---
// ------------------------

import { 
    Gitgraph, 
    Orientation, 
    Mode
} from '@gitgraph/react';

import {store} from "../../store"

// ----------------------
// --- Static Imports ---
// ----------------------

require('../../static/scss/viewer.scss');

// ------------------------
// --- Viewer Component ---
// ------------------------

// TODO write a reducer to check the state of the commit/branches history 
// TODO link the reducer state to the viewer as to display the current repo
// TODO style the viewer
// TODO make it zoomable and scrollable
// TODO Document it better

export const ViewerComponent: React.FC = () => {
    return (
        <Gitgraph
            options={{
                mode: Mode.Compact,
            }}
        >
            {gitgraph => {

                const drawTree = () => {
                    const fullHistory = store.getState()?.updateViewTreeReducer.fullHistoryPromise._v.fullHistory ?? []
                    for (let i = fullHistory.length - 1 ?? 0; i > 0; i -= 1) {
                        const curentBranch = gitgraph.branch(String(fullHistory[i].branch))
                        curentBranch.commit(fullHistory[i].message)    
                    }
                }

                setTimeout(() => {
                    drawTree()
                }, 3500) // * artificial delay to avoid failure due to race conditions

                
            }}
        </Gitgraph>
    );
};
