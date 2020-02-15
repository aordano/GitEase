import * as React from 'react';
import { shallow } from 'enzyme';
import { ActionsSpace } from '../../../../src/renderer/components/topBlock/actionsSpace';

import '../../setupEnzyme';

describe('Actions Space Component', () => {
    it('Renders component correctly', () => {
        const ActionSpaceComponent = shallow(<ActionsSpace />);
    });
});
