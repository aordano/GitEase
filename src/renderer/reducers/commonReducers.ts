import React from "react"

import { Reducer } from 'redux';

import {
    VIEW_MODIFIED_FILES,
    UPDATE_CHANGES_AREA
} from '../types/constants';

import { 
    ModifiedFilesStructure, ChangesTreeType 
} from "../types"

import {
    ViewModifiedFilesAction,
    UpdateChangesAreaAction
} from '../actions/commonActions';

import { parseStatus, truncate } from '../components/functions';

import { store } from "../store"

import { ChangesListElement } from "../components/interactive_elements"
export interface UpdateChangesAreaState {
    upToDate: boolean,
    changesAreaTree: ChangesTreeType[]
}

export interface ViewModifiedFilesState  {
    parsedData: ModifiedFilesStructure
}

const updateChangesAreaDefaultState: UpdateChangesAreaState = {
    upToDate: false,
    changesAreaTree: []
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
            tracking: "origin/master"
        }
    }
};



export const updateChangesAreaReducer: Reducer<UpdateChangesAreaState> = (
    state = updateChangesAreaDefaultState,
    action: UpdateChangesAreaAction
) => {
    switch (action.type) {
        case UPDATE_CHANGES_AREA:
            if (state.upToDate) {
                return Object.assign({}, state, {
                    upToDate: false
                });
            }
            const changesTree: ChangesTreeType[] = []
            if (action.filesTree?._v.modified !== undefined) {
                for (let i = 0; i < action.filesTree?._v.modified?.length; i += 1) {
                    const element: ChangesTreeType = {
                        status: "modified",
                        content: truncate(action.filesTree?._v.modified[i],35)
                    }
                    changesTree.push(element)
                }
            }
            if (action.filesTree?._v.created !== undefined) {
                for (let i = 0; i < action.filesTree?._v.created?.length; i += 1) {
                    const element: ChangesTreeType = {
                        status: "created",
                        content: truncate(action.filesTree?._v.created[i],35)
                    }
                    changesTree.push(element)
                }
            }
            if (action.filesTree?._v.renamed !== undefined) {
                for (let i = 0; i < action.filesTree?._v.renamed?.length; i += 1) {
                    const element: ChangesTreeType = {
                        status: "renamed",
                        content: truncate(action.filesTree?._v.renamed[i],35)
                    }
                    changesTree.push(element)
                }
            }
            if (action.filesTree?._v.not_added !== undefined) {
                for (let i = 0; i < action.filesTree?._v.not_added?.length; i += 1) {
                    const element: ChangesTreeType = {
                        status: "not_added",
                        content: truncate(action.filesTree?._v.not_added[i],35)
                    }
                    changesTree.push(element)
                }
            }
            if (action.filesTree?._v.deleted !== undefined) {
                for (let i = 0; i < action.filesTree?._v.deleted?.length; i += 1) {
                    const element: ChangesTreeType = {
                        status: "deleted",
                        content: truncate(action.filesTree?._v.deleted[i],35)
                    }
                    changesTree.push(element)
                }
            }
            return Object.assign({}, state, {
                changesAreaTree: changesTree
            });
        default: return state
    }
}

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