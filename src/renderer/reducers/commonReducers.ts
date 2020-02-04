// ! ###  - Common reducers main file - ###
// ! ###  - (common to all workflows) - ### 

// ---------------------
// --- Redux Imports ---
// ---------------------

import { Reducer } from 'redux';

import {ViewerComponent} from "../components/bottomBlock/viewer"

// --------------------
// --- Type Imports ---
// --------------------

import {
    VIEW_MODIFIED_FILES,
    UPDATE_CHANGES_AREA,
    SET_STAGING_STATUS,
    UPDATE_VIEW_TREE
} from '../types/constants';

import { 
    ModifiedFilesStructure, 
    ChangesTreeType,
    GitLogObjectType,
    MergeCommitType
} from "../types"

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    ViewModifiedFilesAction,
    UpdateChangesAreaAction,
    UpdateViewTreeAction
} from '../actions/commonActions';

// ------------------------
// --- Function Imports ---
// ------------------------

import { 
    parseStatus, 
    truncate, 
    stageFile,
    unstageFile,
    removeQuotes,
    parseLogTree
} from '../functions';

// -------------------------
// --- Mock Data Imports ---
// -------------------------

import {data} from "../data.mock"

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

export interface UpdateViewTreeState {
    fullHistoryPromise: {
        _v: {
            fullHistory: GitLogObjectType[],
            branchesList: string[],
            hashes: {
                hashList: string[],
                parentHashList: string[]
            },
            mergeCommitList: MergeCommitType[]
        }
    }
}

export interface UpdateChangesAreaState {
    upToDate: boolean,
    changesAreaTree: ChangesTreeType[]
}

export interface ViewModifiedFilesState  {
    parsedData: ModifiedFilesStructure
}

// -----------------------------------------
// --- Reducer Default State Definitions ---
// -----------------------------------------

export const updateViewTreeDefaultState: UpdateViewTreeState = {
    fullHistoryPromise: {
        _v: {
            fullHistory: [],
            branchesList: [],
            hashes: {
                hashList: [],
                parentHashList: []
            },
            mergeCommitList: [{
                hash: "",
                parentHashes: [""]
            }]
        }
    }
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

// ----------------
// --- Reducers ---
// ----------------

export const updateChangesAreaReducer: Reducer<UpdateChangesAreaState> = (
    // -- This reducer takes care of handling the changes area.
    // -- Does it by having a state that involves every status change on the files,
    // and evaluationg the staging status of every file aswell as declaring the status as read
    // from the parser function.
    //
    // -- It takes two possible actions:
    //
    // -- SET_STAGING_STATUS
    // This action swaps the staging state of the selected element on the files tree.
    //
    // -- UPDATE_CHANGES_AREA
    // This action updates the files tree to the current status as reported by Git.
    state = updateChangesAreaDefaultState,
    action: UpdateChangesAreaAction
) => {
    switch (action.type) {
        case SET_STAGING_STATUS:
            // -- This reducer grabs the current file in the tree as indicated by the index
            // passed in the action, and changes the staging state on the tree and stages/unstages
            // the file as needed.

            const currentChangesTree: ChangesTreeType[] = state.changesAreaTree
            // * -- currentGlobalChangesTree is the same as currentChangesTree and changesTree
            // * -- This is this way because block-scoped const definitions can't be repeated
            // * outside their scope.

            if (!state.changesAreaTree[action.index ?? 0].staged) {
                const newChange = {
                    status: state.changesAreaTree[action.index ?? 0].status,
                    content: state.changesAreaTree[action.index ?? 0].content,
                    displayContent: state.changesAreaTree[action.index ?? 0].displayContent,
                    staged: true
                }
                const newChangesTree: ChangesTreeType[] = currentChangesTree.splice(action.index ?? 0,1,newChange)
                
                data.workingDir ? 

                stageFile(state.changesAreaTree[action.index ?? 0].content, data.workingDir) :

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
            // * -- newGlobalChangesTree is the same as newChangesTree and changesTree
            // * -- This is this way because block-scoped const definitions can't be repeated
            // * outside their scope.
            // * -- In this case is not needed to fill the whole array and only is needed to replace one element.

            data.workingDir ?

            unstageFile(state.changesAreaTree[action.index ?? 0].content, data.workingDir) :

            unstageFile(state.changesAreaTree[action.index ?? 0].content)
            
            return Object.assign({}, state, {
                changesTree: newChangesTree
            });

        case UPDATE_CHANGES_AREA:
            // -- This reducer grabs the current file as parsed by the status command on the 
            // viewModifiedFilesReducer, and creates a tree of file status based on the data.

            const changesTree: ChangesTreeType[] = []
            // * -- currentGlobalChangesTree is the same as currentChangesTree and changesTree
            // * -- This is this way because block-scoped const definitions can't be repeated
            // * outside their scope.

            // -- It may seem that repetition is pointless but it allows for easier extensibility
            // in case we'd like to support more complex status or file handling in the future.
            // -- It also prevents possible errors by bounding the possible status read from the parser.

            if (action.filesTree?._v.modified !== undefined) {
                for (let i = 0; i < action.filesTree?._v.modified?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "modified",
                            content: removeQuotes(action.filesTree._v.modified[i]),
                            displayContent: truncate(removeQuotes(action.filesTree?._v.modified[i]),35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "modified",
                            content: removeQuotes(action.filesTree._v.modified[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.modified[i]),35),
                            // We truncate the filepath in a special way to display it properly
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
                            content: removeQuotes(action.filesTree._v.created[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.created[i]),35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "created",
                            content: removeQuotes(action.filesTree._v.created[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.created[i]),35),
                            // We truncate the filepath in a special way to display it properly
                            staged: false
                        }
                        changesTree.push(element)
                    }
                }
            }
            if (action.filesTree?._v.renamed !== undefined) {
                for (let i = 0; i < action.filesTree?._v.renamed?.length; i += 1) {
                    // Renamed files by definition are staged so no need to check for it
                    const element: ChangesTreeType = {
                        status: "renamed",
                        content: {
                            from: removeQuotes(action.filesTree._v.renamed[i].from),
                            to: removeQuotes(action.filesTree._v.renamed[i].to)
                        },
                        displayContent: truncate(removeQuotes(action.filesTree._v.renamed[i].to),35),
                        // We truncate the filepath in a special way to display it properly
                        staged: true
                    }
                    changesTree.push(element)
                }
            }
            if (action.filesTree?._v.not_added !== undefined) {
                for (let i = 0; i < action.filesTree?._v.not_added?.length; i += 1) {
                    if (state.changesAreaTree[i]?.staged) {
                        const element: ChangesTreeType = {
                            status: "not_added",
                            content: removeQuotes(action.filesTree._v.not_added[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.not_added[i]),35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "not_added",
                            content: removeQuotes(action.filesTree._v.not_added[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.not_added[i]),35),
                            // We truncate the filepath in a special way to display it properly
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
                            content: removeQuotes(action.filesTree._v.deleted[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.deleted[i]),35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "deleted",
                            content: removeQuotes(action.filesTree._v.deleted[i]),
                            displayContent: truncate(removeQuotes(action.filesTree._v.deleted[i]),35),
                            // We truncate the filepath in a special way to display it properly
                            staged: false
                        }
                        changesTree.push(element)
                    }
                }
            }
            // in the end pass the generated tree to the state.
            return Object.assign({}, state, {
                changesAreaTree: changesTree
            });
        default: return state
    }
}

export const viewModifiedFilesReducer: Reducer<ViewModifiedFilesState> = (
    // -- This reducer takes care of handling the changes area.
    // -- Does it by having a state that involves every status change on the files,
    // and evaluationg the staging status of every file aswell as declaring the status as read
    // from the parser function.
    //
    // -- It takes one possible action:
    //
    // -- VIEW_MODIFIED_FILES
    // This action invokes the parsed git.status() data.
    state = viewModifiedFilesDefaultState,
    action: ViewModifiedFilesAction
) => {
    switch (action.type) {
        case VIEW_MODIFIED_FILES:
            return Object.assign({}, state, {
                parsedData:  data.workingDir ? parseStatus(data.workingDir) : parseStatus()
            });
        default: return state
    }
}

export const updateViewTreeReducer: Reducer<UpdateViewTreeState> = (
    // -- This reducer takes care of handling the changes area.
    // -- Does it by having a state that involves every status change on the files,
    // and evaluationg the staging status of every file aswell as declaring the status as read
    // from the parser function.
    //
    // -- It takes one possible action:
    //
    // -- VIEW_MODIFIED_FILES
    // This action invokes the parsed git.status() data.
    state = updateViewTreeDefaultState,
    action: UpdateViewTreeAction
) => {
    switch (action.type) {
        case UPDATE_VIEW_TREE:
            const history = 
                data.workingDir ? 
                Promise.resolve(parseLogTree(data.workingDir)) : 
                Promise.resolve(parseLogTree())
            return Object.assign({}, state, {
                fullHistoryPromise: history
            });
        default: return state
    }
}