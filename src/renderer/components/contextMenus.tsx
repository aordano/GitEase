// ! ###  - Context Menu Components - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

import {
    Link
} from "react-router-dom";

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

// ----------------------------
// --- Localization Imports ---
// ----------------------------

import { readConfigSync } from "../functions/config"

const getLanguage = () => { 

    // ? We do this instead of reading from state because a 
    // ? timeoput or async function would get race conditions and break the components
    const configData = readConfigSync()

    let configObject

    if (configData) {
        configObject = JSON.parse(configData)
    }
    return configObject.UIConfig.language
}

const localization = require(`../lang/${getLanguage()}`)

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
                hideOnLeave={true}
                key={"IDDEFAULT_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Coffee color={"black"} size={16} />
                    <Link to={"/firstwizardgreeting"}>
                        {localization.defaultContextMenuLaunchWizard} (wip)
                    </Link>
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Plus color={"black"} size={16} />
                    {localization.defaultContextMenuNewProject} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Folder color={"black"} size={16} />
                    {localization.defaultContextMenuOpenProject} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Repeat color={"black"} size={16} />
                    {localization.defaultContextMenuChangeProject} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} />
                    {localization.defaultContextMenuProjectSettings} (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Repeat color={"black"} size={16} />
                    {localization.defaultContextMenuChangeRepository} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} />
                    {localization.defaultContextMenuRepositorySettings} (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Settings color={"black"} size={16}/> 
                    { localization.defaultContextMenuGeneralSettings } (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="nodeGraphContextMenu"
                hideOnLeave={true}
                key={"IDNODE_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.RotateCcw color={"black"} size={16} /> 
                    { localization.nodeGraphContextMenuRevertCommit } (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.LogIn color={"black"} size={16} /> 
                    { localization.nodeGraphContextMenuChangeBranch } (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.GitCommit color={"black"} size={16} />
                    {localization.nodeGraphContextMenuViewCommit} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.GitBranch color={"black"} size={16} />
                    {localization.nodeGraphContextMenuCreateBranch} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.GitMerge color={"black"} size={16} />
                    {localization.nodeGraphContextMenuMergeBranch} (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.AlertOctagon color={"black"} size={16} />
                    {localization.nodeGraphContextMenuRebase} (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Columns color={"black"} size={16} /> 
                    { localization.nodeGraphContextMenuViewDiff } (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="graphBackgroundContextMenu"
                hideOnLeave={true}
                key={"IDGRAPH_BACKGROUND_CONTEXT_MENU"}
            >
                <MenuItem
                    data={{ foo: 'bar' }}
                    onClick={redrawGraph}
                >
                    <Icon.RefreshCw color={"black"} size={16} /> 
                    { localization.graphBackgroundContextMenuRedraw }
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Repeat color={"black"} size={16} /> 
                    { localization.graphBackgroundContextMenuChangeRepository } (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Box color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} /> 
                    { localization.graphBackgroundContextMenuRepositorySettings } (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Settings color={"black"} size={16} /> 
                    { localization.graphBackgroundContextMenuProjectSettings } (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Hexagon color={"black"} size={16} />
                    <Icon.Info color={"black"} size={16} /> 
                    { localization.graphBackgroundContextMenuProjectInformation } (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="commitButtonContextMenu"
                hideOnLeave={true}
                key={"IDCOMMIT_BUTTON_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Check color={"black"} size={16} /> 
                    { localization.commitButtonContextMenuCommitOnly } (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.CheckCircle color={"black"} size={16} />
                    { localization.commitButtonContextMenuCommitAndPush } (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.UploadCloud color={"black"} size={16} />
                    { localization.commitButtonContextMenuPushOnly } (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.RotateCcw color={"black"} size={16} /> 
                    { localization.commitButtonContextMenuRevertLast } (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="stagingAreaContextMenu"
                hideOnLeave={true}
                key={"IDSTAGING_AREA_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.PlusCircle color={"black"} size={16} /> 
                    { localization.stagingAreaContextMenuStageAll }  (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.Trash2 color={"black"} size={16} /> 
                    { localization.stagingAreaContextMenuDiscardAll } (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Archive color={"black"} size={16} /> 
                    { localization.stagingAreaContextMenuStash } (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Folder color={"black"} size={16} /> 
                    { localization.stagingAreaContextMenuOpen } (wip)
                </MenuItem>
            </ContextMenu>,
            <ContextMenu
                id="stagingAreaItemContextMenu"
                hideOnLeave={true}
                key={"IDSTAGING_AREA_ITEM_CONTEXT_MENU"}
            >
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.FilePlus color={"black"} size={16} /> 
                    { localization.stagingAreaItemContextMenuStage } (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}}>
                    <Icon.FileMinus color={"black"} size={16} /> 
                    { localization.stagingAreaItemContextMenuDiscard } (wip)
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.Folder color={"black"} size={16} /> 
                    { localization.stagingAreaItemContextMenuShow }  (wip)
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                    <Icon.File color={"black"} size={16} />
                    {localization.stagingAreaItemContextMenuOpen} (wip)
                </MenuItem>
            </ContextMenu>
        </div>