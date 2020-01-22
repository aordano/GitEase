// ! ###  - Workflows Classes and given functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { gitBasicWorkflowDataType } from '../../types';

import {store} from "../../store"

import {CommitSuccessAlertAction} from "../../actions/commonActions"

import {delay} from "redux-saga/effects"

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
        git.commit([
            this.gitBasicWorkflowData.message, 
            this.gitBasicWorkflowData.description ?? ""
        ]).then(() => {
            debugger
            git.raw([
                "push",
                this.gitBasicWorkflowData.remote ?? "origin",
                this.gitBasicWorkflowData.branch ?? "master",
                "--verbose"
            ]);
        })
    }
}
