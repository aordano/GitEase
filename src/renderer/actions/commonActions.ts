import { ActionCreator } from 'redux';

import {
    VIEW_MODIFIED_FILES,
    ViewModifiedFilesType
} from '../types/constants';

export type ViewModifiedFilesAction = ViewModifiedFilesType

export const ViewModifiedFilesAction: ActionCreator<ViewModifiedFilesType> = () => {
    return {
        type: VIEW_MODIFIED_FILES
    };
};