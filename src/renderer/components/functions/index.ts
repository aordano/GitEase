// ! ###  - Common Functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// -----------------------------
// --- Git-related Functions ---
// -----------------------------

export const parseStatus = (workingDir?: string) => {
    const git = promise(workingDir);
    const parsedData = git.status()
    return parsedData
}

export const stageFile = (file: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.add(file)
}

export const unstageFile = (file: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.reset(["--",file])
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