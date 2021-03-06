// ! ###  - Common reducers main file - ###
// ! ###  - (common to all workflows) - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { Reducer } from 'redux';

import { ViewerComponent } from '../components/bottomBlock/viewer';

import { store } from "../store/index.redux.store"

// --------------------
// --- Type Imports ---
// --------------------

import {
    VIEW_MODIFIED_FILES,
    UPDATE_CHANGES_AREA,
    SET_STAGING_STATUS,
    UPDATE_VIEW_TREE,
    SET_CONTEXT_MENU_ID,
    STORE_COMMIT_LABEL,
    SET_REACT_TAG_DATA,
    UPDATE_COMMIT_DESCRIPTION_VIEW,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS
} from '../types/constants';

import {
    ModifiedFilesStructure,
    ChangesTreeType,
    GitLogObjectType,
    GitGraphNodeMetadataType,
    GitNodeType,
    GitLinkType,
    ReactTagTagType,
    labelType,
    GitCommitDescriptionType,
    CompletionStatusType
} from '../types/index';

// ----------------------
// --- Action Imports ---
// ----------------------

import {
    ViewModifiedFilesAction,
    UpdateChangesAreaAction,
    UpdateViewTreeAction,
    SetContextMenuIdAction,
    ReactTagDataAction,
    UpdateCommitDescriptionViewAction,
    UpdateCommitDescriptionElementNameAction,
    UpdateCommitDescriptionElementWhatAction,
    UpdateCommitDescriptionElementWhyAction,
    UpdateCommitDescriptionAction
} from '../actions/commonActions.redux.action';

// ------------------------
// --- Function Imports ---
// ------------------------

import { parseStatus, truncate, stageFile, unstageFile, removeQuotes } from '../functions';

import { parseLogTree, generateGraphData } from '../functions/gitGraph';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

import { readConfigSync } from "../functions/config"

const getLanguage = () => { 

    // ? We do this instead of reading from state because a 
    // ? timeout or async function would get race conditions and break the components
    const configData = readConfigSync()

    let configObject

    if (configData) {
        configObject = JSON.parse(configData)
    }
    return configObject.UIConfig.language
}

const localization = require(`../lang/${getLanguage()}`)

// ---------------------------------
// --- Reducer State Definitions ---
// ---------------------------------

export interface UpdateViewTreeState {
    dataPromise: {
        graphData: {
            _v: {
                nodes: GitNodeType[],
                links: GitLinkType[],
                focusedNodeId: string
            }
        },
        history: {
            _v: {
                fullHistory: GitLogObjectType[];
                branchesList: string[];
                metadataList: GitGraphNodeMetadataType[];
                hashes: {
                    hashList: string[];
                    parentHashList: string[];
                };
            }
        }
    };
}

export interface UpdateChangesAreaState {
    changesAreaTree: ChangesTreeType[];
}

export interface ViewModifiedFilesState {
    upToDate: boolean,
    parsedData: ModifiedFilesStructure;
}

export interface SetContextMenuIdState {
    id: string
}

export interface ReactTagDataState {
    tags: {
        tagData: ReactTagTagType[] | null,
        suggestions: ReactTagTagType[]
    },
    label: string
}

export interface GitCommitDescriptionState {
    currentView: string;
    currentIndex: number;
    completionStatus: CompletionStatusType[];
    descriptionWhat: string[],
    descriptionWhy: string[],
    changedElements: string[],
}

// -----------------------------------------
// --- Reducer Default State Definitions ---
// -----------------------------------------

export const updateViewTreeDefaultState: UpdateViewTreeState = {
    dataPromise: {
        graphData: {
            _v: {
                nodes: [
                    {
                        id: "placeholder",
                        color: "placeholder",
                        size: 200,
                        symbolType: "placeholder"
                    }
                ],
                links: [
                    {
                        source: "placeholder",
                        target: "placeholder",
                        color: "rgb(200,200,200)"
                    }
                ],
                focusedNodeId: "placeholder"
            }
        },
        history: {
            _v: {
                fullHistory: [],
                branchesList: [],
                metadataList: [
                    {
                        isInitial: false,
                        isDivergence: false,
                        isMerge: false,
                        isLast: false,
                        childrenOf: ["placeholder"],
                        parentOf: ["placeholder"],
                        branch: {
                            branchName: "placeholder",
                            branchColor: {
                                r: 200,
                                g: 200,
                                b: 200
                            }
                        }
                    }
                ],
                hashes: {
                    hashList: [],
                    parentHashList: []
                }
            }
        }
    }
};



const updateChangesAreaDefaultState: UpdateChangesAreaState = {
    changesAreaTree: []
};

const viewModifiedFilesDefaultState: ViewModifiedFilesState = {
    upToDate: false,
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
            files: [
                {
                    path: '',
                    index: ' ',
                    working_dir: 'M'
                }
            ],
            staged: [],
            ahead: 0,
            behind: 0,
            current: 'master',
            tracking: 'origin/master'
        }
    }
};

const SetContextMenuIdDefaultState: SetContextMenuIdState = {
    id: "defaultContextMenu"
}

const labelNames = localization.labelsDictionary.map((value: labelType) => { return value.label })

const suggestions: any = []

labelNames.forEach((value: string, index: number) => { suggestions.push({ id: index, name: value }) })

const ReactTagDataDefaultState: ReactTagDataState = {
    tags: {
        suggestions,
        tagData: null
    },
    label: ""
}

const gitCommitDescriptionDefaultState: GitCommitDescriptionState = {
    currentView: "list",
    currentIndex: 0,
    completionStatus: [{
        isWhatCompleted: false,
        isWhyCompleted: false
    }],
    descriptionWhat: [""],
    descriptionWhy: [""],
    changedElements: [""],
}

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

            const currentChangesTree: ChangesTreeType[] = state.changesAreaTree;
            // * -- currentGlobalChangesTree is the same as currentChangesTree and changesTree
            // * -- This is this way because block-scoped const definitions can't be repeated
            // * outside their scope.

            if (!state.changesAreaTree[action.index ?? 0].staged) {
                const newChange = {
                    status: state.changesAreaTree[action.index ?? 0].status,
                    content: state.changesAreaTree[action.index ?? 0].content,
                    displayContent: state.changesAreaTree[action.index ?? 0].displayContent,
                    staged: true
                };
                const newChangesTree: ChangesTreeType[] = currentChangesTree.splice(
                    action.index ?? 0,
                    1,
                    newChange
                );

                stageFile(state.changesAreaTree[action.index ?? 0].content);

                return Object.assign({}, state, {
                    changesTree: newChangesTree
                });
            }
            const newChange = {
                status: state.changesAreaTree[action.index ?? 0].status,
                content: state.changesAreaTree[action.index ?? 0].content,
                displayContent: state.changesAreaTree[action.index ?? 0].displayContent,
                staged: false
            };

            const newChangesTree: ChangesTreeType[] = currentChangesTree.splice(
                action.index ?? 0,
                1,
                newChange
            );
            // * -- newGlobalChangesTree is the same as newChangesTree and changesTree
            // * -- This is this way because block-scoped const definitions can't be repeated
            // * outside their scope.
            // * -- In this case is not needed to fill the whole array and only is needed to replace one element.

            unstageFile(state.changesAreaTree[action.index ?? 0].content);

            return Object.assign({}, state, {
                changesTree: newChangesTree
            });

        case UPDATE_CHANGES_AREA:

            if (action.filesTree?._v) {
                // -- This reducer grabs the current file as parsed by the status command on the
                // viewModifiedFilesReducer, and creates a tree of file status based on the data.

                const changesTree: ChangesTreeType[] = [];
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
                                status: 'modified',
                                content: removeQuotes(action.filesTree._v.modified[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree?._v.modified[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: state.changesAreaTree[i].staged
                            };
                            changesTree.push(element);
                        } else {
                            const element: ChangesTreeType = {
                                status: 'modified',
                                content: removeQuotes(action.filesTree._v.modified[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.modified[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: false
                            };
                            changesTree.push(element);
                        }
                    }
                }
                if (action.filesTree?._v.created !== undefined) {
                    for (let i = 0; i < action.filesTree?._v.created?.length; i += 1) {
                        if (state.changesAreaTree[i]?.staged) {
                            const element: ChangesTreeType = {
                                status: 'created',
                                content: removeQuotes(action.filesTree._v.created[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.created[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: state.changesAreaTree[i].staged
                            };
                            changesTree.push(element);
                        } else {
                            const element: ChangesTreeType = {
                                status: 'created',
                                content: removeQuotes(action.filesTree._v.created[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.created[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: false
                            };
                            changesTree.push(element);
                        }
                    }
                }
                if (action.filesTree?._v.renamed !== undefined) {
                    for (let i = 0; i < action.filesTree?._v.renamed?.length; i += 1) {
                        // Renamed files by definition are staged so no need to check for it
                        const element: ChangesTreeType = {
                            status: 'renamed',
                            content: {
                                from: removeQuotes(action.filesTree._v.renamed[i].from),
                                to: removeQuotes(action.filesTree._v.renamed[i].to)
                            },
                            displayContent: truncate(
                                removeQuotes(action.filesTree._v.renamed[i].to),
                                35
                            ),
                            // We truncate the filepath in a special way to display it properly
                            staged: true
                        };
                        changesTree.push(element);
                    }
                }
                if (action.filesTree?._v.not_added !== undefined) {
                    for (let i = 0; i < action.filesTree?._v.not_added?.length; i += 1) {
                        if (state.changesAreaTree[i]?.staged) {
                            const element: ChangesTreeType = {
                                status: 'not_added',
                                content: removeQuotes(action.filesTree._v.not_added[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.not_added[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: state.changesAreaTree[i].staged
                            };
                            changesTree.push(element);
                        } else {
                            const element: ChangesTreeType = {
                                status: 'not_added',
                                content: removeQuotes(action.filesTree._v.not_added[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.not_added[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: false
                            };
                            changesTree.push(element);
                        }
                    }
                }
                if (action.filesTree?._v.deleted !== undefined) {
                    for (let i = 0; i < action.filesTree?._v.deleted?.length; i += 1) {
                        if (state.changesAreaTree[i]?.staged) {
                            const element: ChangesTreeType = {
                                status: 'deleted',
                                content: removeQuotes(action.filesTree._v.deleted[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.deleted[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: state.changesAreaTree[i].staged
                            };
                            changesTree.push(element);
                        } else {
                            const element: ChangesTreeType = {
                                status: 'deleted',
                                content: removeQuotes(action.filesTree._v.deleted[i]),
                                displayContent: truncate(
                                    removeQuotes(action.filesTree._v.deleted[i]),
                                    35
                                ),
                                // We truncate the filepath in a special way to display it properly
                                staged: false
                            };
                            changesTree.push(element);
                        }
                    }
                }
                // in the end pass the generated tree to the state.
                return Object.assign({}, state, {
                    changesAreaTree: changesTree
                });
            }
    
        default:
            return state;
    }
};

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
        
        default:
            return state;
    }
};

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
    action: UpdateViewTreeAction,
) => {
    switch (action.type) {
        case UPDATE_VIEW_TREE:
            // ? We read from the config file instead of state because passing state from the root reducer 
            // might prove a headache.

            const configData = readConfigSync()

            let configObject
        
            if (configData) {
                configObject = JSON.parse(configData)
            }
            const activeRepo = configObject.ReposConfig.activeRepo

            let history
            let graphData
            if (activeRepo) {
                history = Promise.resolve(parseLogTree(activeRepo))
                graphData = Promise.resolve(generateGraphData(activeRepo))
            } else {
                history = Promise.resolve(parseLogTree())
                graphData = Promise.resolve(generateGraphData())
            }
            return Object.assign({}, state, {
                dataPromise: {
                    graphData,
                    history
                }
            });
        default:
            return state;
    }
};

export const setContextMenuIdReducer: Reducer<SetContextMenuIdState, SetContextMenuIdAction> = (
    // -- 
    state = SetContextMenuIdDefaultState,
    action: SetContextMenuIdAction
) => {
    switch (action.type) {
        case SET_CONTEXT_MENU_ID:
            return Object.assign({}, state, {
                id: action.newId
            });
        default:
            return state;
    }
};

export const reactTagDataReducer: Reducer<ReactTagDataState, ReactTagDataAction> = (
    // -- 
    state = ReactTagDataDefaultState,
    action: ReactTagDataAction
) => {
    switch (action.type) {
        case STORE_COMMIT_LABEL:
            return Object.assign({}, state, {
                label: action.label
            });
        
        case SET_REACT_TAG_DATA: 
            return Object.assign({}, state, {
                tags: action.tags
            });
        
        default:
            return state;
    }
};


export interface GitCommitDescriptionState {
    currentView: string;
    currentIndex: number;
    descriptionWhat: string[],
    descriptionWhy: string[],
    changedElements: string[],
}


export const gitCommitDescriptionReducer: Reducer<GitCommitDescriptionState, UpdateCommitDescriptionAction> = (
    // -- 
    state = gitCommitDescriptionDefaultState,
    action: UpdateCommitDescriptionAction
) => {
    switch (action.type) {
        case UPDATE_COMMIT_DESCRIPTION_VIEW:
            return Object.assign({}, state, {
                currentView: action.view
            });
        
        case UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME:

            const currentChangedElements = state.changedElements
            
            if (currentChangedElements.length > action.index) {
                currentChangedElements[action.index] = action.name
                
                return Object.assign({}, state, {
                    changedElements: currentChangedElements,
                    currentIndex: action.index
                });

            } 

            currentChangedElements.push(action.name)

            return Object.assign({}, state, {
                changedElements: currentChangedElements,
                currentIndex: currentChangedElements.length - 1
            });
        
        case UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT:

            const currentDescriptionWhat = state.descriptionWhat
            
            if (currentDescriptionWhat.length > action.index) {
                currentDescriptionWhat.splice(action.index, 1, action.what)
                
                return Object.assign({}, state, {
                    descriptionWhat: currentDescriptionWhat,
                    currentIndex: action.index
                });

            } 

            currentDescriptionWhat.push(action.what)

            return Object.assign({}, state, {
                descriptionWhat: currentDescriptionWhat,
                currentIndex: currentDescriptionWhat.length - 1
            });
        
        case UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY:

            const currentDescriptionWhy = state.descriptionWhy
            
            if (currentDescriptionWhy.length > action.index) {
                currentDescriptionWhy.splice(action.index, 1, action.why)
                
                return Object.assign({}, state, {
                    descriptionWhy: currentDescriptionWhy,
                    currentIndex: action.index
                });

            } 

            currentDescriptionWhy.push(action.why)

            return Object.assign({}, state, {
                descriptionWhy: currentDescriptionWhy,
                currentIndex: currentDescriptionWhy.length - 1
            });
        
        case UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS:

            const currentCompletionStatus = state.completionStatus
            
            if (currentCompletionStatus.length > action.index) {
                currentCompletionStatus[action.index] = action.completionStatus
                
                return Object.assign({}, state, {
                    completionStatus: currentCompletionStatus,
                    currentIndex: action.index
                });

            } 

            currentCompletionStatus.push(action.completionStatus)

            return Object.assign({}, state, {
                completionStatus: currentCompletionStatus,
                currentIndex: currentCompletionStatus.length - 1
            });
        
        default:
            return state;
    }
};

