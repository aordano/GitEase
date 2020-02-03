// ! ###  - Common Functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import { 
    ContentNameType,
    GitLogObjectType,
    ViewerComponentPropType,
    colorTripletType,
    branchDataType,
    mergeJSONPropsType,
    divergenceJSONPropsType,
    commitJSONType,
    childrenJSONType
} from '../types';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = "en_US"

const localization = require(`../lang/${lang}`)

// -----------------------------
// --- Git-related Functions ---
// -----------------------------

export const parseStatus = (workingDir?: string) => {
    const git = promise(workingDir);
    const parsedData = git.status()
    return parsedData
}

export const stageFile = (file: string | ContentNameType, workingDir?: string) => {
    const git = promise(workingDir);
    if (typeof file === "string") {
        git.add(file)  
    }
    else if (typeof file === "object") {
        git.add(file.from)
        git.add(file.to)
    }
}

export const unstageFile = (file: string | ContentNameType, workingDir?: string) => {
    const git = promise(workingDir);
    if (typeof file === "string") {
        git.reset(["--",file])
    }
    else if (typeof file === "object") {
        git.raw([
            "restore",
            "--staged",
            file.to
        ])
        git.raw([
            "restore",
            "--staged",
            file.from
        ])
    }
}

export const pull = (remote?: string, branch?: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.pull(remote ?? 'origin', branch ?? "master")
}

export const commit = (message: string, description?: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.commit([
        message, 
        description ?? ""
    ])
}

export const push = (remote?: string, branch?: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.push(remote ?? "origin", branch ?? 'master')
}

// ------------------------------------
// --- Git-Viewer Related Functions ---
// ------------------------------------

export const parseLogTree = async (workingDir?: string) => {
    const git = promise(workingDir);
    
    const parentHashList: string[] = []
    const hashList: string[] = []
    const branchesList: string[] = []
    const fullHistory: GitLogObjectType[] = []

    const logList = (await Promise.resolve(git.log())).all
    let parentHashListString = await Promise.resolve(git.raw([
        "log",
        "--format=%P%n"
    ]))
    while (parentHashListString.indexOf("\n") !== -1) {
        const parentHash = parentHashListString.slice(0, parentHashListString.indexOf("\n"))
        parentHashListString = parentHashListString.slice(
            parentHashListString.indexOf("\n")+2,parentHashListString.length
        )
        parentHashList.push(parentHash)
    }

    parentHashList.pop() // * The last element is a blank string because of the initial commit has no parent hash

    for (let i = 0; i < logList.length ; i += 1) {
        const nameRev = String( await Promise.resolve(git.raw(["name-rev", "--name-only",logList[i].hash])))
        let branchName

        // Parses branch name
        if (nameRev.indexOf("~") !== -1) {
            branchName = nameRev.slice(0, nameRev.indexOf("~"))
        } 
        else {
            branchName = nameRev.slice(0, nameRev.length-1)
        }        

        fullHistory.push({
            author_email: logList[i].author_email,
            author_name: logList[i].author_name,
            date: logList[i].date,
            hash: logList[i].hash,
            parentHash: parentHashList[i],
            message: logList[i].message,
            branch: branchName
        })

        hashList.push(logList[i].hash) // Populates the hash list

        // Perform check to list branches
        if (branchesList.indexOf(branchName) !== -1) {
            continue
        }

        else {
            branchesList.push(branchName)
        }
    }
    
    return {
        fullHistory,
        branchesList,
        hashes: {
            hashList,
            parentHashList
        }
    }

}

const generateBranchesColors = (branchesList: string[]) => {
        
    const generateSeedTriplet = () => { 
        return {
            r: Math.round(Math.random() * 255),
            g: Math.round(Math.random() * 255),
            b: Math.round(Math.random() * 255)
        }
    }

    const calculateColorDistance = (firstColor: colorTripletType, secondColor: colorTripletType) => {
        // -- Color distance calculator according to the formula found at
        // https://www.compuphase.com/cmetric.htm
        const rMean = (firstColor.r + secondColor.r) / 2
        const deltaR = Math.abs(firstColor.r - secondColor.r)
        const deltaG = Math.abs(firstColor.g - secondColor.g)
        const deltaB = Math.abs(firstColor.b - secondColor.b)
        const colorDistance = Math.sqrt(
            (2 + rMean / 256) * Math.pow(deltaR,2) +
            4 * Math.pow(deltaG,2) + 
            (2 + (( 255 - rMean )/ 256)) * Math.pow(deltaB,2)
        )
        return colorDistance
    }

    const generateDifferentColor = (currentColorTriplet: colorTripletType) =>  {
        let randomColorTriplet = generateSeedTriplet()
        
        while (calculateColorDistance(currentColorTriplet,randomColorTriplet) < 20) {
            randomColorTriplet = generateSeedTriplet()
        }

        return randomColorTriplet
    }

    const branches: branchDataType[] = [{
        branchName: branchesList[0],
        // Default branch color Royal Purple
        branchColor: {
            r: 120,
            g: 81,
            b: 169
        }
    }]

    for (let i = 1; i < branchesList.length; i += 1) {
        branches.push({
            branchName: branchesList[i],
            branchColor: generateDifferentColor(branches[i-1].branchColor)
        })
    }

    return branches
}

let isElementSelected: boolean

class TraverseJSON {
    public injectGivenChild(
        JSONTree: childrenJSONType, 
        hashToFind: string, 
        childrenToAdd: childrenJSONType[]
    ) {
        if( JSONTree !== null && typeof JSONTree === "object" ) { 
            Object.entries(JSONTree).forEach(([key, value]) => {
                if (key === "attributes") {
                    this.injectGivenChild(value, hashToFind, childrenToAdd)
                }
                if (key === "hash" && value === hashToFind) {
                    isElementSelected = true
                }
                if (isElementSelected && key === "children") {
                    Object.assign(value,childrenToAdd)
                    isElementSelected = false
                    return JSONTree
                }
                if (key === "children" && value !== []) {
                    for (let i = 0 ; i < value.length ; i += 1 ) {
                        this.injectGivenChild(value[i],hashToFind, childrenToAdd)
                    }
                }
            })    
        }
        return JSONTree
    }

    public injectParallelChild(
        JSONTree: childrenJSONType, 
        hashToFind: string, 
        childrenToAdd: childrenJSONType[]
    ) {
        if( JSONTree !== null && typeof JSONTree === "object" ) { 
            Object.entries(JSONTree).forEach(([key, value]) => {
                if (key === "attributes") {
                    this.injectGivenChild(value, hashToFind, childrenToAdd)
                }
                if (key === "hash" && value === hashToFind) {
                    isElementSelected = true
                }
                if (isElementSelected && key === "children") {
                    const newValue = value
                    newValue.push(childrenToAdd)
                    Object.assign(value,newValue)
                    isElementSelected = false
                    return JSONTree
                }
                if (key === "children" && value !== []) {
                    for (let i = 0 ; i < value.length ; i += 1 ) {
                        this.injectGivenChild(value[i],hashToFind, childrenToAdd)
                    }
                }
            })   
        }
        return JSONTree
    }
}

const buildCommitsJSON = (
    fullHistory: GitLogObjectType[],
    branchesList: string[],
    branchesData: branchDataType[]
) => {

    const commitsJSON: commitJSONType[] = []

    for (let i = 0; i < fullHistory.length; i += 1) {

        const currentBranchIndex = branchesList.indexOf(fullHistory[i].branch)
        const currentBranch = branchesData[currentBranchIndex]

        const currentCommitJSON: commitJSONType = {
            attributes: {
                message: fullHistory[i].message,
                author: fullHistory[i].author_name,
                hash: fullHistory[i].hash
            },
            nodeSvgShape: {
                shape: 'circle',
                shapeProps: {
                    r: "10",
                    width: 20,
                    height: 20,
                    x: -10,
                    y: -10,
                    fill: `rgb(${
                            String(currentBranch.branchColor.r)
                        },${
                            String(currentBranch.branchColor.g)
                        },${
                            String(currentBranch.branchColor.b)
                    })`,
                },
            },
            children: []
        }

        commitsJSON.push(currentCommitJSON)
    }
    return commitsJSON
}

const buildMergeJSON = ({
    destinationBranch,
    destinationHash,
    destinationCommitMessage
}: mergeJSONPropsType) => {
    return {
        name: destinationBranch.branchName,
        attributes: {
            message: destinationCommitMessage,
            hash: destinationHash
        },
        nodeSvgShape: {
            shape: 'polygon',
            shapeProps: {
                points: "0 5, 10 0, 0 -5",
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                fill: `rgb(${
                        String(destinationBranch.branchColor.r)
                    },${
                        String(destinationBranch.branchColor.g)
                    },${
                        String(destinationBranch.branchColor.b)
                })`,
            },
        },
        children: []
    }
}

const buildDivergenceJSON = ({
    branch,
    hash,
    author,
    message
}: divergenceJSONPropsType) => {
    return {
        name: branch.branchName,
        attributes: {
            message,
            author,
            hash
        },
        nodeSvgShape: {
            shape: 'rect',
            shapeProps: {
                rx: 5,
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                fill: `rgb(${
                        String(branch.branchColor.r)
                    },${
                        String(branch.branchColor.g)
                    },${
                        String(branch.branchColor.b)
                })`,
            },
        },
        children: []
    }
}

export const generateJSONTree = ({
    fullHistory,
    branchesList,
    hashList
}:ViewerComponentPropType) => {

    const branchesData = generateBranchesColors(branchesList) 

    const commitsJSON: commitJSONType[] = buildCommitsJSON(
        fullHistory,
        branchesList,
        branchesData
    )

    const graphedBranches: string[] = []

    const buildCausalityTree = () => {

        // Start adding the initial commit and add the branch to the graphed branches list
        const generateInitialCommit = () => {
            const initialCommit = fullHistory[fullHistory.length-1]
            const branch = {
                branchName: initialCommit.branch,
                branchColor: branchesData[branchesList.indexOf(initialCommit.branch)].branchColor
            }
            const hash = initialCommit.hash
            const author = initialCommit.author_name
            const message = initialCommit.message
            return buildDivergenceJSON({
                branch,
                hash,
                author,
                message
            })
        }

        // Avoid undefined errors until there's a commit present in the data
        let treeStructure: childrenJSONType
        if (fullHistory.length > 0 ) {
            treeStructure = generateInitialCommit()
        }

        commitsJSON[fullHistory.length-1]

        for (let i = fullHistory.length-1 ; i > 0  ; i -= 1) {

            // Forcefully do check once in the for loop to avoid "branch undefined" errorsz
            if (i === fullHistory.length-1) {
                graphedBranches.push(fullHistory[i].branch)
                continue
            }

            // Then check if commit is in the same branch as previous
            const previousBranch = fullHistory[hashList.indexOf(fullHistory[i].parentHash)].branch
            if (fullHistory[i].branch === previousBranch) {

                // If it is then generate the current node
                const currentNode: childrenJSONType = commitsJSON[i]

                // If next commit is a merge then add the merge children too
                if (
                    graphedBranches.indexOf(fullHistory[i-1].branch) !== -1 && 
                    fullHistory[i-1].branch !== fullHistory[i].branch
                ) {
                    const destinationBranch = {
                        branchName: fullHistory[i-1].branch,
                        branchColor: branchesData[branchesList.indexOf(fullHistory[i-1].branch)].branchColor
                    }
                    const destinationCommitMessage = fullHistory[i-1].message
                    const destinationHash = fullHistory[i-1].hash
                    currentNode.children.push(
                        buildMergeJSON({
                            destinationBranch,
                            destinationHash,
                            destinationCommitMessage
                        })
                    )
                }

                // Then add the node as the last children
                treeStructure = TraverseJSON.prototype.injectGivenChild(
                    treeStructure,
                    fullHistory[i].parentHash,
                    [currentNode]
                )

                continue
            }
            

            // If it's not on the same branch as the previous one check if it is a divergence
            if (graphedBranches.indexOf(fullHistory[i].branch) === -1) {
                const branch = {
                    branchName: fullHistory[i].branch,
                    branchColor: branchesData[branchesList.indexOf(fullHistory[i].branch)].branchColor
                }
                const hash = fullHistory[i].hash
                const author = fullHistory[i].author_name
                const message = fullHistory[i].message
                const currentNode: childrenJSONType = buildDivergenceJSON({
                    branch,
                    hash,
                    author,
                    message
                })

                // Add the branch to the graphed list
                graphedBranches.push(fullHistory[i].branch)


                // Then add the node as children of its parent
                treeStructure = TraverseJSON.prototype.injectParallelChild(
                    treeStructure,
                    fullHistory[i].parentHash,
                    [currentNode]
                )

                continue
            }

            // If it is not then is a merge
            if (previousBranch !== fullHistory[i].branch) {

                // If it is a merge commit then generate the merge commit node
                const destinationBranch = {
                    branchName: previousBranch,
                    branchColor: branchesData[branchesList.indexOf(previousBranch)].branchColor
                }
                const destinationCommitMessage = fullHistory[i].message
                const destinationHash = fullHistory[i].hash

                const currentNode = buildMergeJSON({
                    destinationBranch,
                    destinationHash,
                    destinationCommitMessage
                })


                // Then add the node as children of its parent
                treeStructure = TraverseJSON.prototype.injectGivenChild(
                    treeStructure,
                    fullHistory[i].parentHash,
                    [currentNode]
                )

                continue
            }
        }

        return treeStructure
    }

    return buildCausalityTree()

}



// ----------------------------------
// --- Alert Generating Functions ---
// ----------------------------------

export const displayCommitInProcessAlert = () => {
    const commitBox = document.querySelector(".commit-box") as HTMLDivElement
    const commitOverlay = document.querySelector(".commit-overlay") as HTMLDivElement
    const commitSpinner = document.querySelector(".spinner-commit-box") as HTMLDivElement
    commitBox.style.zIndex = "-1"
    commitOverlay.style.zIndex = "1"
    commitSpinner.style.zIndex = "9"
    commitSpinner.style.display = "block"
}

export const displayCommitSuccessAlert = () => {
    const commitBox = document.querySelector(".commit-box") as HTMLDivElement
    const commitOverlay = document.querySelector(".commit-overlay") as HTMLDivElement
    const commitSpinner = document.querySelector(".spinner-commit-box") as HTMLDivElement
    const successText = document.querySelector(".commit-box p") as HTMLParagraphElement
    commitBox.style.zIndex = "9"
    commitOverlay.style.zIndex = "-1"
    commitSpinner.style.zIndex = "-1"
    commitSpinner.style.display = "none"
    successText.textContent = localization.commitSuccessMessage
    successText.style.fontWeight = "500"
    setTimeout(() => {
        successText.textContent = localization.commitBoxTitle
        successText.style.fontWeight = "100"
    }, 3000)

}

export const displayCommitErrorAlert = (error: string) => {
    const commitBox = document.querySelector(".commit-box") as HTMLDivElement
    const commitOverlay = document.querySelector(".commit-overlay") as HTMLDivElement
    const commitSpinner = document.querySelector(".spinner-commit-box") as HTMLDivElement
    const failureText = document.querySelector(".commit-box p") as HTMLParagraphElement
    commitBox.style.zIndex = "9"
    commitOverlay.style.zIndex = "-1"
    commitSpinner.style.zIndex = "-1"
    commitSpinner.style.display = "none"
    failureText.textContent = localization.commitFailureMessage
    failureText.style.fontWeight = "500"
    setTimeout(() => {
        failureText.textContent = localization.commitBoxTitle
        failureText.style.fontWeight = "100"
    }, 3000)
}

// -----------------------
// --- Misc. Functions ---
// -----------------------

export const truncate = (path: string, num: number) => {
    // We truncate the filepath in a special way to display it properly in the staging area.
    if (path.length <= num) {
        return path
    }
    const topFolders = path.slice(
        0,
        path.slice(path.indexOf("/"),
        path.lastIndexOf("/")).lastIndexOf("/") - 1
    )
    const fileName = path.slice(path.lastIndexOf("/"),path.length)
    return  `${topFolders} ... ${fileName}`
}

export const removeQuotes = (string: string) => {
    if (typeof string !== "string") {
        return ""      
    }
    if (string.endsWith('"') || string.endsWith("'")) {
        const quotelessString = string.slice(1,string.length - 1)
        return quotelessString
    }
    return string
}