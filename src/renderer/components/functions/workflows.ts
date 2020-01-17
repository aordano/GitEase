import promise, { SimpleGit } from 'simple-git/promise';
import { gitBasicWorkflowDataType } from '../../types';

const git = promise();

export class BasicWorkflow {
    // fix this class, makes no sense.
    // the idea is to be able to access gitBasicWorkflowData from inside BasicWorkflow in the style of
    // BasicWorkflow.gitBasicWorkflowData(props)
    // gitBasicWorkflowData: gitBasicWorkflowDataType
    // constructor()
    gitBasicWorkflowData: gitBasicWorkflowDataType;

    constructor(
        message: gitBasicWorkflowDataType['message'],
        description?: gitBasicWorkflowDataType['description'],
        branch?: gitBasicWorkflowDataType['branch'],
        remote?: gitBasicWorkflowDataType['remote']
    ) {
        this.gitBasicWorkflowData = { branch, description, message, remote };
    }

    commitAndPush() {
        debugger
        git.fetch(
            this.gitBasicWorkflowData.remote ?? 'origin',
            this.gitBasicWorkflowData.branch ?? 'master'
        );
        git.commit(this.gitBasicWorkflowData.message,[], {"--description": this.gitBasicWorkflowData.description});
        git.push(this.gitBasicWorkflowData.remote ?? "origin",this.gitBasicWorkflowData.branch ?? "master")
    }
}
