import { Reducer } from 'redux';

import {
    VIEW_MODIFIED_FILES
} from '../types/constants';

import { 
    ModifiedFilesStructure 
} from "../types"

import {
    ViewModifiedFilesAction
} from '../actions/commonActions';

import { parseStatus } from '../components/functions/parseStatus';


export interface ViewModifiedFilesState  {
    parsedData: ModifiedFilesStructure
}

const viewModifiedFilesDefaultState: ViewModifiedFilesState = {
    parsedData: {
        _c: [],
        _s: 0,
        _d: false,
        _h: 0,
        _n: false,
        _v: {
            not_added: [],
            conflicted: [],
            created: [],
            deleted: [],
            modified: [],
            renamed: [],
            files: [{
                path: "",
                index: " ",
                working_dir: "M"
            }],
            staged: [],
            ahead: 0,
            behind: 0,
            current: "master",
            tracking: "master"
        }
    }
};

export const viewModifiedFilesReducer: Reducer<ViewModifiedFilesState> = (
    state = viewModifiedFilesDefaultState,
    action: ViewModifiedFilesAction
) => {
    switch (action.type) {
        case VIEW_MODIFIED_FILES:
            return Object.assign({}, state, {
                parsedData: parseStatus()
            });
        default: return state
    }
}