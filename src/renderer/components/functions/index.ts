// ! ###  - Common Functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { ContentNameType } from '../../types';
import { Gitgraph } from '@gitgraph/react';

// -----------------------------
// --- Git-related Functions ---
// -----------------------------

export const parseStatus = (workingDir?: string) => {
    const git = promise(workingDir);
    const parsedData = git.status()
    return parsedData
}

export const stageFile = (file: string | ContentNameType, workingDir?: string) => {
    const git = promise(workingDir);
    if (typeof file === "string") {
        git.add(file)  
    }
    else if (typeof file === "object") {
        git.add(file.from)
        git.add(file.to)
    }
}

export const unstageFile = (file: string | ContentNameType, workingDir?: string) => {
    const git = promise(workingDir);
    if (typeof file === "string") {
        git.reset(["--",file])
    }
    else if (typeof file === "object") {
        git.raw([
            "restore",
            "--staged",
            file.to
        ])
        git.raw([
            "restore",
            "--staged",
            file.from
        ])
    }
}

export const stageAll = (workingDir?: string) => {
    const git = promise(workingDir);
    git.raw([
        "add",
        "-A"
    ])
}

export const unstageAll = (workingDir?: string) => {
    const git = promise(workingDir);
    git.reset("soft")
}
// -----------------------
// --- Misc. Functions ---
// -----------------------

export const truncate = (path: string, num: number) => {
    // We truncate the filepath in a special way to display it properly in the staging area.
    if (path.length <= num) {
        return path
    }
    const topFolders = path.slice(
        0,
        path.slice(path.indexOf("/"),
        path.lastIndexOf("/")).lastIndexOf("/") - 1
    )
    const fileName = path.slice(path.lastIndexOf("/"),path.length)
    return  `${topFolders} ... ${fileName}`
}

export const removeQuotes = (string: string) => {
    if (typeof string !== "string") {
        return ""      
    }
    if (string.endsWith('"') || string.endsWith("'")) {
        const quotelessString = string.slice(1,string.length - 1)
        return quotelessString
    }
    return string
}