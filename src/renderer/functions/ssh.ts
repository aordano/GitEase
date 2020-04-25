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

// import {
    
// } from '../types';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../data.mock")

const localization = require(`../lang/${mockData.lang}`);

// --------------------------------------
// --- SSH Keys presence verification ---
// --------------------------------------

// Code adapted from node ssh-keygen
// Found at https://github.com/ericvicenti/ssh-keygen

export const SSHKeygenPath = () => {

    if(process.platform !== 'win32') return 'ssh-keygen';

    switch(process.arch) {
        case 'ia32': return path.join(remote.app.getAppPath(), "..", 'bin', "32", 'usr', "bin", "ssh-keygen.exe");
        case 'x64': return path.join(remote.app.getAppPath(), "..", 'bin', "64", 'usr', "bin", "ssh-keygen.exe");
    }

    throw new Error('Unsupported platform');
}

const homePath = remote.app.getPath("home")

export const checkIfKeysExist = async () => {

    try {
        await fs.promises.access(path.join(homePath, ".ssh", "id_rsa.pub"))
        await fs.promises.access(path.join(homePath, ".ssh", "id_rsa"))
    }

    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false
        } 
    }

    return true
}

export const keygen = (comment: string) => { 
    Child.execSync(`${SSHKeygenPath()} -t rsa -b 4096 -C ${comment} -f ${path.join(homePath, ".ssh", "id_rsa")} -N ""`)
}

export const checkKeysIntegrity = async () => {

    const parseSHA = (dataString: string) => {
        const slicedData = dataString.slice(dataString.indexOf(" ") + 1, dataString.length)
        const SHA256 = slicedData.slice(slicedData.indexOf(":") + 1, slicedData.indexOf(" "))

        if (SHA256.length === 43) {
            return true
        }

        return false
    }

    if (await checkIfKeysExist()) {
    
        const keycheck = Child.execSync(`${SSHKeygenPath()} -l -f ${path.join(homePath, ".ssh", "id_rsa.pub")}`)

        return parseSHA(keycheck.toString())
    }
    
    return false
}   