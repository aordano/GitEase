// ! ###  - American English Localization - ###

import {
    labelType
}  from "../types"

// ------------------
// --- Commit Box ---
// ------------------

export const commitMessageTooltip = "Make it a short one that succintly describes your changes."
export const commitMessagePlaceholder = "Give a name to your changes"
export const commitButtonTooltip = "Publish your changes."
export const commitButtonText = "Go"
export const commitDescriptionPlaceholder = 'Describe what you did with a short explanation'
export const commitBoxTitle = "Commit your changes:"

// --------------------------
// --- Commit Box Alerts ---
// --------------------------

export const commitSuccessMessage = "Success!"
export const commitFailureMessage = "There was an unexpected error :("
export const commitProcessMessage = "Uploading changes..."

// --------------------
// --- Changes Area ---
// --------------------

export const changesAreaNoChangesTitle = "No changed files" 
export const changesAreaChangesTitle = "changed files"
export const changesAreaGlobalCheckboxTooltip = "Stage/Unstage all changes."
export const changesAreaElementCheckboxTooltip = "Stage/Unstage changes on this file."

// -------------------------
// --- First Time Wizard ---
// -------------------------

export const firstTimeWizardTitle = "First Time Configuration Wizard"
export const firstTimeWizardDescription = "Welcome to GitEase! First we need to configure some stuff, so please follow the wizard and fill out all the forms."

// -------------------------
// --- Git Graph Messages ---
// -------------------------

export const gitGraphLoadingMessage = "Loading information from repository..."

// -----------------------
// --- Git Graph Nodes ---
// -----------------------

export const nodeHash = "Id"
export const nodeAuthor = "By"
export const nodeSubject = "Message" 

// ------------------------
// --- Git Graph Labels ---
// ------------------------

export const labelInitialCommit = "Initial commit"

// ---------------------
// --- Context Menus ---
// ---------------------
    
export const defaultContextMenuLaunchWizard = "Launch wizard"
export const defaultContextMenuNewProject = "New project"
export const defaultContextMenuOpenProject = "Open project"
export const defaultContextMenuChangeProject = "Change project"
export const defaultContextMenuProjectSettings = "Project settings"
export const defaultContextMenuChangeRepository = "Change repository"
export const defaultContextMenuRepositorySettings = "Repository settings"
export const defaultContextMenuGeneralSettings = "General Settings"
    
export const nodeGraphContextMenuRevertCommit = "Revert to this commit"
export const nodeGraphContextMenuChangeBranch = "Change to this branch"
export const nodeGraphContextMenuViewCommit = "View commit information"
export const nodeGraphContextMenuCreateBranch = "Branch from here"
export const nodeGraphContextMenuMergeBranch = "Merge into this branch"
export const nodeGraphContextMenuRebase = "Rebase"
export const nodeGraphContextMenuViewDiff = "View diff"
    
export const graphBackgroundContextMenuRedraw = "Redraw graph"
export const graphBackgroundContextMenuChangeRepository = "Change repository"
export const graphBackgroundContextMenuRepositorySettings = "Repository settings"
export const graphBackgroundContextMenuProjectSettings = "Project settings"
export const graphBackgroundContextMenuProjectInformation = "View project information"

export const commitButtonContextMenuCommitOnly = "Commit only"
export const commitButtonContextMenuCommitAndPush = "Commit and push"
export const commitButtonContextMenuPushOnly = "Push only"
export const commitButtonContextMenuRevertLast = "Revert last commit"

export const stagingAreaContextMenuStageAll = "Stage all files"
export const stagingAreaContextMenuDiscardAll = "Discard all changes"
export const stagingAreaContextMenuStash = "Stash changes"
export const stagingAreaContextMenuOpen = "Open project in file explorer"

export const stagingAreaItemContextMenuStage = "Stage file"
export const stagingAreaItemContextMenuDiscard = "Discard changes"
export const stagingAreaItemContextMenuShow = "Show file in file explorer"
export const stagingAreaItemContextMenuOpen = "Open file"

// -------------------------
// --- Application Menus ---
// -------------------------

export const applicationMenuView = "View"
export const applicationMenuViewLaunchWizard = "Launch wizard"
export const applicationMenuViewProjectInfo = "Project information"
export const applicationMenuViewRepoInfo = "Repository information"
export const applicationMenuViewBranchInfo = "Branch information"
export const applicationMenuViewCommitInfo = "Commit information"
export const applicationMenuViewCompareBranches = "Compare branches..."
export const applicationMenuViewCompareCommits = "Compare commits..."
export const applicationMenuViewLastDiff = "Last diff"
export const applicationMenuViewDiffFrom = "Diff from..."
export const applicationMenuViewGraphView = "Graph view"
export const applicationMenuViewDiffView = "Diff view"
export const applicationMenuViewOpenFolder = "Open working folder in file explorer"

export const applicationMenuChanges = "Changes"
export const applicationMenuChangesFiles = "Files"
export const applicationMenuChangesFilesStageAll = "Stage all files"
export const applicationMenuChangesFilesDiscardAll = "Discard all changes"
export const applicationMenuChangesFilesStash = "Stash changes"
export const applicationMenuChangesCommit = "Commit"
export const applicationMenuChangesCommitCommitOnly = "Commit only"
export const applicationMenuChangesCommitCommitAndPush = "Commit and push"
export const applicationMenuChangesCommitPushOnly = "Push only"
export const applicationMenuChangesCommitRevertLast = "Revert last commit"
export const applicationMenuChangesCommitRevertTo = "Revert to commit..."
export const applicationMenuChangesBranch = "Branch"
export const applicationMenuChangesBranchNewBranch = "New branch from last commit"
export const applicationMenuChangesBranchBranchFrom = "Branch from commit..."
export const applicationMenuChangesBranchChange = "Change active branch"
export const applicationMenuChangesBranchMerge = "Merge current branch into..."
export const applicationMenuChangesBranchRename = "Rename branch..."
export const applicationMenuChangesBranchDelete = "Delete branch..."
export const applicationMenuChangesBranchRebase = "Rebase"

export const applicationMenuManage = "Manage"
export const applicationMenuManageRepository = "Repository"
export const applicationMenuManageRepositoryChange = "Change repository"
export const applicationMenuManageRepositorySettings = "Repository settings"
export const applicationMenuManageRepositoryInfo = "View repository information"
export const applicationMenuManageProject = "Project"
export const applicationMenuManageProjectNew = "New project"
export const applicationMenuManageProjectOpen = "Open project"
export const applicationMenuManageProjectChange = "Change project"
export const applicationMenuManageProjectSettings = "Project settings"

export const applicationMenuSettings = "Settings"
export const applicationMenuSettingsAccounts = "Account settings"
export const applicationMenuSettingsGithub = "Github integration"
export const applicationMenuSettingsGitlab = "Gitlab integration"
export const applicationMenuSettingsKeys = "Keys"
export const applicationMenuSettingsProject = "Project settings"
export const applicationMenuSettingsRepo = "Repository settings"
export const applicationMenuSettingsGeneral = "General settings"

// -------------------
// --- Git History ---
// -------------------
 
export const gitHistoryTitle = "History"
export const gitHistoryCommitedName = "commited"
export const gitHistoryElementMinutesAgo = "minutes ago"
export const gitHistoryElementHoursAgo = "hours ago"
export const gitHistoryElementDaysAgo = "days"

// -------------------
// --- Git labels ---
// -------------------

export const labelsDictionary: labelType[] = [
    {
        label: "feat",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "feature",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "fix",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "fixes",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "structure",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "documentation",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "docs",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "refactor",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "test",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "tests",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "scaffolding",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "experiments",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "experiment",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "lang",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "language",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "cleanup",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "style",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "styling",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    {
        label: "minor feat",
        labelColor: {
            r: 140,
            g: 70, 
            b: 90
        }
    },
    
]
