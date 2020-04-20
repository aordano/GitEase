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

// --------------------------------------------
// --- GitEase Config presence verification ---
// --------------------------------------------

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


// ---------------------------------
// --- GitEase Config generation ---
// ---------------------------------

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

// -------------------------------
// --- GitEase Config handling ---
// -------------------------------

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

// ----------------------------------------
// --- Git Config presence verification ---
// ----------------------------------------

export const checkIfGitConfigExist = async () => {

    try {
        await FileSystem.promises.access(Path.join(homePath, ".gitconfig"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

export const checkIfGitConfigExistSync = () => {

    try {
        FileSystem.accessSync(Path.join(homePath, ".gitconfig"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

// ------------------------------------
// --- Git Config identity handling ---
// ------------------------------------

export const readGitIdentity = async () => { 

    try {
        if (await checkIfGitConfigExist()) {
            const contents =  await FileSystem.promises.readFile(
                Path.join(homePath, ".gitconfig"), 'utf8'
            )
            const nameIndex = contents.indexOf("name = ") + 7 // Length of the "name = " string 
            const emailIndex = contents.indexOf("email = ") + 8 // Likewise
            const name = contents.slice(nameIndex, emailIndex - 1)
            const isThereSomethingBeyondEmail = () => {
                if (contents.indexOf(" ", emailIndex) !== -1) {
                    return true
                }
                return false
            }
            let email 
            if (isThereSomethingBeyondEmail()) {
                email = contents.slice(emailIndex, contents.indexOf(" ", emailIndex) - 1)
            } else {
                email = contents.slice(emailIndex, contents.length)
            }

            return {
                name,
                email
            }
            
        }
        return false
    }
    
    catch (error) {
        return false
    }
}

export const readGitIdentitySync = () => { 

    try {
        if (checkIfGitConfigExistSync()) {
            const contents = FileSystem.readFileSync(
                Path.join(homePath, ".gitconfig"), 'utf8'
            )
            const nameIndex = contents.indexOf("name = ") + 7 // Length of the "name = " string 
            const emailIndex = contents.indexOf("email = ") + 8 // Likewise
            const name = contents.slice(nameIndex, emailIndex - 1)
            const isThereSomethingBeyondEmail = () => {
                if (contents.indexOf(" ", emailIndex) !== -1) {
                    return true
                }
                return false
            }
            let email 
            if (isThereSomethingBeyondEmail()) {
                email = contents.slice(emailIndex, contents.indexOf(" ", emailIndex) - 1)
            } else {
                email = contents.slice(emailIndex, contents.length)
            }

            return {
                name,
                email
            }
        }
        return false
        
    }
    
    catch (error) {
        return false
    }
}