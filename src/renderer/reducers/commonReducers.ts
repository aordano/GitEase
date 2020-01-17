import React from "react"

import { Reducer, AnyAction } from 'redux';

import {
    VIEW_MODIFIED_FILES,
    UPDATE_CHANGES_AREA,
    SET_STAGING_STATUS,
    SET_GLOBAL_STAGING_STATUS
} from '../types/constants';

import { 
    ModifiedFilesStructure, 
    ChangesTreeType
} from "../types"

import {
    ViewModifiedFilesAction,
    UpdateChangesAreaAction
} from '../actions/commonActions';

import { 
    parseStatus, 
    truncate, 
    stageFile,
    unstageFile 
} from '../components/functions';

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
        case SET_GLOBAL_STAGING_STATUS:
            const currentGlobalChangesTree: ChangesTreeType[] = state.changesAreaTree
            const newGlobalChangesTree: ChangesTreeType[] = []
            for (let i = 0; i < currentGlobalChangesTree.length; i += 1) {
                if (state.changesAreaTree[i]?.staged) {
                    unstageFile(state.changesAreaTree[i].content)
                    const element: ChangesTreeType = {
                        status: state.changesAreaTree[i].status,
                        content: state.changesAreaTree[i].content,
                        displayContent: state.changesAreaTree[i].displayContent,
                        staged: false
                    }
                    newGlobalChangesTree.push(element)
                }
                else {
                    stageFile(state.changesAreaTree[i].content)
                    const element: ChangesTreeType = {
                        status: state.changesAreaTree[i].status,
                        content: state.changesAreaTree[i].content,
                        displayContent: state.changesAreaTree[i].displayContent,
                        staged: true
                    }
                    newGlobalChangesTree.push(element)
                }
                return Object.assign({}, state, {
                    changesTree: newGlobalChangesTree
                });
            }
        case SET_STAGING_STATUS:
            const currentChangesTree: ChangesTreeType[] = state.changesAreaTree
            if (!state.changesAreaTree[action.index ?? 0].staged) {
                const newChange = {
                    status: state.changesAreaTree[action.index ?? 0].status,
                    content: state.changesAreaTree[action.index ?? 0].content,
                    displayContent: state.changesAreaTree[action.index ?? 0].displayContent,
                    staged: true
                }
                const newChangesTree: ChangesTreeType[] = currentChangesTree.splice(action.index ?? 0,1,newChange)
                stageFile(state.changesAreaTree[action.index ?? 0].content)
                return Object.assign({}, state, {
                    changesTree: newChangesTree
                });
            }
            const newChange = {
                status: state.changesAreaTree[action.index ?? 0].status,
                content: state.changesAreaTree[action.index ?? 0].content,
                displayContent: state.changesAreaTree[action.index ?? 0].displayContent,
                staged: false
            }
            const newChangesTree: ChangesTreeType[] = currentChangesTree.splice(action.index ?? 0,1,newChange)
            unstageFile(state.changesAreaTree[action.index ?? 0].content)
            return Object.assign({}, state, {
                changesTree: newChangesTree
            });
        case UPDATE_CHANGES_AREA:
            if (state.upToDate) {
                return Object.assign({}, state, {
                    upToDate: false
                });
            }
            const changesTree: ChangesTreeType[] = []
            if (action.filesTree?._v.modified !== undefined) {
                for (let i = 0; i < action.filesTree?._v.modified?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "modified",
                            content: action.filesTree._v.modified[i],
                            displayContent: truncate(action.filesTree?._v.modified[i],35),
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "modified",
                            content: action.filesTree._v.modified[i],
                            displayContent: truncate(action.filesTree?._v.modified[i],35),
                            staged: false
                        }
                        changesTree.push(element)
                    }
                }
            }
            if (action.filesTree?._v.created !== undefined) {
                for (let i = 0; i < action.filesTree?._v.created?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "created",
                            content: action.filesTree._v.created[i],
                            displayContent: truncate(action.filesTree?._v.created[i],35),
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "created",
                            content: action.filesTree._v.created[i],
                            displayContent: truncate(action.filesTree?._v.created[i],35),
                            staged: false
                        }
                        changesTree.push(element)
                    }
                }
            }
            if (action.filesTree?._v.renamed !== undefined) {
                for (let i = 0; i < action.filesTree?._v.renamed?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "renamed",
                            content: action.filesTree._v.renamed[i],
                            displayContent: truncate(action.filesTree?._v.renamed[i],35),
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "renamed",
                            content: action.filesTree._v.renamed[i],
                            displayContent: truncate(action.filesTree?._v.renamed[i],35),
                            staged: false
                        }
                        changesTree.push(element)
                    }
                }
            }
            if (action.filesTree?._v.not_added !== undefined) {
                for (let i = 0; i < action.filesTree?._v.not_added?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "not_added",
                            content: action.filesTree._v.not_added[i],
                            displayContent: truncate(action.filesTree?._v.not_added[i],35),
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "not_added",
                            content: action.filesTree._v.not_added[i],
                            displayContent: truncate(action.filesTree?._v.not_added[i],35),
                            staged: false
                        }
                        changesTree.push(element)
                    }
                }
            }
            if (action.filesTree?._v.deleted !== undefined) {
                for (let i = 0; i < action.filesTree?._v.deleted?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "deleted",
                            content: action.filesTree._v.deleted[i],
                            displayContent: truncate(action.filesTree?._v.deleted[i],35),
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "deleted",
                            content: action.filesTree._v.deleted[i],
                            displayContent: truncate(action.filesTree?._v.deleted[i],35),
                            staged: false
                        }
                        changesTree.push(element)
                    }
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