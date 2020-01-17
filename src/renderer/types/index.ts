import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

// Imports the RootState type as defined in the Store
import { RootState } from '../store';

export type gitBasicWorkflowDataType = {
    message: string;
    files: string[];
    branch?: string;
    remote?: string;
};

export type workingDirDataType = {
    workingDir: string
}

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
    renamed?: string[],
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

export type ChangesTreeType = {
    status: string,
    content: string,
    displayContent: string,
    staged: boolean,
    index?: number
}

export type StagingCheckboxIndexType = {
    index: number | undefined
}

export type FileType = {
    file: string
}

// Exports typed redefinition of useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
