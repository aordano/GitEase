// ! ###  - Application menu bar - ###

// ---------------------
// --- React Imports ---
// ---------------------

import * as React from 'react';

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

const titlebar = new Titlebar({
    backgroundColor: Color.fromHex('#FFFFFF'),
    unfocusEffect: true
});

titlebar.updateItemBGColor(Color.fromHex('#333333'));

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


    
    
export const graphBackgroundContextMenuRedraw = "Redraw graph"

const menu = new remote.Menu();
 
menu.append(new remote.MenuItem({
    label: 'View',
    submenu: [
        {
            label: 'Launch wizard',
            click: () => console.log('wizard'),
            icon: encodeAsImage("tool")
        },
        {
            type: 'separator'
        },
        {
            label: 'Project information',
            click: () => console.log('project info'),
            icon: encodeAsImage("hexagon")
        },
        {
            label: 'Repository information',
            click: () => console.log('repo info'),
            icon: encodeAsImage("box")
        },
        {
            label: 'Branch information',
            click: () => console.log('branch info'),
            icon: encodeAsImage("git-branch")
        },
        {
            label: 'Commit information',
            click: () => console.log('commit info'),
            icon: encodeAsImage("git-commit")
        },
        {
            type: 'separator'
        },
        {
            label: 'Compare branches...',
            click: () => console.log('compare branches'),
            icon: encodeAsImage("info")
        },
        {
            label: 'Compare commits...',
            click: () => console.log('compare commits'),
            icon: encodeAsImage("info")
        },
        {
            type: 'separator'
        },
        {
            label: 'Last diff',
            click: () => console.log('last diff'),
            icon: encodeAsImage("columns")
        },
        {
            label: 'Diff from...',
            click: () => console.log('diff from'),
            icon: encodeAsImage("columns")
        },
        {
            type: 'separator'
        },
        {
            label: 'Graph view',
            click: () => console.log('view graph'),
            icon: encodeAsImage("eye")
        },
        {
            label: 'Diff view',
            click: () => console.log('view diff'),
            icon: encodeAsImage("list")
        },
        {
            type: 'separator'
        },
        {
            label: 'Open working folder in file explorer',
            click: () => console.log('Open'),
            icon: encodeAsImage("folder")
        },
    ]
}));
 
menu.append(new remote.MenuItem({
    label: 'Changes',
    submenu: [
        {
            label: 'Files',
            icon: encodeAsImage("folder"),
            submenu: [
                {
                    label: 'Stage all files',
                    click: () => console.log('Stage all'),
                    icon: encodeAsImage("plus-circle")
                },
                {
                    label: 'Discard all changes',
                    click: () => console.log('Discard all'),
                    icon: encodeAsImage("trash-2")
                },
                {
                    label: 'Stash changes',
                    click: () => console.log('Stash'),
                    icon: encodeAsImage("archive")
                },
            ]
        },
        {
            label: 'Commit',
            icon: encodeAsImage("layers"),
            submenu: [
                {
                    label: 'Commit only',
                    click: () => console.log('commit'),
                    icon: encodeAsImage("check")
                },
                {
                    label: 'Commit and push',
                    click: () => console.log('commit and push'),
                    icon: encodeAsImage("check-circle")
                },
                {
                    label: 'Push only',
                    click: () => console.log('Push'),
                    icon: encodeAsImage("upload-cloud")
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Revert last commit',
                    click: () => console.log('revert'),
                    icon: encodeAsImage("rotate-ccw")
                },
                {
                    label: 'Revert to commit...',
                    click: () => console.log('revert to'),
                    icon: encodeAsImage("git-commit")
                },
            ]
        },
        {
            label: 'Branch',
            icon: encodeAsImage("git-branch"),
            submenu: [
                {
                    label: 'New branch from last commit',
                    click: () => console.log('commit'),
                    icon: encodeAsImage("plus")
                },
                {
                    label: 'Branch from commit...',
                    click: () => console.log('commit and push'),
                    icon: encodeAsImage("git-branch")
                },
                {
                    label: 'Change active branch',
                    click: () => console.log('change branch'),
                    icon: encodeAsImage("repeat")
                },
                {
                    label: 'Merge current branch into...',
                    click: () => console.log('merge into'),
                    icon: encodeAsImage("git-merge")
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Rename current branch',
                    click: () => console.log('rename branch'),
                    icon: encodeAsImage("edit-3")
                },
                {
                    label: 'Delete branch',
                    click: () => console.log('delete branch'),
                    icon: encodeAsImage("alert-triangle")
                },
                {
                    label: 'Rebase',
                    click: () => console.log('rebase'),
                    icon: encodeAsImage("alert-octagon")
                },
            ]
        },
    ]
}));

export const defaultContextMenuLaunchWizard = "Launch wizard"
 
menu.append(new remote.MenuItem({
    label: 'Manage',
    submenu: [
        {
            label: 'Repository',
            icon: encodeAsImage("box"),
            submenu: [
                {
                    label: 'Change repository',
                    click: () => console.log('change repo'),
                    icon: encodeAsImage("repeat")
                },
                {
                    label: 'Repository settings',
                    click: () => console.log('repo settings'),
                    icon: encodeAsImage("settings")
                },
                {
                    label: 'View repository information',
                    click: () => console.log('view repo info'),
                    icon: encodeAsImage("info")
                },
            ]
        },
        {
            label: 'Project',
            icon: encodeAsImage("hexagon"),
            submenu: [
                {
                    label: 'New project',
                    click: () => console.log('new project'),
                    icon: encodeAsImage("plus")
                },
                {
                    label: 'Open project',
                    click: () => console.log('open proiject'),
                    icon: encodeAsImage("folder")
                },
                {
                    label: 'Change project',
                    click: () => console.log('change project'),
                    icon: encodeAsImage("repeat")
                },
                {
                    label: 'Project settings',
                    click: () => console.log('project settings'),
                    icon: encodeAsImage("settings")
                },
            ]
        },
    ]
}));
 
menu.append(new remote.MenuItem({
    label: 'Settings',
    submenu: [
        {
            label: 'Account settings',
            click: () => console.log('general settings'),
            icon: encodeAsImage("user")
        },
        {
            label: 'Github integration',
            click: () => console.log('github settings'),
            icon: encodeAsImage("github")
        },
        {
            label: 'Gitlab integration',
            click: () => console.log('gitlab settings'),
            icon: encodeAsImage("gitlab")
        },
        {
            label: 'Keys',
            click: () => console.log('keys'),
            icon: encodeAsImage("key")
        },
        {
            type: 'separator'
        },
        {
            label: 'Project settings',
            click: () => console.log('project settings'),
            icon: encodeAsImage("hexagon")
        },
        {
            label: 'Repository settings',
            click: () => console.log('repo settings'),
            icon: encodeAsImage("box")
        },
        {
            label: 'General settings',
            click: () => console.log('general settings'),
            icon: encodeAsImage("settings")
        },
    ]
}));
 
titlebar.updateMenu(menu);
titlebar.updateTitle("GitEase")