import * as React from 'react';
// tslint:disable-next-line: no-duplicate-imports
import { useState } from 'react';

import { store } from '../store';

import { 
    useSelector,
    ChangesTreeType
} from '../types';

import {
    basicWorkflowStageAndCommitAction,
    basicWorkflowUpdateCommitMessageAction
} from '../actions/basicWorkflowActions';
import { ViewModifiedFilesAction } from '../actions/commonActions';

require('../static/scss/actions.scss');

// temporary statements for testing
const files: string[] = ['testfile'];
const branch: string = 'testing';
const USER = 'aordano';
const PASS = '';
const REPO = 'github.com/aordano/GitEase';
const remote = `https://${USER}:${PASS}@${REPO}`;
// ----------------------------

const CommitMessageInput: React.FC = () => {
    const [input, setInput] = useState('');

    const handleCommitTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
        store.dispatch(
            basicWorkflowUpdateCommitMessageAction(
                event.currentTarget.value
            )
        );
    };

    return <input className={'commit-message'} value={input} onChange={handleCommitTextChange} />;
};

const CommitButton: React.FC = () => {
    const currentState = useSelector(state => state.basicWorkflowReducer);
    const handleCommitButtonPress = (event: React.MouseEvent<HTMLInputElement>) => {
        store.dispatch(
            basicWorkflowStageAndCommitAction(
                currentState.commitMessage, 
                files, 
                branch, 
                remote
            )
        );
    };

    return <input type={'button'} className={'commit-button'} onClick={handleCommitButtonPress} />;
};

const CommitBox: React.FC = () => {
    return (
        <div className={'commit-box'}>
            <h2>Commit Box</h2>
            <CommitMessageInput />
            <CommitButton />
            <textarea placeholder={'Description'} className={'commit-description'} />
        </div>
    );
};

const ChangesSpace: React.FC = () => {
    const changesAreaTree = useSelector(state => state.updateChangesAreaReducer.changesAreaTree)
    const elements = []
    for (let i = 0; i < changesAreaTree.length ; i += 1) {
        elements.push(
            React.createElement(ChangesListElement,{
                status: changesAreaTree[i].status,
                content: changesAreaTree[i].content,
                key: i
            })
        )
    }
    const changesList =  React.createElement('ul', {}, elements)
    return (
        <div className={'changes-area'}>
            <h2>Changes</h2>
            <h2>Area</h2>
            {changesList}
        </div>
    );
};

export const CommitComponent: React.FC = () => {
    return (
        <div>
            <ChangesSpace />
            <CommitBox />
        </div>
    );
};

const ActionsSpace: React.FC = () => {
    const handlePlaceholderViewModifiedFilesButtonPress = (event: React.MouseEvent<HTMLInputElement>) => {
        store.dispatch(
            ViewModifiedFilesAction()
        );
    };
    return (
        <div className={'actions-space'}>
            <h2>Actions space</h2>
            <input type={'button'} onClick={handlePlaceholderViewModifiedFilesButtonPress}/>
        </div>
    );
};

export const ActionsComponent: React.FC = () => {
    return (
        <div className={'upper-block'}>
            <ActionsSpace />
        </div>
    );
};

export const ChangesListElement: React.FC<ChangesTreeType> = (
        {status, content}: ChangesTreeType
    ) => {
    return (
        <li className={`files-${status}`}>{content}</li>
    )
}
