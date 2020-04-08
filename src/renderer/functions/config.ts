// ! ###  - SSH related functions - ###

// --------------------
// --- Electron Imports ---
// --------------------

import { remote } from "electron"

import fs from "fs"

import path from "path"

import * as Child from "child_process"

// --------------------
// --- Type Imports ---
// --------------------

//import {
    
//} from '../types';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../data.mock")

const localization = require(`../lang/${mockData.lang}`);

// --------------------------------------
// --- Config presence verification ---
// --------------------------------------

const homePath = remote.app.getPath("home")

export const checkIfConfigExist = async () => {

    try {
        await fs.promises.access(path.join(homePath, ".gitease", "preferences.json"))
        await fs.promises.access(path.join(homePath, ".gitease", "config.json"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

export const configGenerator = (comment: string) => { 
    // TODO Generate config reading from state
}

// TODO Check config files integrity