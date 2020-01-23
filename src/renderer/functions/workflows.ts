// ! ###  - Workflows Classes and given functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { gitBasicWorkflowDataType } from '../types';

import {store} from "../store"

import {
    CommitSuccessAlertAction,
    CommitErrorAlertAction
} from "../actions/commonActions"

import { 
    BasicWorkflowDeedDoneAction, 
    BasicWorkflowDeedFailedAction
} from '../actions/basicWorkflowActions';

// -----------------------------
// --- SimpleGit Definitions ---
// -----------------------------

const git = promise();

export class BasicWorkflow {
    // -- This class contains the methods to be used by the basic workflow.
    // -- Currently contains BasicWorkflow.commitAndPush(), which reads the data passed
    // to the class when initialized, and performs a commit with the given data, and then pushes.

    // TODO incorporate the workingdir prop to the workflow class
    // TODO Fix the push is not working

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
        // -- This method commits and pushes as it name says. If there's missing data it defaults
        // to "origin" and "master" for remote and branch.
        const basicWorkflowData = this.gitBasicWorkflowData

        git.commit([
            this.gitBasicWorkflowData.message, 
            this.gitBasicWorkflowData.description ?? ""
        ]).then(() => {
            git.raw([
                "remote",
                "set-url",
                "--push",
                "origin",
                basicWorkflowData.remote ?? "origin"
            ]).then(() => {
                git.push().then(() => {
                    git.fetch("origin",basicWorkflowData.branch).then(
                        () => {
                            store.dispatch(BasicWorkflowDeedDoneAction())
                            store.dispatch(CommitSuccessAlertAction())
                        },
                        () => {
                            store.dispatch(BasicWorkflowDeedFailedAction())
                            store.dispatch(CommitErrorAlertAction())
                        }
                    )
                })
            })
        })
    }
}