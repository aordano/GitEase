import { ActionCreator } from 'redux';

import {
    VIEW_MODIFIED_FILES,
    UPDATE_CHANGES_AREA,
    ViewModifiedFilesType,
    UpdateChangesAreaType
} from '../types/constants';

export type UpdateChangesAreaAction = UpdateChangesAreaType

export const UpdateChangesAreaAction: ActionCreator<UpdateChangesAreaType> = (filesTree) => {
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

export type ViewModifiedFilesAction = ViewModifiedFilesType

export const ViewModifiedFilesAction: ActionCreator<ViewModifiedFilesType> = () => {
    return {
        type: VIEW_MODIFIED_FILES
    };
};