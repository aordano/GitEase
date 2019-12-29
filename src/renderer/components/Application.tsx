import { hot } from 'react-hot-loader/root';
import * as React from 'react';

require('../static/scss/main.scss');

import { CommitComponent, ActionsComponent } from './interactive_elements';
import { ViewerComponent } from './viewer';

const Application = () => (
    <div>
        <div className={'left-block'}>
            <CommitComponent />
        </div>
        <div className={'main-block'}>
            <ActionsComponent />
            <ViewerComponent />
        </div>
    </div>
);

export default hot(Application);
