// ! ###  - Common Functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    ContentNameType,
    GitLogObjectType
} from '../types';
import { ListLogLine } from 'simple-git/typings/response';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../lang/${lang}`)

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

export const pull = (remote?: string, branch?: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.pull(remote ?? 'origin', branch ?? "master")
}

export const commit = (message: string, description?: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.commit([
        message, 
        description ?? ""
    ])
}

export const push = (remote?: string, branch?: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.push(remote ?? "origin", branch ?? 'master')
}

// ------------------------------------
// --- Git-Viewer Related Functions ---
// ------------------------------------

export const parseLogTree = async (workingDir?: string) => {
    const git = promise(workingDir);
    const logList = (await Promise.resolve(git.log())).all

    const branchesList: string[] = []
    const fullHistory: GitLogObjectType[] = []

    for (let i = 0; i < logList.length ; i += 1) {
        const nameRev = String( await Promise.resolve(git.raw(["name-rev",logList[i].hash])))
        let branchName

        if (nameRev.indexOf("~") !== -1) {
            branchName = nameRev.slice(nameRev.indexOf(" ")+1, nameRev.indexOf("~"))
        } 
        else {
            branchName = nameRev.slice(nameRev.indexOf(" ")+1, nameRev.length-1)
        }        

        fullHistory.push({
            author_email: logList[i].author_email,
            author_name: logList[i].author_name,
            date: logList[i].date,
            hash: logList[i].hash,
            message: logList[i].message,
            branch: branchName
        })

        if (branchesList.indexOf(branchName) !== -1) {
            continue
        }

        else {
            branchesList.push(branchName)
        }
    }
    
    return {
        fullHistory,
        branchesList
    }

}

// ----------------------------------
// --- Alert Generating Functions ---
// ----------------------------------

export const displayCommitInProcessAlert = () => {
    const commitBox = document.querySelector(".commit-box") as HTMLDivElement
    const commitOverlay = document.querySelector(".commit-overlay") as HTMLDivElement
    const commitSpinner = document.querySelector(".spinner-commit-box") as HTMLDivElement
    commitBox.style.zIndex = "-1"
    commitOverlay.style.zIndex = "1"
    commitSpinner.style.zIndex = "9"
    commitSpinner.style.display = "block"
}

export const displayCommitSuccessAlert = () => {
    const commitBox = document.querySelector(".commit-box") as HTMLDivElement
    const commitOverlay = document.querySelector(".commit-overlay") as HTMLDivElement
    const commitSpinner = document.querySelector(".spinner-commit-box") as HTMLDivElement
    const successText = document.querySelector(".commit-box p") as HTMLParagraphElement
    commitBox.style.zIndex = "9"
    commitOverlay.style.zIndex = "-1"
    commitSpinner.style.zIndex = "-1"
    commitSpinner.style.display = "none"
    successText.textContent = localization.commitSuccessMessage
    successText.style.fontWeight = "500"
    setTimeout(() => {
        successText.textContent = localization.commitBoxTitle
        successText.style.fontWeight = "100"
    }, 3000)

}

export const displayCommitErrorAlert = (error: string) => {
    const commitBox = document.querySelector(".commit-box") as HTMLDivElement
    const commitOverlay = document.querySelector(".commit-overlay") as HTMLDivElement
    const commitSpinner = document.querySelector(".spinner-commit-box") as HTMLDivElement
    const failureText = document.querySelector(".commit-box p") as HTMLParagraphElement
    commitBox.style.zIndex = "9"
    commitOverlay.style.zIndex = "-1"
    commitSpinner.style.zIndex = "-1"
    commitSpinner.style.display = "none"
    failureText.textContent = localization.commitFailureMessage
    failureText.style.fontWeight = "500"
    setTimeout(() => {
        failureText.textContent = localization.commitBoxTitle
        failureText.style.fontWeight = "100"
    }, 3000)
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