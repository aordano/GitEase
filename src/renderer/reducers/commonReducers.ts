// ! ###  - Common reducers main file - ###
// ! ###  - (common to all workflows) - ### 

// ---------------
// --- Imports ---
// ---------------

import { Reducer } from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

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

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    ViewModifiedFilesAction,
    UpdateChangesAreaAction
} from '../actions/commonActions';

// ------------------------
// --- Function Imports ---
// ------------------------

import { 
    parseStatus, 
    truncate, 
    stageFile,
    unstageFile 
} from '../components/functions';

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

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
    // -- It takes three possible actions:
    //
    // -- SET_GLOBAL_STAGING_STATUS
    // This action swaps the staging state of every element on the files tree.
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
        case SET_GLOBAL_STAGING_STATUS:
            // -- This reducer grabs the current files tree, and changes the staging state
            // of every file in the tree. It also stages/unstages the files and changes the
            // checked/unchecked status of the item on the list.

            // TODO Change the checked/unchecked status of the element in the list

            const currentGlobalChangesTree: ChangesTreeType[] = state.changesAreaTree
            const newGlobalChangesTree: ChangesTreeType[] = []
            // * -- currentGlobalChangesTree is the same as currentChangesTree and changesTree
            // * -- newGlobalChangesTree is the same as newChangesTree and changesTree
            // * -- This is this way because block-scoped const definitions can't be repeated
            // * outside their scope.

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
                            content: action.filesTree._v.modified[i],
                            displayContent: truncate(action.filesTree?._v.modified[i],35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "modified",
                            content: action.filesTree._v.modified[i],
                            displayContent: truncate(action.filesTree?._v.modified[i],35),
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
                            content: action.filesTree._v.created[i],
                            displayContent: truncate(action.filesTree?._v.created[i],35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "created",
                            content: action.filesTree._v.created[i],
                            displayContent: truncate(action.filesTree?._v.created[i],35),
                            // We truncate the filepath in a special way to display it properly
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
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "renamed",
                            content: action.filesTree._v.renamed[i],
                            displayContent: truncate(action.filesTree?._v.renamed[i],35),
                            // We truncate the filepath in a special way to display it properly
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
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "not_added",
                            content: action.filesTree._v.not_added[i],
                            displayContent: truncate(action.filesTree?._v.not_added[i],35),
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
                            content: action.filesTree._v.deleted[i],
                            displayContent: truncate(action.filesTree?._v.deleted[i],35),
                            // We truncate the filepath in a special way to display it properly
                            staged: state.changesAreaTree[i].staged
                        }
                        changesTree.push(element)
                    }
                    else {
                        const element: ChangesTreeType = {
                            status: "deleted",
                            content: action.filesTree._v.deleted[i],
                            displayContent: truncate(action.filesTree?._v.deleted[i],35),
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
                parsedData: parseStatus()
            });
        default: return state
    }
}