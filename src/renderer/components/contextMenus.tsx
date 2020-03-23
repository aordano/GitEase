// ! ###  - Context Menu Components - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenu, MenuItem } from "react-contextmenu";

// ---------------------
// --- Store Imports ---
// ---------------------

import { store } from '../store/index.redux.store';

// ---------------------
// --- Icons Imports ---
// ---------------------

import * as Icon from 'react-feather';

// ------------------------------
// --- Action Creator Imports ---
// ------------------------------

import { UpdateViewTreeAction } from '../actions/commonActions.redux.action';

// ------------------
// --- Components ---
// ------------------

const redrawGraph = () => {
    store.dispatch(UpdateViewTreeAction())
}


export const contextMenus: React.ReactNode = 
        <div className="context-menus">
            <ContextMenu
                id="defaultContextMenu"
                key={"IDDEFAULT_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Loader color={"black"} size={16}/> Launch wizard (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Plus color={"black"} size={16} /> New project (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Folder color={"black"} size={16} /> Open project (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Repeat color={"black"} size={16} /> Change project (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} /> Project settings (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Repeat color={"black"} size={16} /> Change repository (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} /> Repository settings (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Settings color={"black"} size={16}/> General settings (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="nodeGraphContextMenu"
                key={"IDNODE_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.RotateCcw color={"black"} size={16}/> Revert to this commit (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.LogIn color={"black"} size={16}/> Change to this branch (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.GitCommit color={"black"} size={16}/> View Commit information (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.GitBranch color={"black"} size={16}/> Branch from here (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.GitMerge color={"black"} size={16}/> Merge into this branch (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.AlertOctagon color={"black"} size={16}/> Rebase (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Columns color={"black"} size={16}/> View Diff (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="graphBackgroundContextMenu"
                key={"IDGRAPH_BACKGROUND_CONTEXT_MENU"}
            >
                <MenuItem
                    data={{ foo: 'bar' }}
                    onClick={redrawGraph}
                >
                    <Icon.RefreshCw color={"black"} size={16}/> Redraw Graph
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Repeat color={"black"} size={16} /> Change repository (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} />  Repository settings (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} /> Project settings (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Info color={"black"} size={16} /> View project information (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="commitButtonContextMenu"
                key={"IDCOMMIT_BUTTON_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Check color={"black"} size={16}/> Commit only (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.CheckCircle color={"black"} size={16}/> Commit and push (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.UploadCloud color={"black"} size={16}/> Push only (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.RotateCcw color={"black"} size={16}/> Revert last commit (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="stagingAreaContextMenu"
                key={"IDSTAGING_AREA_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.PlusCircle color={"black"} size={16}/> Stage all files (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Trash2 color={"black"} size={16}/> Discard all changes (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Archive color={"black"} size={16}/> Stash changes (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Folder color={"black"} size={16}/> Open project in file explorer (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="stagingAreaItemContextMenu"
                key={"IDSTAGING_AREA_ITEM_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.FilePlus color={"black"} size={16}/> Stage file (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.FileMinus color={"black"} size={16}/> Discard changes (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Folder color={"black"} size={16}/> Show file in file explorer  (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.File color={"black"} size={16}/> Open file (wip)
                </MenuItem>
            </ContextMenu>
        </div>