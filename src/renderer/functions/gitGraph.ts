// ! ###  - Git Graph related functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import gitP, {SimpleGit} from 'simple-git/promise';

import { Graph } from "react-d3-graph";

// --------------------
// --- Type Imports ---
// --------------------

import {
    GitLogObjectType,
    colorTripletType,
    branchDataType,
    GitGraphNodeMetadataType,
    GitNodeType,
    GitLinkType
} from '../types';

// ------------------------
// --- Function Imports ---
// ------------------------

import {
    getAllIndexes,
    gitPath
} from './index';

// ------------------------------------
// --- Git-Viewer Related Functions ---
// ------------------------------------

export const parseLogTree = async (workingDir?: string) => {

    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())

    const fullHistory: GitLogObjectType[] = [];
    const logList = [];

    const logListString = await Promise.resolve(
        git.raw(['log', '--full-history', '--topo-order', '--format=%H%%%%%an%%%%%s%%%%%ad%%%%%b%n%%%%'])
    );

    const logListSplitted = logListString.split('\n%%');

    for (let i = 0; i < logListSplitted.length; i += 1) {
        const logListSplittedElement = logListSplitted[i].split('%%');
        logList.push({
            hash: logListSplittedElement[0].replace("\n",""),
            author_name: logListSplittedElement[1],
            message: logListSplittedElement[2],
            date: logListSplittedElement[3],
            messageBody: logListSplittedElement[4]
        });
    }

    const parentHashListString = await Promise.resolve(
        git.raw(['log', '--full-history', '--topo-order', '--format=%P'])
    );

    const hashListString = await Promise.resolve(
        git.raw(['log', '--full-history', '--topo-order', '--format=%H'])
    );

    const hashList: string[] = hashListString.split('\n');

    const parentHashList: string[] = parentHashListString.split('\n');

    parentHashList.pop();
    hashList.pop();
    logList.pop(); // It generates for some reason a empty element before the base commit (windows specific bug?)

    // TODO check later the behaviour of this on different platforms

    parentHashList.pop(); // * The last element is a blank string because of the initial commit has no parent hash

    const branchNameList = await parseBranchNames(workingDir)

    const branchesList: string[] = []

    branchNameList.forEach((value) => {
        if (branchesList.indexOf(value) === -1) {
            branchesList.push(value)
        }
    })

    if (branchesList.indexOf("") !== -1) {
        branchesList.splice(branchesList.indexOf(""),1)
    }

    for (let i = 0; i < logList.length; i += 1) {

        if (logList[i].messageBody) {
            fullHistory.push({
                author_name: logList[i].author_name,
                date: logList[i].date,
                hash: logList[i].hash,
                parentHash: parentHashList[i],
                message: logList[i].message,
                messageBody: logList[i].messageBody,
                branch: branchNameList[i]
            })
        } else {
            fullHistory.push({
                author_name: logList[i].author_name,
                date: logList[i].date,
                hash: logList[i].hash,
                parentHash: parentHashList[i],
                message: logList[i].message,
                branch: branchNameList[i]
            })
        }
    }    

    const metadataList = generateGraphMetadata(hashList, parentHashList, fullHistory, branchesList);

    return {
        fullHistory,
        branchesList,
        metadataList,
        hashes: {
            hashList,
            parentHashList
        }
    };
};

export const generateGraphData = async (
    workingDir?: string
) => {

    const logTree = await Promise.resolve(parseLogTree(workingDir))

    const nodeList: GitNodeType[] = []
    const linkList: GitLinkType[] = []

    for (let j = logTree.metadataList.length - 1; j >= 0; j -= 1) {

        const currentNodeMetadata = logTree.metadataList[j]
        
        const commitData = buildCommit(currentNodeMetadata, logTree.hashes.hashList[j])

        nodeList.unshift(commitData[0] as GitNodeType)
        if (j !== logTree.metadataList.length - 1) {
            linkList.unshift(commitData[1] as any) // HACK check how to ensure type safety here
        }
    }

    return {
        nodes: nodeList,
        links: linkList.flat(200),
        focusedNodeId: "" // ? It works really buggy so better leave it empty for now, it should be nodeList[0].id
    };
};

const parseBranchNames = async (workingDir?: string) => {
    
    const git: SimpleGit = gitP(workingDir);
    git.customBinary(gitPath())

    const rawBranchNameInformationString = await Promise.resolve(git.raw([
        "show-branch",
        "--all",
        "--topo-order",
        "--sparse",
        "--more=200000"
    ]))
    const rawBranchNameInformation = rawBranchNameInformationString.split("\n")
    let startIndex

    rawBranchNameInformation.forEach((value, index) => {
        if (value.match(/^(\-+)$/g) !== null) {
            startIndex = index
        }
    })

    if (startIndex !== undefined ) {
        for (let i = 0; i <= startIndex; i += 1) {
            rawBranchNameInformation.shift()
        }
    }

    const branchNameList = rawBranchNameInformation.map((value) => {
        const nameStartIndex = value.indexOf("[")
        const nameEndIndex = value.indexOf("]")
        const name = value.slice(nameStartIndex + 1, nameEndIndex)
        const caretIndex = name.indexOf("^")
        const tildeIndex = name.indexOf("~")

        let endIndex
        if (tildeIndex !== -1 && caretIndex !== -1) {
            endIndex = Math.min(caretIndex, tildeIndex)
        }
        if (tildeIndex === -1) {
            if (caretIndex === -1) {
                endIndex = name.length
            } else {
                endIndex = caretIndex
            }
        } else if (caretIndex === -1 && tildeIndex !== -1) {
            endIndex = tildeIndex
        }

        
        const cleanedName = name.slice(0, endIndex)
        return cleanedName
    })

    return branchNameList
    
};

const buildCommit = (metadata: GitGraphNodeMetadataType, hash: string) => {
    
    if (metadata.isInitial) {
        return buildInitialCommit(metadata, hash)
    }

    if (metadata.isMerge) {
        if (metadata.isDivergence) {
            return buildMergeDivergenceCommit(metadata, hash)
        }
        return buildMergeCommit(metadata, hash)
    }

    if (metadata.isDivergence) {
        return buildDivergenceCommit(metadata, hash)
    }

    let nodeData: GitNodeType = {
        id: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`,
        size: 250,
        symbolType: "circle"
    }

    if (metadata.isLast) {
        nodeData = buildLastCommit(metadata, hash)[0]
    }

    const linkData: GitLinkType = {
        source: metadata.childrenOf[0],
        target: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`
    } 

    return [nodeData, linkData]
}

const buildMergeCommit = (metadata: GitGraphNodeMetadataType, hash: string) => {

    const nodeData: GitNodeType = {
        id: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`,
        size: 550,
        symbolType: "cross"
    }

    const linkData: GitLinkType[] = []
    
    metadata.childrenOf.forEach((value) => {
        const thisLinkData = {
            source: value,
            target: hash,
            color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`
        } 
        linkData.push(thisLinkData)
    })

    return [nodeData, linkData]
}

const buildDivergenceCommit = (metadata: GitGraphNodeMetadataType, hash: string) => {

    const nodeData: GitNodeType = {
        id: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`,
        size: 500,
        symbolType: "diamond"
    }

    const linkData: GitLinkType = {
        source: metadata.childrenOf[0],
        target: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`
    } 

    return [nodeData, linkData]
}

const buildInitialCommit = (metadata: GitGraphNodeMetadataType, hash: string) => {

    const nodeData: GitNodeType = {
        id: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`,
        size: 800,
        symbolType: "circle"
    }

    return [nodeData]
}

const buildLastCommit = (metadata: GitGraphNodeMetadataType, hash: string) => {

    const nodeData: GitNodeType = {
        id: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`,
        size: 800,
        symbolType: "square"
    }

    return [nodeData]
}

const buildMergeDivergenceCommit = (metadata: GitGraphNodeMetadataType, hash: string) => {

    const nodeData: GitNodeType = {
        id: hash,
        color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`,
        size: 500,
        symbolType: "square"
    }

    const linkData: GitLinkType[] = []
    
    metadata.childrenOf.forEach((value) => {
        const thisLinkData = {
            source: value,
            target: hash,
            color: `rgb(${String(metadata.branch.branchColor.r)},${String(metadata.branch.branchColor.g)},${String(metadata.branch.branchColor.b)})`
        } 
        linkData.push(thisLinkData)
    })

    return [nodeData, linkData]
}

const generateGraphMetadata = (
    hashList: string[],
    parentHashList: string[],
    fullHistory: GitLogObjectType[],
    branchesList: string[]
) => {
    
    const metadataList: GitGraphNodeMetadataType[] = [];
            
    const branchesData = generateBranchesColors(branchesList)

    for (let k = hashList.length - 1; k >= 0; k -= 1) {
        let isInitial: boolean = false;
        let isLast: boolean = false
        let isDivergence: boolean = false;
        let isMerge: boolean = false;
        let parentHashes: string[] = [];
        let childrenHashes: string[] = [];

        if (k === hashList.length - 1) {
            isInitial = true;
        }

        if (k === 0) {
            isLast = true
        }

        if (!isInitial) {

            // We assign them first so in case that there is only one parent it has it
            parentHashes = [parentHashList[k]];

            const thisCommitParentHashes: string[] = parentHashList[k].split(' ');

            parentHashes = thisCommitParentHashes;

            // If a commit has multiple parent hashes list them in an array
            if (parentHashes.length > 1) {
                isMerge = true;
            }
        }

        // If a commit has multiple children hashes list them too

        const children: string[] = [];
        const indexes = getAllIndexes(parentHashList, hashList[k]);
        for (let j = 0; j < indexes.length; j += 1) {
            children.push(hashList[indexes[j]]);
        }
        // We assign them first so in case that there is only one children it has it
        childrenHashes = children;

        if (children.length > 1) {
            isDivergence = true;
        }

        metadataList.unshift({
            isInitial,
            isDivergence,
            isMerge,
            isLast,
            childrenOf: parentHashes,
            parentOf: childrenHashes,
            branch: {
                branchName: fullHistory[k].branch,
                branchColor: branchesData[branchesList.indexOf(fullHistory[k].branch)].branchColor
            }
        });
    }

    return metadataList
}

const generateBranchesColors = (branchesList: string[]) => {

    // TODO FIx colors; the pallette must be further restricted so to avoid poorly 
    // contrasting colors with the background or the stroke color

    const generateSeedTriplet = () => {
        return {
            r: Math.round(Math.random() * 255),
            g: Math.round(Math.random() * 255),
            b: Math.round(Math.random() * 255)
        };
    };

    const foregroundColorTriplet: colorTripletType = {
        r: 204,
        g: 204,
        b: 204
    }

    const backgroundColorTriplet: colorTripletType = {
        r: 51,
        g: 51,
        b: 51
    }

    const calculateColorDistance = (
        firstColor: colorTripletType,
        secondColor: colorTripletType
    ) => {
        // -- Color distance calculator according to the formula found at
        // https://www.compuphase.com/cmetric.htm
        const rMean = (firstColor.r + secondColor.r) / 2;
        const deltaR = Math.abs(firstColor.r - secondColor.r);
        const deltaG = Math.abs(firstColor.g - secondColor.g);
        const deltaB = Math.abs(firstColor.b - secondColor.b);
        const colorDistance = Math.sqrt(
            (2 + rMean / 256) * Math.pow(deltaR, 2) +
                4 * Math.pow(deltaG, 2) +
                (2 + (255 - rMean) / 256) * Math.pow(deltaB, 2)
        );
        return colorDistance;
    };

    const generateDifferentColor = (currentColorTriplet: colorTripletType) => {
        let randomColorTriplet = generateSeedTriplet();

        

        while (
            calculateColorDistance(currentColorTriplet, randomColorTriplet) < 90 ||
            calculateColorDistance(backgroundColorTriplet, randomColorTriplet) < 90 ||
            calculateColorDistance(foregroundColorTriplet, randomColorTriplet) < 90
        ) {
            randomColorTriplet = generateSeedTriplet();
        }

        return randomColorTriplet;
    };

    const branches: branchDataType[] = [
        {
            branchName: branchesList[0],
            // Default branch color Royal Purple
            branchColor: {
                r: 120,
                g: 81,
                b: 169
            }
        }
    ];

    for (let i = 1; i < branchesList.length; i += 1) {
        branches.push({
            branchName: branchesList[i],
            branchColor: generateDifferentColor(branches[i - 1].branchColor)
        });
    }

    return branches;
};


// Polyfill Array.prototype.flat implementation
// from https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/flat#Polyfill
if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth: any) {
      var flattend = [];
      (function flat(array, depth) {
        for (let el of array) {
          if (Array.isArray(el) && depth > 0) {
            flat(el, depth - 1); 
          } else {
            flattend.push(el);
          }
        }
      })(this, Math.floor(depth) || 1);
      return flattend;
    };
  }