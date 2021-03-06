// ! ###  - Common Action Creators - ###

// ---------------------
// --- Redux Imports ---
// ---------------------

import { ActionCreator} from 'redux';

// --------------------
// --- Type Imports ---
// --------------------

import {
    VIEW_MODIFIED_FILES,
    UPDATE_CHANGES_AREA,
    SET_STAGING_STATUS,
    SET_GLOBAL_STAGING_STATUS,
    COMMIT_SUCCESS_ALERT,
    COMMIT_ERROR_ALERT,
    UPDATE_COMMIT_SUCCESS_STATUS,
    UPDATE_VIEW_TREE,
    SET_CONTEXT_MENU_ID,
    STORE_COMMIT_LABEL,
    SET_REACT_TAG_DATA,
    UPDATE_COMMIT_DESCRIPTION_VIEW,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY,
    UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS,
    ViewModifiedFilesType,
    UpdateChangesAreaType,
    SetStagingStatusType,
    SetGlobalStagingStatusType,
    CommitSuccessAlertType,
    CommitErrorAlertType,
    UpdateCommitSuccessStatusType,
    UpdateViewTreeType,
    SetContextMenuIdType,
    StoreCommitLabelType,
    SetReactTagDataType,
    UpdateCommitDescriptionViewType,
    UpdateCommitDescriptionElementNameType,
    UpdateCommitDescriptionElementWhatType,
    UpdateCommitDescriptionElementWhyType,
    UpdateCommitDescriptionElementCompletionStatusType
} from '../types/constants';

import { ReactTagTagType, CompletionStatusType } from "../types"

// ---------------------------------------
// --- Viable Action Types Definitions ---
// ---------------------------------------

export type UpdateChangesAreaAction = 
    UpdateChangesAreaType | 
    SetStagingStatusType | 
    SetGlobalStagingStatusType

export type ViewModifiedFilesAction = ViewModifiedFilesType

export type CommitSuccessAlertAction = CommitSuccessAlertType

export type CommitErrorAlertAction = CommitErrorAlertType

export type UpdateViewTreeAction = UpdateViewTreeType

export type SetContextMenuIdAction = SetContextMenuIdType

export type ReactTagDataAction = StoreCommitLabelType | SetReactTagDataType

export type UpdateCommitDescriptionAction =
      UpdateCommitDescriptionViewType
    | UpdateCommitDescriptionElementNameType
    | UpdateCommitDescriptionElementWhatType
    | UpdateCommitDescriptionElementWhyType
    | UpdateCommitDescriptionElementCompletionStatusType

// ------------------------------
// --- Update Action Creators ---
// ------------------------------

export const UpdateChangesAreaAction: ActionCreator<UpdateChangesAreaType> = (filesTree) => {
    if (filesTree._v) {
        return {
            type: UPDATE_CHANGES_AREA,
            filesTree: {
                _c: filesTree._c,
                _s: filesTree._s,
                _d: filesTree._d,
                _h: filesTree._h,
                _n: filesTree._n,
                _v: {
                    not_added: filesTree._v.not_added,
                    conflicted: filesTree._v.conflicted,
                    created: filesTree._v.created,
                    deleted: filesTree._v.deleted,
                    modified: filesTree._v.modified,
                    renamed: filesTree._v.renamed,
                    files: filesTree._v.files,
                    staged: filesTree._v.staged,
                    ahead:  filesTree._v.ahead,
                    behind:  filesTree._v.behind,
                    current:  filesTree._v.current,
                    tracking:  filesTree._v.tracking
                }
            }
        }        
    }

    return {
        type: UPDATE_CHANGES_AREA,
        filesTree: {
            _c: filesTree._c,
            _s: filesTree._s,
            _d: filesTree._d,
            _h: filesTree._h,
            _n: filesTree._n,
            _v: null
        }
    }
    
}

export const ViewModifiedFilesAction: ActionCreator<ViewModifiedFilesType> = () => {
    return {
        type: VIEW_MODIFIED_FILES
    };
};

// -------------------------------
// --- Staging Action Creators ---
// -------------------------------

export const SetStagingStatusAction: ActionCreator<SetStagingStatusType> = (index) => {
    return {
        index,
        type: SET_STAGING_STATUS
    };
};

export const SetGlobalStagingStatusAction: ActionCreator<SetGlobalStagingStatusType> = () => {
    return {
        type: SET_GLOBAL_STAGING_STATUS
    }
}

// ------------------------------
// --- Alerts Action Creators ---
// ------------------------------

export const CommitSuccessAlertAction: ActionCreator<CommitSuccessAlertType> = () => {
    return {
        type: COMMIT_SUCCESS_ALERT
    }
}

export const CommitErrorAlertAction: ActionCreator<CommitErrorAlertType> = (error) => {
    return {
        error,
        type: COMMIT_ERROR_ALERT
    }
}

export const UpdateCommitSuccessStatusAction: ActionCreator<UpdateCommitSuccessStatusType> = (error?) => {
    return {
        error,
        type: UPDATE_COMMIT_SUCCESS_STATUS
    }
}

// --------------------------
// --- View Tree Creators ---
// --------------------------

export const UpdateViewTreeAction: ActionCreator<UpdateViewTreeType> = () => {
    return {
        type: UPDATE_VIEW_TREE
    }
}

// -----------------------------
// --- Context Menu Creators ---
// -----------------------------

export const SetContextMenuIdAction: ActionCreator<SetContextMenuIdType> = (newId: string) => {
    return {
        newId,
        type: SET_CONTEXT_MENU_ID,

    };
};

// ---------------------
// --- Misc Creators ---
// ---------------------

export const StoreCommitLabelAction: ActionCreator<StoreCommitLabelType> = (label: string) => {
    return {
        label,
        type: STORE_COMMIT_LABEL
    }
}

export const SetReactTagDataAction: ActionCreator<SetReactTagDataType> = (
    tags: {
        tagData: ReactTagTagType[],
        suggestions: ReactTagTagType[]
    }
) => {
    return {
        tags,
        type:  SET_REACT_TAG_DATA
    }
}

// -----------------------------------
// --- Commit Description Creators ---
// -----------------------------------

export const UpdateCommitDescriptionViewAction: ActionCreator<UpdateCommitDescriptionViewType> = (view: string) => {
    return {
        view,
        type: UPDATE_COMMIT_DESCRIPTION_VIEW,

    };
};

export const UpdateCommitDescriptionElementNameAction:
    ActionCreator<UpdateCommitDescriptionElementNameType> = (index: number, name: string) => {
        return {
            index,
            name,
            type: UPDATE_COMMIT_DESCRIPTION_ELEMENT_NAME,

        };
    };

export const UpdateCommitDescriptionElementWhatAction:
    ActionCreator<UpdateCommitDescriptionElementWhatType> = (index: number, what: string) => {
        return {
            index,
            what,
            type: UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHAT,

        };
    };

export const UpdateCommitDescriptionElementWhyAction:
    ActionCreator<UpdateCommitDescriptionElementWhyType> = (index: number, why: string) => {
        return {
            index,
            why,
            type: UPDATE_COMMIT_DESCRIPTION_ELEMENT_WHY,

        };
    };

export const UpdateCommitDescriptionElementCompletionStatusAction:
    ActionCreator<UpdateCommitDescriptionElementCompletionStatusType> = (
        index: number, completionStatus: CompletionStatusType
    ) => {
        return {
            index,
            completionStatus,
            type: UPDATE_COMMIT_DESCRIPTION_ELEMENT_COMPLETION_STATUS,

        };
    };