import promise, { SimpleGit } from 'simple-git/promise';
import { gitBasicWorkflowDataType } from '../../types';

const git = promise();

export class BasicWorkflow {
    // fix this class, makes no sense.
    // the idea is to be able to access gitBasicWorkflowData from inside BasicWorkflow in the style of
    // BasicWorkflow.gitBasicWorkflowData(props)
    // gitBasicWorkflowData: gitBasicWorkflowDataType
    // constructor()
    gitBasicWorkflowData: {
        message: gitBasicWorkflowDataType['message'];
        branch?: gitBasicWorkflowDataType['branch'];
        remote?: gitBasicWorkflowDataType['remote'];
    };

    constructor(
        message: gitBasicWorkflowDataType['message'],
        branch?: gitBasicWorkflowDataType['branch'],
        remote?: gitBasicWorkflowDataType['remote']
    ) {
        this.gitBasicWorkflowData = { message, branch, remote };
    }

    commitAndPush() {
        git.fetch(
            this.gitBasicWorkflowData.remote ?? 'origin',
            this.gitBasicWorkflowData.branch ?? 'master'
        );
        git.commit(this.gitBasicWorkflowData.message);
        git.push(this.gitBasicWorkflowData.remote ?? "origin",this.gitBasicWorkflowData.branch ?? "master")
    }
}
