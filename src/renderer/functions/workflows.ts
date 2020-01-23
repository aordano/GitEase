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

// -----------------------------
// --- SimpleGit Definitions ---
// -----------------------------

export class BasicWorkflow {
    // -- This class contains the methods to be used by the basic workflow.
    // -- Currently contains BasicWorkflow.commitAndPush(), which reads the data passed
    // to the class when initialized, and performs a commit with the given data, and then pushes.

    // -- This class's methods are to be called ONLY from a Saga, as it's not idiomatic Redux
    // to dispatch actions from within a reducer.

    gitBasicWorkflowData: gitBasicWorkflowDataType;

    constructor(
        message: gitBasicWorkflowDataType['message'],
        description?: gitBasicWorkflowDataType['description'],
        branch?: gitBasicWorkflowDataType['branch'],
        remote?: gitBasicWorkflowDataType['remote'],
        workingDir?: gitBasicWorkflowDataType['workingDir']
    ) {
        this.gitBasicWorkflowData = { branch, description, message, remote, workingDir };
    }
    
    commitAndPush() {
        // -- This method commits and pushes as it name says. If there's missing data it defaults
        // to "origin" and "master" for remote and branch.

        // Calls the async git class and applies it to the set working dir
        const git = promise(this.gitBasicWorkflowData.workingDir?? "");

        // Makes the data accesible to nested arrow functions
        const basicWorkflowData = this.gitBasicWorkflowData

        // Commits, pushes and then fetches origin.
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
                        // Once origin is fetched the success/error conditions are given.
                        () => {
                            store.dispatch(CommitSuccessAlertAction())
                        },
                        () => {
                            store.dispatch(CommitErrorAlertAction())
                        }
                    )
                },
                // On Push error
                () => {
                    store.dispatch(CommitErrorAlertAction())
                })
            })
        },
        // On Commit error
        () => {
            store.dispatch(CommitErrorAlertAction())
        })
    }
}
