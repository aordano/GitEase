import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

// Imports the RootState type as defined in the Store
import { RootState } from '../store';

export type gitBasicWorkflowDataType = {
    message: string;
    files: string[];
    branch?: string;
    remote?: string;
};

// Exports typed redefinition of useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
