// ! ###  - Application menu bar - ###

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../data.mock")

const localization = require(`../lang/${mockData.lang}`)

import * as path from "path"

// -------------------------------
// --- Custom titlebar imports ---
// -------------------------------

import { Titlebar, Color } from 'custom-electron-titlebar'

import{ remote } from "electron"

const encodeAsImage = (iconName: string) => {
    return remote.nativeImage.createFromDataURL(`data:image/png,/src/renderer/static/icons/SVG/${iconName}.svg`)
}

/*
Replace the updateIcon function on menuitem.js present on the 
custom-electron-titlebar package with this one to pass encoded paths

updateIcon() {
        let icon = null;
        if (this.item.icon) {
            icon = this.item.icon;
        }
        if (icon) {
            // ? Custom patch to be able to pass the icon data as a NativeImage made by encoding the path into a base64 image
            const iconE = dom_1.append(this.iconElement, dom_1.$('img'));
            if (typeof icon !== String) {
                iconE.setAttribute('src', atob(icon.toDataURL().slice(22))); // ? The slice is there to remove the header of the encoded data
            }
            else {
                iconE.setAttribute('src', icon.toString());
            }
        }
    }


*/

export const createMenu = () => {

    const titlebar = new Titlebar({
        backgroundColor: Color.fromHex('#FFFFFF'),
        unfocusEffect: true
    });
    
    titlebar.updateItemBGColor(Color.fromHex('#333333'));

    const menu = new remote.Menu();
 
    menu.append(new remote.MenuItem({
        label: localization.applicationMenuView,
        submenu: [
            {
                label: localization.applicationMenuViewLaunchWizard,
                click: () => console.log('wizard'),
                icon: encodeAsImage("tool")
            },
            {
                type: 'separator'
            },
            {
                label: localization.applicationMenuViewProjectInfo,
                click: () => console.log('project info'),
                icon: encodeAsImage("hexagon")
            },
            {
                label: localization.applicationMenuViewRepoInfo,
                click: () => console.log('repo info'),
                icon: encodeAsImage("box")
            },
            {
                label: localization.applicationMenuViewBranchInfo,
                click: () => console.log('branch info'),
                icon: encodeAsImage("git-branch")
            },
            {
                label: localization.applicationMenuViewCommitInfo,
                click: () => console.log('commit info'),
                icon: encodeAsImage("git-commit")
            },
            {
                type: 'separator'
            },
            {
                label: localization.applicationMenuViewCompareBranches,
                click: () => console.log('compare branches'),
                icon: encodeAsImage("info")
            },
            {
                label: localization.applicationMenuViewCompareCommits,
                click: () => console.log('compare commits'),
                icon: encodeAsImage("info")
            },
            {
                type: 'separator'
            },
            {
                label: localization.applicationMenuViewLastDiff,
                click: () => console.log('last diff'),
                icon: encodeAsImage("columns")
            },
            {
                label: localization.applicationMenuViewDiffFrom,
                click: () => console.log('diff from'),
                icon: encodeAsImage("columns")
            },
            {
                type: 'separator'
            },
            {
                label: localization.applicationMenuViewGraphView,
                click: () => console.log('view graph'),
                icon: encodeAsImage("eye")
            },
            {
                label: localization.applicationMenuViewDiffView,
                click: () => console.log('view diff'),
                icon: encodeAsImage("list")
            },
            {
                type: 'separator'
            },
            {
                label: localization.applicationMenuViewOpenFolder,
                click: () => console.log('Open'),
                icon: encodeAsImage("folder")
            },
        ]
    }));

    menu.append(new remote.MenuItem({
        label: localization.applicationMenuChanges,
        submenu: [
            {
                label: localization.applicationMenuChangesFiles,
                icon: encodeAsImage("folder"),
                submenu: [
                    {
                        label: localization.applicationMenuChangesFilesStageAll,
                        click: () => console.log('Stage all'),
                        icon: encodeAsImage("plus-circle")
                    },
                    {
                        label: localization.applicationMenuChangesFilesDiscardAll,
                        click: () => console.log('Discard all'),
                        icon: encodeAsImage("trash-2")
                    },
                    {
                        label: localization.applicationMenuChangesFilesStash,
                        click: () => console.log('Stash'),
                        icon: encodeAsImage("archive")
                    },
                ]
            },
            {
                label: localization.applicationMenuChangesCommit,
                icon: encodeAsImage("git-commit"),
                submenu: [
                    {
                        label: localization.applicationMenuChangesCommitCommitOnly,
                        click: () => console.log('commit'),
                        icon: encodeAsImage("check")
                    },
                    {
                        label: localization.applicationMenuChangesCommitCommitAndPush ,
                        click: () => console.log('commit and push'),
                        icon: encodeAsImage("check-circle")
                    },
                    {
                        label: localization.applicationMenuChangesCommitPushOnly,
                        click: () => console.log('Push'),
                        icon: encodeAsImage("upload-cloud")
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: localization.applicationMenuChangesCommitRevertLast,
                        click: () => console.log('revert'),
                        icon: encodeAsImage("rotate-ccw")
                    },
                    {
                        label: localization.applicationMenuChangesCommitRevertTo,
                        click: () => console.log('revert to'),
                        icon: encodeAsImage("git-commit")
                    },
                ]
            },
            {
                label: localization.applicationMenuChangesBranch,
                icon: encodeAsImage("git-branch"),
                submenu: [
                    {
                        label: localization.applicationMenuChangesBranchNewBranch,
                        click: () => console.log('commit'),
                        icon: encodeAsImage("plus")
                    },
                    {
                        label: localization.applicationMenuChangesBranchBranchFrom,
                        click: () => console.log('commit and push'),
                        icon: encodeAsImage("git-branch")
                    },
                    {
                        label: localization.applicationMenuChangesBranchChange,
                        click: () => console.log('change branch'),
                        icon: encodeAsImage("repeat")
                    },
                    {
                        label: localization.applicationMenuChangesBranchMerge,
                        click: () => console.log('merge into'),
                        icon: encodeAsImage("git-merge")
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: localization.applicationMenuChangesBranchRename,
                        click: () => console.log('rename branch'),
                        icon: encodeAsImage("edit-3")
                    },
                    {
                        label: localization.applicationMenuChangesBranchDelete,
                        click: () => console.log('delete branch'),
                        icon: encodeAsImage("alert-triangle")
                    },
                    {
                        label: localization.applicationMenuChangesBranchRebase,
                        click: () => console.log('rebase'),
                        icon: encodeAsImage("alert-octagon")
                    },
                ]
            },
        ]
    }));

    
    menu.append(new remote.MenuItem({
        label: localization.applicationMenuManage,
        submenu: [
            {
                label: localization.applicationMenuManageRepository,
                icon: encodeAsImage("box"),
                submenu: [
                    {
                        label: localization.applicationMenuManageRepositoryChange,
                        click: () => console.log('change repo'),
                        icon: encodeAsImage("repeat")
                    },
                    {
                        label: localization.applicationMenuManageRepositorySettings,
                        click: () => console.log('repo settings'),
                        icon: encodeAsImage("settings")
                    },
                    {
                        label: localization.applicationMenuManageRepositoryInfo,
                        click: () => console.log('view repo info'),
                        icon: encodeAsImage("info")
                    },
                ]
            },
            {
                label: localization.applicationMenuManageProject,
                icon: encodeAsImage("hexagon"),
                submenu: [
                    {
                        label: localization.applicationMenuManageProjectNew,
                        click: () => console.log('new project'),
                        icon: encodeAsImage("plus")
                    },
                    {
                        label: localization.applicationMenuManageProjectOpen,
                        click: () => console.log('open proiject'),
                        icon: encodeAsImage("folder")
                    },
                    {
                        label: localization.applicationMenuManageProjectChange,
                        click: () => console.log('change project'),
                        icon: encodeAsImage("repeat")
                    },
                    {
                        label: localization.applicationMenuManageProjectSettings,
                        click: () => console.log('project settings'),
                        icon: encodeAsImage("settings")
                    },
                ]
            },
        ]
    }));
    
    menu.append(new remote.MenuItem({
        label: localization.applicationMenuSettings,
        submenu: [
            {
                label: localization.applicationMenuSettingsAccounts,
                click: () => console.log('general settings'),
                icon: encodeAsImage("user")
            },
            {
                label: localization.applicationMenuSettingsGithub,
                click: () => console.log('github settings'),
                icon: encodeAsImage("github")
            },
            {
                label: localization.applicationMenuSettingsGitlab,
                click: () => console.log('gitlab settings'),
                icon: encodeAsImage("gitlab")
            },
            {
                label: localization.applicationMenuSettingsKeys,
                click: () => console.log('keys'),
                icon: encodeAsImage("key")
            },
            {
                type: 'separator'
            },
            {
                label: localization.applicationMenuSettingsProject,
                click: () => console.log('project settings'),
                icon: encodeAsImage("hexagon")
            },
            {
                label: localization.applicationMenuSettingsRepo,
                click: () => console.log('repo settings'),
                icon: encodeAsImage("box")
            },
            {
                label: localization.applicationMenuSettingsGeneral,
                click: () => console.log('general settings'),
                icon: encodeAsImage("settings")
            },
        ]
    }));
    
    titlebar.updateMenu(menu);
    titlebar.updateTitle("GitEase")
}