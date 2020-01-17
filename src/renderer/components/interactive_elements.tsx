import * as React from 'react';
// tslint:disable-next-line: no-duplicate-imports
import { useState } from 'react';

import { store } from '../store';

import { 
    useSelector,
    ChangesTreeType,
    StagingCheckboxIndexType
} from '../types';

import {
    BasicWorkflowCommitAndPushAction,
    BasicWorkflowUpdateCommitMessageAction
} from '../actions/basicWorkflowActions';


import {
    SetStagingStatusAction
} from '../actions/commonActions';

require('../static/scss/actions.scss');

// temporary statements for testing
const branch = 'master';
const USER = 'aordano';
import {PASS} from "../../../.secrets"
const REPO = 'github.com/aordano/GitEase';
const remote = `https://${USER}:${PASS}@${REPO}`;
// ----------------------------

const CommitMessageInput: React.FC = () => {
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer)
    const handleCommitTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
        store.dispatch(
            BasicWorkflowUpdateCommitMessageAction(
                event.currentTarget.value,
                currentState.commitDescription
            )
        );
    };

    return <input 
        title={"Make it a short one that succintly describes your changes."} 
        className={'commit-message'} 
        placeholder={"Give a name to your changes"} 
        value={input} 
        onChange={handleCommitTextChange} 
    />;
};

const CommitButton: React.FC = () => {
    const currentState = useSelector(state => state.basicWorkflowReducer);
    const handleCommitButtonPress = () => {
        store.dispatch(
            BasicWorkflowCommitAndPushAction(
                currentState.commitMessage,
                currentState.commitDescription,
                branch, 
                remote
            )
        );
    };

    return <input 
        title={"Publish your changes."} 
        type={'button'} 
        className={'commit-button'} 
        onClick={handleCommitButtonPress} 
        value={"Go"}
    />;
};

const CommmitDescription: React.FC = () => {
    const [input, setInput] = useState('');
    const currentState = useSelector(state => state.basicWorkflowReducer)

    const handleCommitDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.currentTarget.value);
        store.dispatch(
            BasicWorkflowUpdateCommitMessageAction(
                currentState.commitMessage,
                event.currentTarget.value
            )
        );
    };

    return (
        <textarea 
            placeholder={'Describe what you did with a short explanation'} 
            className={'commit-description'} 
            value={input} // handle change and upload it to the state for the commit
            onChange={handleCommitDescriptionChange}
        />
    )
}

const CommitBox: React.FC = () => {
    return (
        <div className={'commit-box'}>
            <p>Commit your changes:</p>
            <CommitMessageInput />
            <CommitButton />
            <CommmitDescription />
        </div>
    );
};

const ChangesSpace: React.FC = () => {
    const changesAreaTree = useSelector(state => state.updateChangesAreaReducer.changesAreaTree)
    const elements = []
    let title
    for (let i = 0; i < changesAreaTree.length ; i += 1) {
        elements.push(
            React.createElement(ChangesListElement,{
                status: changesAreaTree[i].status,
                content: changesAreaTree[i].content,
                displayContent: changesAreaTree[i].displayContent,
                staged: changesAreaTree[i].staged,
                key: i,
                index: i
            })
        )
    }
    if (changesAreaTree.length === 0 ){
        title =  React.createElement('p', { className: "changes-list-title"}, "No changed files.")
    }
    else {
        title = React.createElement('p', { className: "changes-list-title"}, `${changesAreaTree.length} changed files`)
    }
    const changesList =  React.createElement('ul', { className: "changes-list"}, elements)
    return (
        <div className={'changes-area'}>
            {title}
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
    return (
        <div className={'actions-space'}>
            <h2>Actions space</h2>
            <input type={'button'}/>
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
        {status, displayContent, index}: ChangesTreeType
    ) => {
    return (
    <li className={`files-${status}`}>
        <StagingCheckboxElement index={index}/>
        {displayContent.slice(0,displayContent.lastIndexOf("/")+1)}
        <b className={"filename"}>{displayContent.slice(displayContent.lastIndexOf("/")+1,displayContent.length)}</b>
    </li>
    )
}

export const StagingCheckboxElement: React.FC<StagingCheckboxIndexType> = (
    {index}: StagingCheckboxIndexType
) => {
    const handleStagingCheckbox = () => {
        if (index !== undefined) {
            store.dispatch(SetStagingStatusAction(index))
        }
        
    };

    return (
        <input
            className={"stage-checkbox"}
            type={"checkbox"}  
            onChange={handleStagingCheckbox}  
        />
    )
}
