import enzyme, { EnzymeAdapter } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';

export default enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});
