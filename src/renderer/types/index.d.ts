// ! ###  - Main Types File - ###

// ------------------
// --- Data Types ---
// ------------------

export type gitBasicWorkflowDataType = {
    message: string;
    descriptionWhat?: string[];
    descriptionWhy?: string[];
};

export type gitComposedBasicWorkflowDataType = {
    message: string;
    description: string;
    branch: string;
    remote: string;
    workingDir: string;
}

export type workingDirDataType = {
    workingDir: string;
};

export type RepoConfigDataType = {
    repo: string;
    workingDir: string;
};

export type GitCommitDescriptionType = {
    currentView: string;
    completionStatus: CompletionStatusType[];
    descriptionWhat: string[];
    descriptionWhy: string[];
    changedElements: string[];
}

export type CompletionStatusType = {
    isWhatCompleted: boolean,
    isWhyCompleted: boolean
}

// --------------------------------------
// --- Git Status Modified Files Type ---
// --------------------------------------

export interface ModifiedFilesStructure {
    _c?: string[];
    _s?: string[] | number;
    _d?: string[] | boolean;
    _h?: string[] | number;
    _n?: string[] | boolean;
    _v: ModifiedFilesDescriptor | null;
}

interface ModifiedFilesDescriptor {
    not_added?: string[];
    conflicted?: string[];
    created?: string[];
    deleted?: string[];
    modified?: string[];
    renamed?: ContentNameType[];
    files?: GitFilesDescriptor[];
    staged?: string[];
    ahead?: string[] | number;
    behind?: string[] | number;
    current?: string;
    tracking?: string;
}

interface GitFilesDescriptor {
    path: string;
    index: string;
    working_dir: string;
}

export type ContentNameType = {
    from: string;
    to: string;
};

// ----------------------------------
// --- Staging Area-related Types ---
// ----------------------------------

export type ChangesTreeType = {
    status: string;
    content: string | ContentNameType;
    displayContent: string;
    staged: boolean;
    index?: number;
};

export type StagingCheckboxIndexType = {
    index: number | undefined;
};

// -------------------
// --- Misc. Types ---
// -------------------

export type SpinnerType = {
    name: string;
    message?: string;
};

// --------------------------------------
// --- Git Status Modified Files Type ---
// --------------------------------------

export type GitCommitType = {
    commitMessage: string;
    commitDescriptionWhat?: string[];
    commitDescriptionWhy?: string[];
    changedElements?: string[];
    successStatus?: GitCommitStatusType;
};

type GitCommitStatusType = {
    _v: {
        error: string;
        success: string;
    };
};

// ---------------------------
// --- Git Log Object Type ---
// ---------------------------

export type GitLogObjectType = {
    author_name: string;
    date: string;
    hash: string;
    parentHash: string;
    message: string;
    branch: string;
};

// --------------------------------------
// --- Branch Color Information Types ---
// --------------------------------------

export type colorTripletType = {
    r: number;
    g: number;
    b: number;
};

export type branchDataType = {
    branchName: string;
    branchColor: colorTripletType;
};

// --------------------------------------
// --- JSON Commit Tree-related Types ---
// --------------------------------------

export type JSONTreeGeneratorPropType = {
    fullHistory: GitLogObjectType[];
    branchesList: string[];
    hashList: string[];
    treeOffset: number;
    metadataList: GitGraphNodeMetadataType[];
    workingDir?: string;
};

export type MergeCommitType = {
    hash: string;
    parentHashes: string[];
};

export type DivergenceCommitType = {
    hash: string;
    childrenHashes: string[];
};

export type GitGraphNodeMetadataType = {
    isInitial: boolean;
    isLast: boolean;
    isDivergence: boolean;
    isMerge: boolean;
    childrenOf: string[];
    parentOf: string[];
    branch: branchDataType
};

export type GitNodeType = {
    id: string,
    color: string,
    size: number,
    symbolType: string
}

export type ReactD3GraphNodeType = {
    color: string,
    highlighted: boolean,
    id: string,
    size: number,
    symbolType: string,
    x: number,
    y: number
}

export type GitLinkType = {
    source: string,
    target: string,
    color: string
}

export type mergeJSONPropsType = {
    destinationBranch: branchDataType;
    destinationHash: string;
    destinationCommitMessage: string;
};

export type divergenceJSONPropsType = {
    branch: branchDataType;
    hash: string;
    author: string;
    message: string;
};

export type commitJSONPropsType = {
    branch: branchDataType;
    hash: string;
    author: string;
    message: string;
};

export type divergenceJSONType = {
    attributes: {
        message: string;
        author: string;
        hash: string;
    };
    nodeSvgShape: {
        shape: string;
        shapeProps: {
            rx: number;
            width: number;
            height: number;
            x: number;
            y: number;
            fill: string;
        };
    };
    children: childrenJSONType[];
};

export type mergeJSONType = {
    name: string;
    attributes: {
        message: string;
        hash: string;
    };
    nodeSvgShape: {
        shape: string;
        shapeProps: {
            points: string;
            width: number;
            height: number;
            x: number;
            y: number;
            fill: string;
        };
    };
    children: childrenJSONType[];
};

export type childrenJSONType = commitJSONType | mergeJSONType | divergenceJSONType;

export type commitJSONType = {
    attributes: {
        message: string;
        author: string;
        hash: string;
    };
    nodeSvgShape: {
        shape: string;
        shapeProps: {
            r: string;
            width: number;
            height: number;
            x: number;
            y: number;
            fill: string;
        };
    };
    children: childrenJSONType[];
    name?: string;
};

// --------------------------
// --- Commit Label Types ---
// --------------------------

export type labelType = {
    label: string,
    labelColor: colorTripletType
}

export type ReactTagTagType = {
    id: number,
    name: string,
}

// --------------------
// --- Config Types ---
// --------------------

export type UIConfigType = {
    language: string,
    theme: string,
    mainView: string,
    showSidePanelsByDefault: boolean
    showAdditionalInformation: boolean
    selectedCommit: string
}

export type SSHConfigType = {
    currentKeysLocation: string,
    keysDefaultLocation: string,
    keysLocations: string[]
}

export type ReposConfigType = {
    reposDefaultLocation: string,
    reposLocations: string[],
    activeRepo: string,
}

export type GitConfigType = {
    excludedPaths: string[],
    submodules: boolean,
    submodulesPaths: string[],
    enforcePreCommitHooks: boolean,
    enforcePrePushHooks: boolean,
    enforcePostCommitHooks: boolean,
    enforcePostMergeHooks: boolean,
    enforceAllHooks: boolean,
    currentBranch: string,
    currentRemote: string,    
}

export type ProjectConfigType = {
    currentWorkflow: string,
    handholding: boolean,
    autoSaveChanges: boolean,
    autoSaveTimeoutMinutes: number
    opinionatedWorkflow: boolean,
    resolveSubmodulesAsIndependentRepos: boolean,
    integration: string,
    
}

type UserDataType = {
    userName: string,
    userEmail: string,
    userProfilePic: string,
    userFetchedFrom: string
}

export type UserDataConfigType = {
    currentUser: UserDataType,
    usersList: UserDataType[]
}