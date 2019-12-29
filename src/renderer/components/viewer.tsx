import * as React from 'react';

import { Gitgraph, Orientation } from '@gitgraph/react';

require('../static/scss/viewer.scss');

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
