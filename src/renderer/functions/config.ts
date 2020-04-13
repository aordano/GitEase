// ! ###  - SSH related functions - ###

// --------------------
// --- Electron Imports ---
// --------------------

import { remote } from "electron"

import * as FileSystem from "fs"

import * as Path from "path"

import * as Child from "child_process"
import { ConfigInformationState } from "../reducers/configReducers.redux.reducer"

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
        await FileSystem.promises.access(Path.join(homePath, ".gitease", "config.json"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

export const checkIfConfigExistSync = () => {

    try {
        FileSystem.accessSync(Path.join(homePath, ".gitease", "config.json"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

export const checkIfConfigDirExist = async () => {

    try {
        await FileSystem.promises.access(Path.join(homePath, ".gitease"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

export const writeConfigToFile = async (config: ConfigInformationState) => { 

    try {
        if (await checkIfConfigDirExist()) {
            await FileSystem.promises.writeFile(
                Path.join(homePath, ".gitease", "config.json"), JSON.stringify(config), 'utf8'
            )
        } else {
            await FileSystem.promises.mkdir(Path.join(homePath, ".gitease"))
            await FileSystem.promises.writeFile(
                Path.join(homePath, ".gitease", "config.json"), JSON.stringify(config), 'utf8'
            )
        }
    }
    
    catch (error) {
        return false
    }

    return true
}

export const readConfig = async () => { 

    try {
        if (await checkIfConfigDirExist()) {
            return await FileSystem.promises.readFile(
                Path.join(homePath, ".gitease", "config.json"), 'utf8'
            )
        }
    }
    
    catch (error) {
        return false
    }
}

export const readConfigSync = () => { 

    try {
        if (checkIfConfigExistSync()) {
            return FileSystem.readFileSync(
                Path.join(homePath, ".gitease", "config.json"), 'utf8'
            )
        }
    }
    
    catch (error) {
        return false
    }
}

export const deleteConfigWithBackup = () => {
    try {
        if (checkIfConfigExistSync()) {
            FileSystem.renameSync(Path.join(homePath, ".gitease", "config.json"),Path.join(homePath, ".gitease", "config.old.json"))
        }
        return true
    }

    catch (error) {
        return false
    }
}

// TODO Check config files integrity