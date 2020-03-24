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

import { Titlebar, Color, RGBA } from 'custom-electron-titlebar'


import{ Menu, MenuItem, remote, NativeImage } from "electron"
import * as Icon from 'react-feather';

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

const menu = new remote.Menu();
menu.append(new remote.MenuItem({
    label: 'Item 1',
    submenu: [
        {
            label: 'Subitem 1',
            click: () => console.log('Click on subitem 1'),
            icon: encodeAsImage("alert-octagon")
        },
        {
            type: 'separator'
        }
    ]
}));
 
menu.append(new remote.MenuItem({
    label: 'Item 2',
    submenu: [
        {
            label: 'Subitem',
        },
        {
            type: 'separator'
        },
        {
            label: 'Subitem with submenu',
            submenu: [
                {
                    label: 'Submenu &item 1',
                    accelerator: 'Ctrl+T'
                }
            ]
        }
    ]
}));
 
titlebar.updateMenu(menu);