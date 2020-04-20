// ! ###  - Common Functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

// tslint:disable-next-line: import-name
import gitP, {SimpleGit} from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { ContentNameType } from '../types';

import * as path from "path"

import {remote} from "electron"

import * as SSH from "./ssh"

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const mockData = require("../data.mock")

const localization = require(`../lang/${mockData.lang}`);

// -----------------------------
// --- Git-related Functions ---
// -----------------------------

export const gitPath = () => {

    if(process.platform !== 'win32') return 'git';

    switch(process.arch) {
        case 'ia32': return path.join(remote.app.getAppPath(), "..", 'bin', "32", "bin", "git.exe");
        case 'x64': return path.join(remote.app.getAppPath(), "..", 'bin', "64", "bin", "git.exe");
    }

    throw new Error('Unsupported platform');
}

export const parseStatus = (workingDir?: string) => {
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())
    const parsedData = git.status();
    return parsedData;
};

export const stageFile = (file: string | ContentNameType, workingDir?: string) => {
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())
    if (typeof file === 'string') {
        git.add(file);
    } else if (typeof file === 'object') {
        git.add(file.from);
        git.add(file.to);
    }
};

export const unstageFile = (file: string | ContentNameType, workingDir?: string) => {
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())
    if (typeof file === 'string') {
        git.reset(['--', file]);
    } else if (typeof file === 'object') {
        git.raw(['restore', '--staged', file.to]);
        git.raw(['restore', '--staged', file.from]);
    }
};

export const pull = (remote?: string, branch?: string, workingDir?: string) => {
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())
    git.pull(remote ?? 'origin', branch ?? 'master');
};

export const commit = (message: string, description?: string, workingDir?: string) => {
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())
    git.commit([message, description ?? '']);
};

export const push = (remote?: string, branch?: string, workingDir?: string) => {
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())
    git.push(remote ?? 'origin', branch ?? 'master');
};

export const writeIdentityName = (name: string) => {
    const git: SimpleGit = gitP()
    git.raw(["config", "--global", "user.name",`"${name}"`])
}

export const writeIdentityEmail = (email: string) => {
    const git: SimpleGit = gitP()
    git.raw(["config", "--global", "user.email",`"${email}"`])
}

// ----------------------------------
// --- Alert Generating Functions ---
// ----------------------------------

export const displayCommitInProcessAlert = () => {
    const commitBox = document.querySelector('.commit-box') as HTMLDivElement;
    const commitOverlay = document.querySelector('.commit-overlay') as HTMLDivElement;
    const commitSpinner = document.querySelector('.spinner-commit-box') as HTMLDivElement;
    commitBox.style.zIndex = '-1';
    commitOverlay.style.zIndex = '1';
    commitSpinner.style.zIndex = '9';
    commitSpinner.style.display = 'block';
};

export const displayCommitSuccessAlert = () => {
    const commitBox = document.querySelector('.commit-box') as HTMLDivElement;
    const commitOverlay = document.querySelector('.commit-overlay') as HTMLDivElement;
    const commitSpinner = document.querySelector('.spinner-commit-box') as HTMLDivElement;
    const successText = document.querySelector('.commit-box p') as HTMLParagraphElement;
    commitBox.style.zIndex = '9';
    commitOverlay.style.zIndex = '-1';
    commitSpinner.style.zIndex = '-1';
    commitSpinner.style.display = 'none';
    successText.textContent = localization.commitSuccessMessage;
    successText.style.fontWeight = '500';
    setTimeout(() => {
        successText.textContent = localization.commitBoxTitle;
        successText.style.fontWeight = '100';
    }, 3000);
};

export const displayCommitErrorAlert = (error: string) => {
    const commitBox = document.querySelector('.commit-box') as HTMLDivElement;
    const commitOverlay = document.querySelector('.commit-overlay') as HTMLDivElement;
    const commitSpinner = document.querySelector('.spinner-commit-box') as HTMLDivElement;
    const failureText = document.querySelector('.commit-box p') as HTMLParagraphElement;
    commitBox.style.zIndex = '9';
    commitOverlay.style.zIndex = '-1';
    commitSpinner.style.zIndex = '-1';
    commitSpinner.style.display = 'none';
    failureText.textContent = localization.commitFailureMessage;
    failureText.style.fontWeight = '500';
    setTimeout(() => {
        failureText.textContent = localization.commitBoxTitle;
        failureText.style.fontWeight = '100';
    }, 3000);
};

// -----------------------
// --- Misc. Functions ---
// -----------------------

export const truncate = (path: string, num: number) => {
    // We truncate the filepath in a special way to display it properly in the staging area.
    if (path.length <= num) {
        return path;
    }
    const topFolders = path.slice(
        0,
        path.slice(path.indexOf('/'), path.lastIndexOf('/')).lastIndexOf('/') - 1
    );
    const fileName = path.slice(path.lastIndexOf('/'), path.length);
    return `${topFolders} ... ${fileName}`;
};

export const removeQuotes = (string: string) => {
    if (typeof string !== 'string') {
        return string;
    }

    let workingString = string;

    // Remove preceding and trailing quotes
    if (string.charAt(0) === `'`) {
        workingString = workingString.slice(1, workingString.length);
    }

    if (string.charAt(string.length - 1) === `'`) {
        workingString = workingString.slice(0, workingString.length - 1);
    }

    if (workingString.indexOf(`"`) !== -1) {
        while (workingString.indexOf(`"`) !== -1) {
            workingString = workingString.replace(`"`, ``);
        }

        return workingString;
    }

    return workingString;
};

export const getAllIndexes = (array: string[], value: string) => {
    const indexes = [];
    for (let i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
            indexes.push(i);
        }
    }
    return indexes;
};

export const parseLabel = (message: string) => {
    const label = new RegExp(/^(\b\S*:)/)
    const messageArray = message.split(label)
    if (messageArray.length !== 1) {
        messageArray.shift()
        return messageArray
    }
    return null
}

