// ! ###  - Main Types File - ###

// ---------------------------
// --- React-Redux Imports ---
// ---------------------------

import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

// ---------------------------
// --- Store State Imports ---
// ---------------------------

import { RootState } from '../store';

// ------------------
// --- Data Types ---
// ------------------

export type gitBasicWorkflowDataType = {
    message: string;
    description?: string
    branch?: string;
    remote?: string;
    workingDir?: string;
};

export type workingDirDataType = {
    workingDir: string
}

export type RepoConfigDataType = {
    repo: string,
    workingDir: string,
}

// --------------------------------------
// --- Git Status Modified Files Type ---
// --------------------------------------

export interface ModifiedFilesStructure {
    _c?: string[],
    _s?: string[] | number
    _d?: string[] | boolean
    _h?: string[] | number
    _n?: string[] | boolean
    _v: ModifiedFilesDescriptor
}

interface ModifiedFilesDescriptor {
    not_added?: string[],
    conflicted?: string[],
    created?: string[],
    deleted?: string[],
    modified?: string[],
    renamed?: ContentNameType[],
    files?: GitFilesDescriptor[],
    staged?: string[],
    ahead?: string[] | number,
    behind?: string[] | number,
    current?: string,
    tracking?: string
}

interface GitFilesDescriptor {
    path: string,
    index: string,
    working_dir: string
}

export type ContentNameType = {
    from: string,
    to: string
}

// ----------------------------------
// --- Staging Area-related Types ---
// ----------------------------------

export type ChangesTreeType = {
    status: string,
    content: string | ContentNameType,
    displayContent: string,
    staged: boolean,
    index?: number
}

export type StagingCheckboxIndexType = {
    index: number | undefined
}

// -------------------
// --- Misc. Types ---
// -------------------

export type SpinnerType = {
    name: string
}

// --------------------------------------
// --- Git Status Modified Files Type ---
// --------------------------------------

export type GitCommitType = {
    commitMessage: string,
    commitDescription?: string,
    branch?: string,
    remote?: string,
    successStatus?: GitCommitStatusType,
    workingDir?: string
}

type GitCommitStatusType = {
    _v: {
        error: string,
        success: string
    }
}

// ---------------------------
// --- Git Log Object Type ---
// ---------------------------

export type GitLogObjectType = {
    author_email: string,
    author_name: string,
    date: string,
    hash: string,
    message: string,
    branch: string
}

// -------------------------------------------
// --- Typed Redefinition of useSelector() ---
// -------------------------------------------

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
