// ! ###  - Context Menu Components - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

// ----------------------------------
// --- React Context Menu Imports ---
// ----------------------------------

import { ContextMenu, MenuItem } from "react-contextmenu";

// ------------------
// --- Components ---
// ------------------


export const contextMenus: React.ReactNode = 
        <div className="context-menus">
            <ContextMenu
                id="defaultContextMenu"
                key={"IDDEFAULT_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                default - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                default - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                default - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="nodeGraphContextMenu"
                key={"IDNODE_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                node - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                node - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                node - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="graphBackgroundContextMenu"
                key={"IDGRAPH_BACKGROUND_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                graph background - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                graph background - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                graph background - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="commitButtonContextMenu"
                key={"IDCOMMIT_BUTTON_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                commit button - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                commit button - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                commit button - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="stagingAreaContextMenu"
                key={"IDSTAGING_AREA_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                staging area - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                staging area - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                staging area - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="stagingAreaItemContextMenu"
                key={"IDSTAGING_AREA_ITEM_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                staging area item - ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                staging area item - ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                staging area item - ContextMenu Item 3
                </MenuItem>
            </ContextMenu>
        </div>