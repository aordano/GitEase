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
    Orientation 
} from '@gitgraph/react';

// ----------------------
// --- Static Imports ---
// ----------------------

require('../static/scss/viewer.scss');

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
                orientation: Orientation.Horizontal
            }}
        >
            {gitgraph => {
                // Simulate git commands with Gitgraph API.
                const master = gitgraph.branch('master');
                master.commit('Initial commit');

                const develop = gitgraph.branch('develop');
                develop.commit('Add TypeScript');

                const aFeature = gitgraph.branch('feature');
                aFeature
                    .commit('Make it work')
                    .commit('Make it right')
                    .commit('Make it fast');

                develop.merge(aFeature);
                develop.commit('Prepare v1');

                master.merge(develop).tag('v1.0.0');
            }}
        </Gitgraph>
    );
};
