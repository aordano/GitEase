// ! ###  - Git Tree related functions - ###

// -------------------------
// --- SimpleGit Imports ---
// -------------------------

import promise from 'simple-git/promise';

// --------------------
// --- Type Imports ---
// --------------------

import {
    GitLogObjectType,
    JSONTreeGeneratorPropType,
    colorTripletType,
    branchDataType,
    mergeJSONPropsType,
    divergenceJSONPropsType,
    commitJSONType,
    childrenJSONType,
    GitTreeNodeMetadataType
} from '../types';

// ----------------------------
// --- Localization Imports ---
// ----------------------------

const lang = 'en_US';

const localization = require(`../lang/${lang}`);

// ------------------------
// --- Function Imports ---
// ------------------------

import { getAllIndexes } from './index';

// ---------------------------
// * --- Mock Data Imports ---
// ---------------------------

import { data } from '../../../data.mock';

// ------------------------------------
// --- Git-Viewer Related Functions ---
// ------------------------------------

export const parseBranchNamesBelow = async (hash: string, workingDir?: string) => {
    if (hash.length === 40) {
        const git = promise(workingDir);
        const branchesWithRefs = String(
            await Promise.resolve(git.raw(['branch', '-a', '--contains', hash]))
        );

        const branches: string[] = branchesWithRefs
            .slice(0, branchesWithRefs.indexOf('remotes'))
            .split('\n');

        for (let i = 0; i < branches.length; i += 1) {
            let thisBranchName = branches[i];
            if (thisBranchName.indexOf('*') === -1) {
                thisBranchName = thisBranchName.slice(thisBranchName.indexOf(' ') + 2);
            } else {
                thisBranchName = thisBranchName.slice(thisBranchName.indexOf(' ') + 1);
            }
            branches[i] = thisBranchName;
        }
        return branches;
    }
    return ['default'];
};
/*
export const generateTreeMetadataHierarchy = (hashList: string[], parentHashList: string[]) => {

    debugger

    const metadataList: GitTreeNodeMetadataType[] = [];

    for (let k = hashList.length - 1; k >= 0; k -= 1) {
        let isInitial: boolean = false;
        let isDivergence: boolean = false;
        let isMerge: boolean = false;
        const isLeaf: boolean = false;
        let parentHashes: string[] = [];
        let childrenHashes: string[] = [];

        if (k === hashList.length - 1) {
            isInitial = true;
        }

        const parentIndexes: number[] = [];

        if (!isInitial) {

            // We assign them first so in case that there is only one parent it has it
            parentHashes = [parentHashList[k]];

            const thisCommitParentHashes: string[] = parentHashList[k].split(' ');

            thisCommitParentHashes.forEach(value => {
                parentIndexes.push(hashList.indexOf(value));
            });

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

        const childrenIndexes: number[] = [];

        for (let j = 0; j < childrenHashes.length; j += 1) {
            childrenIndexes.push(hashList.indexOf(childrenHashes[j]));
        }

        if (children.length > 1) {
            isDivergence = true;
        }

        // * pointsTo only is used when talking about pointers to merges.
        // * It should not be used for anything else or the tree will break.
        const pointsTo = childrenIndexes[0];

        metadataList.unshift({
            isInitial,
            isDivergence,
            isMerge,
            isLeaf,
            pointsTo,
            isPointer: false,
            childrenOf: parentIndexes,
            parentOf: childrenIndexes
        });
    }

    debugger

    const merges: number[] = [];

    // Checks for all merges found

    metadataList.forEach(value => {
        if (value.isMerge) {
            merges.push(metadataList.indexOf(value));
        }
    });

    // TODO Document this moving pointers mess

    // TODO -- Also change them so they lie in the back of the array
    // TODO where is easier and we don't have to update EVERY pointer

    merges.forEach((value) => {
        metadataList.push(metadataList[value])
        const currentMetadataIndex = metadataList.length -1
        metadataList[currentMetadataIndex].isPointer = true;
        metadataList[currentMetadataIndex].pointsTo = currentPointer;
        metadataList[currentMetadataIndex].childrenOf = [currentParent];
        metadataList[currentMetadataIndex].parentOf = [];
        metadataList[currentParent].parentOf = [merges.length - mergesIterator - 1];
    })

    for (let mergesIterator = 0; mergesIterator < merges.length; mergesIterator += 1) {
        const currentPointer = merges[mergesIterator]
        for (let l = 0; l < metadataList[currentPointer].childrenOf.length; l += 1) {
            const currentParent = metadataList[currentPointer].childrenOf[l];
            if (l === 0) {
                metadataList[currentParent].parentOf = [currentPointer];
                continue;
            }
            metadataList.push(metadataList[currentPointer]);
            metadataList[0].isPointer = true;
            metadataList[0].pointsTo = currentPointer;
            metadataList[0].childrenOf = [currentParent];
            metadataList[0].parentOf = [];
            metadataList[currentParent].parentOf = [merges.length - mergesIterator - 1];
        }
    }

    metadataList.forEach(value => {
        if (value.parentOf.length === 0) {
            value.isLeaf = true;
        }
    });

    return [metadataList, merges.length];
};

*/

export const parseLogTree = async (workingDir?: string) => {
    // TODO Fix branch names

    const git = promise(workingDir);

    const fullHistory: GitLogObjectType[] = [];
    const logList = [];

    const logListString = await Promise.resolve(
        git.raw(['log', '--full-history', '--topo-order', '--format=%H%%%%%an%%%%%s%%%%%ad%%%%'])
    );

    const logListSplitted = logListString.split('\n');
    for (let i = 0; i < logListSplitted.length; i += 1) {
        const logListSplittedElement = logListSplitted[i].split('%%');
        logList.push({
            hash: logListSplittedElement[0],
            author_name: logListSplittedElement[1],
            message: logListSplittedElement[2],
            date: logListSplittedElement[3]
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

    const metadataListAndTreeOffset = generateTreeMetadataHierarchy(hashList, parentHashList);
    const metadataList = metadataListAndTreeOffset[0];
    const treeOffset = metadataListAndTreeOffset[1];

    const initialCommitBranchesBelow = await parseBranchNamesBelow(
        logList[logList.length - 1].hash,
        data.workingDir
    );

    if (initialCommitBranchesBelow.indexOf('') !== -1) {
        initialCommitBranchesBelow.splice(initialCommitBranchesBelow.indexOf(''), 1);
    }

    const branchesList: string[] = initialCommitBranchesBelow;

    const branchOfCommit: string[] = [];

    for (let i = 0; i < logList.length; i += 1) {
        const branchesBelow = await parseBranchNamesBelow(logList[i].hash, data.workingDir);

        let thisBranchName = 'unset';

        // TODO Instead of picking the first one traverse the tree and pick the longest lived branch

        branchOfCommit.push(branchesBelow[0]);
        thisBranchName = branchesBelow[0];

        fullHistory.push({
            author_name: logList[i].author_name,
            date: logList[i].date,
            hash: logList[i].hash,
            parentHash: parentHashList[i],
            message: logList[i].message,
            branch: thisBranchName
        });
    }

    // make sure to offset all the arrays so there's no errors

    for (let p = 0; p < treeOffset; p += 1) {
        parentHashList.unshift('pointer');
        hashList.unshift('pointer');
        fullHistory.unshift({
            author_name: 'pointer',
            date: 'pointer',
            hash: 'pointer',
            parentHash: 'pointer',
            message: 'pointer',
            branch: 'pointer'
        });
    }

    return {
        fullHistory,
        branchesList,
        metadataList,
        treeOffset,
        hashes: {
            hashList,
            parentHashList
        }
    };
};

const generateBranchesColors = (branchesList: string[]) => {
    const generateSeedTriplet = () => {
        return {
            r: Math.round(Math.random() * 255),
            g: Math.round(Math.random() * 255),
            b: Math.round(Math.random() * 255)
        };
    };

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

        while (calculateColorDistance(currentColorTriplet, randomColorTriplet) < 20) {
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

/*

let isElementSelected: boolean;

const injectGivenChild = (
    JSONTree: childrenJSONType,
    hashToFind: string,
    childrenToAdd: childrenJSONType[]
) => {
    if (JSONTree !== null && typeof JSONTree === 'object') {
        Object.entries(JSONTree).forEach(([key, value]) => {
            if (key === 'attributes') {
                injectGivenChild(value, hashToFind, childrenToAdd);
            }
            if (key === 'hash' && value === hashToFind) {
                isElementSelected = true;
            }
            if (isElementSelected && key === 'children') {
                Object.assign(value, childrenToAdd);
                isElementSelected = false;
                return JSONTree;
            }
            if (key === 'children' && value !== []) {
                for (let i = 0; i < value.length; i += 1) {
                    injectGivenChild(value[i], hashToFind, childrenToAdd);
                }
            }
        });
    }
    return JSONTree;
};

const injectParallelChild = (
    JSONTree: childrenJSONType,
    hashToFind: string,
    childrenToAdd: childrenJSONType[]
) => {
    if (JSONTree !== null && typeof JSONTree === 'object') {
        Object.entries(JSONTree).forEach(([key, value]) => {
            if (key === 'attributes') {
                injectParallelChild(value, hashToFind, childrenToAdd);
            }
            if (key === 'hash' && value === hashToFind) {
                isElementSelected = true;
            }
            if (isElementSelected && key === 'children') {
                const newValue = value;
                newValue.push(childrenToAdd[0]);
                Object.assign(value, newValue);
                isElementSelected = false;
                return JSONTree;
            }
            if (key === 'children' && value !== []) {
                for (let i = 0; i < value.length; i += 1) {
                    injectParallelChild(value[i], hashToFind, childrenToAdd);
                }
            }
        });
    }
    return JSONTree;
};


const buildCommitsJSON = (
    treeOffset: number,
    fullHistory: GitLogObjectType[],
    branchesList: string[],
    branchesData: branchDataType[]
) => {
    const commitsJSON: commitJSONType[] = [];

    for (let i = treeOffset + 1; i < fullHistory.length; i += 1) {
        const currentBranchIndex = branchesList.indexOf(fullHistory[i].branch);
        const currentBranch = branchesData[currentBranchIndex];

        const currentCommitJSON: commitJSONType = {
            attributes: {
                message: fullHistory[i].message,
                author: fullHistory[i].author_name,
                hash: fullHistory[i].hash
            },
            children: [],
            nodeSvgShape: {
                shape: 'circle',
                shapeProps: {
                    r: '10',
                    width: 20,
                    height: 20,
                    x: -10,
                    y: -10,
                    fill: `rgb(${String(currentBranch.branchColor.r)},${String(
                        currentBranch.branchColor.g
                    )},${String(currentBranch.branchColor.b)})`
                }
            }
        };

        commitsJSON.push(currentCommitJSON);
    }
    return commitsJSON;
};

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
        children: [],
        nodeSvgShape: {
            shape: 'polygon',
            shapeProps: {
                points: '-5 10, 15 0, -5 -10',
                width: 20,
                height: 20,
                x: -20,
                y: -10,
                fill: `rgb(${String(destinationBranch.branchColor.r)},${String(
                    destinationBranch.branchColor.g
                )},${String(destinationBranch.branchColor.b)})`
            }
        }
    };
};

const buildDivergenceJSON = ({ branch, hash, author, message }: divergenceJSONPropsType) => {
    return {
        name: branch.branchName,
        attributes: {
            message,
            author,
            hash
        },
        children: [],
        nodeSvgShape: {
            shape: 'polygon',
            shapeProps: {
                points: '-10 0, 10 10, 10 -10',
                width: 20,
                height: 20,
                x: -20,
                y: -10,
                fill: `rgb(${String(branch.branchColor.r)},${String(branch.branchColor.g)},${String(
                    branch.branchColor.b
                )})`
            }
        }
    };
};

const buildStarterJSON = ({ branch, hash, author, message }: divergenceJSONPropsType) => {
    return {
        name: branch.branchName,
        attributes: {
            message,
            author,
            hash
        },
        children: [],
        nodeSvgShape: {
            shape: 'rect',
            shapeProps: {
                rx: 5,
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                fill: `rgb(${String(branch.branchColor.r)},${String(branch.branchColor.g)},${String(
                    branch.branchColor.b
                )})`
            }
        }
    };
};

const buildMergeAndDivergenceJSON = ({
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
        children: [],
        nodeSvgShape: {
            shape: 'polygon',
            shapeProps: {
                points: '0 5, 10 0, 20 5, 20 -5, 10 0, 0 -5',
                width: 20,
                height: 20,
                x: -10,
                y: -10,
                fill: `rgb(${String(branch.branchColor.r)},${String(branch.branchColor.g)},${String(
                    branch.branchColor.b
                )})`
            }
        }
    };
};

// TODO Fix why the damn tree is not drawing. The culprit is in the builder function, as the first commit builds correctly.

export const generateJSONTree = ({
    fullHistory,
    branchesList,
    metadataList,
    treeOffset
}: JSONTreeGeneratorPropType) => {
    
    const branchesData = generateBranchesColors(branchesList);

    const commitsJSON: commitJSONType[] = buildCommitsJSON(
        treeOffset,
        fullHistory,
        branchesList,
        branchesData
    );

    const buildCausalityTree = () => {
        // Start adding the initial commit and add the branch to the graphed branches list
        const generateInitialCommit = (treeOffset: number) => {
            const initialCommit = fullHistory[fullHistory.length - 1 - treeOffset];
            const branch = {
                branchName: initialCommit.branch,
                branchColor: branchesData[branchesList.indexOf(initialCommit.branch)].branchColor
            };
            const hash = initialCommit.hash;
            const author = initialCommit.author_name;
            const message = initialCommit.message;
            return buildStarterJSON({
                branch,
                hash,
                author,
                message
            });
        };

        // Avoid undefined errors until there's a commit present in the data
        let treeStructure: childrenJSONType = {
            name: 'loading',
            attributes: {
                message: 'loading',
                author: 'loading',
                hash: 'loading'
            },
            nodeSvgShape: {
                shape: 'rect',
                shapeProps: {
                    rx: 5,
                    width: 20,
                    height: 20,
                    x: -10,
                    y: -10,
                    fill: `rgb(0,0,0)`
                }
            },
            children: []
        };

        const fillNodeData = (nodeNumber: number) => {
            const branch = {
                branchName: fullHistory[nodeNumber].branch,
                branchColor:
                    branchesData[branchesList.indexOf(fullHistory[nodeNumber].branch)].branchColor
            };
            const hash = fullHistory[nodeNumber].hash;
            const author = fullHistory[nodeNumber].author_name;
            const message = fullHistory[nodeNumber].message;
            return {
                branch,
                hash,
                author,
                message
            };
        };

        const buildNode = (currentNodeNumber: number, isFirstChild?: boolean, treeOffsetNumber?: number) => {
            // TODO Fix naming on divergences
            // TODO Fix merges with children  not working
            // TODO Fix merge/diverges not showing up
            // TODO Fix naming on divergence children
            

            const treeOffset = (treeOffsetNumber ?? 0 )

            const currentNodeMetadata = metadataList[currentNodeNumber];

            if (!currentNodeMetadata.isPointer) {
                if (!currentNodeMetadata.isLeaf) {
                    if (currentNodeMetadata.isDivergence && !currentNodeMetadata.isMerge) {
                        const data = fillNodeData(currentNodeNumber);
                        const currentNode: childrenJSONType = buildDivergenceJSON({
                            branch: data.branch,
                            hash: data.hash,
                            author: data.author,
                            message: data.message
                        });
                        // Then add the node as the last children
                        treeStructure = injectGivenChild(
                            treeStructure,
                            fullHistory[currentNodeNumber].parentHash,
                            [currentNode]
                        );

                        // Then execute the function again for each children
                        for (let i = 0; i < currentNodeMetadata.parentOf.length; i += 1) {
                            if (i === 0) {
                                buildNode(currentNodeMetadata.parentOf[i], true, treeOffset);
                                continue;
                            }
                            buildNode(currentNodeMetadata.parentOf[i], false, treeOffset);
                        }
                    }

                    if (currentNodeMetadata.isMerge && !currentNodeMetadata.isDivergence) {
                        // If it does then is a merge commit so let's build it as such
                        const branchWhereBelongsTo = currentNodeMetadata.childrenOf[0];
                        const branchsNameList = currentNodeMetadata.childrenOf.slice(
                            1,
                            currentNodeMetadata.childrenOf.length
                        );

                        const destinationBranch = {
                            branchName: `(${String(branchsNameList)}) -> ${branchWhereBelongsTo}`,
                            branchColor:
                                branchesData[
                                    branchesList.indexOf(fullHistory[currentNodeNumber].branch)
                                ].branchColor
                        };
                        const destinationCommitMessage = fullHistory[currentNodeNumber].message;
                        const destinationHash = fullHistory[currentNodeNumber].hash;
                        const currentNode: childrenJSONType = buildMergeJSON({
                            destinationBranch,
                            destinationHash,
                            destinationCommitMessage
                        });

                        // Then add the node as the last children
                        treeStructure = injectGivenChild(
                            treeStructure,
                            fullHistory[currentNodeNumber].parentHash,
                            [currentNode]
                        );
                        // And then build its children
                        buildNode(currentNodeMetadata.parentOf[0], true, treeOffset);
                    }

                    if (currentNodeMetadata.isMerge && currentNodeMetadata.isDivergence) {
                        const data = fillNodeData(currentNodeNumber);
                        const currentNode: childrenJSONType = buildMergeAndDivergenceJSON({
                            branch: data.branch,
                            hash: data.hash,
                            author: data.author,
                            message: data.message
                        });
                        // Then add the node as the last children
                        treeStructure = injectGivenChild(
                            treeStructure,
                            fullHistory[currentNodeNumber].parentHash,
                            [currentNode]
                        );
                        // Then execute the function again for each children
                        for (let i = 0; i < currentNodeMetadata.parentOf.length; i += 1) {
                            if (i === 0) {
                                buildNode(currentNodeMetadata.parentOf[i], true, treeOffset);
                                continue;
                            }
                            buildNode(currentNodeMetadata.parentOf[i], false, treeOffset);
                        }
                    }

                    if (!currentNodeMetadata.isDivergence && !currentNodeMetadata.isMerge) {
                        const currentNode: childrenJSONType = commitsJSON[currentNodeNumber - treeOffset];
                        // Check if parent is divergence
                        if (
                            metadataList[currentNodeMetadata.childrenOf[0]].isDivergence &&
                            !isFirstChild
                        ) {
                            // Then add the node as children of its parent
                            const data = fillNodeData(currentNodeNumber);
                            const currentNode: childrenJSONType = buildStarterJSON({
                                branch: data.branch,
                                hash: data.hash,
                                author: data.author,
                                message: data.message
                            });
                            treeStructure = injectParallelChild(
                                treeStructure,
                                fullHistory[currentNodeNumber].parentHash,
                                [currentNode]
                            );
                        }

                        // Check if parent is divergence
                        if (
                            metadataList[currentNodeMetadata.childrenOf[0]].isDivergence &&
                            isFirstChild
                        ) {
                            // Then add the node as children of its parent
                            const data = fillNodeData(currentNodeNumber);
                            const currentNode: childrenJSONType = buildStarterJSON({
                                branch: data.branch,
                                hash: data.hash,
                                author: data.author,
                                message: data.message
                            });
                            treeStructure = injectGivenChild(
                                treeStructure,
                                fullHistory[currentNodeNumber].parentHash,
                                [currentNode]
                            );
                        }

                        if (
                            !metadataList[currentNodeMetadata.childrenOf[0]].isDivergence &&
                            isFirstChild
                        ) {
                            
                            // Then add the node as the last children
                            treeStructure = injectGivenChild(
                                treeStructure,
                                fullHistory[currentNodeNumber].parentHash,
                                [currentNode]
                            );
                        }

                        buildNode(currentNodeMetadata.parentOf[0], true, treeOffset);
                    }
                }

                // TODO fix what the heck is going on with the leaves

                if (currentNodeMetadata.isLeaf) {
                    let currentNode: childrenJSONType = commitsJSON[currentNodeNumber - treeOffset];
                    if (isFirstChild) {
                        if (currentNodeMetadata.isMerge) {
                            // If it does then is a merge commit so let's build it as such
                            const branchWhereBelongsTo = currentNodeMetadata.childrenOf[0];
                            const branchsNameList = currentNodeMetadata.childrenOf.slice(
                                1,
                                currentNodeMetadata.childrenOf.length
                            );

                            const destinationBranch = {
                                branchName: `(${String(
                                    branchsNameList
                                )}) -> ${branchWhereBelongsTo}`,
                                branchColor:
                                    branchesData[
                                        branchesList.indexOf(fullHistory[currentNodeNumber].branch)
                                    ].branchColor
                            };
                            const destinationCommitMessage = fullHistory[currentNodeNumber].message;
                            const destinationHash = fullHistory[currentNodeNumber].hash;
                            currentNode = buildMergeJSON({
                                destinationBranch,
                                destinationHash,
                                destinationCommitMessage
                            });
                        }
                        currentNodeMetadata.parentOf.forEach(value => {
                            // if there's children check for merge endpoints and graph them
                            if (metadataList[value].isMerge && metadataList[value].isPointer) {
                                const branchWhereBelongsTo = fullHistory[value].branch;
                                const branchsNameList = fullHistory[currentNodeNumber].branch;
                                const destinationBranch = {
                                    branchName: `(${branchsNameList}) -> ${branchWhereBelongsTo}`,
                                    branchColor:
                                        branchesData[
                                            branchesList.indexOf(
                                                fullHistory[currentNodeMetadata.parentOf[0]].branch
                                            )
                                        ].branchColor
                                };
                                const destinationCommitMessage = fullHistory[value].message;
                                const destinationHash = fullHistory[value].hash;
                                currentNode.children.push(
                                    buildMergeJSON({
                                        destinationBranch,
                                        destinationHash,
                                        destinationCommitMessage
                                    })
                                );
                            }
                        });
                        // Then add the node as the last children
                        treeStructure = injectGivenChild(
                            treeStructure,
                            fullHistory[currentNodeNumber].parentHash,
                            [currentNode]
                        );
                    } else {
                        if (currentNodeMetadata.isMerge) {
                            // If it does then is a merge commit so let's build it as such
                            const branchWhereBelongsTo = currentNodeMetadata.childrenOf[0];
                            const branchsNameList = currentNodeMetadata.childrenOf.slice(
                                1,
                                currentNodeMetadata.childrenOf.length
                            );

                            const destinationBranch = {
                                branchName: `(${String(
                                    branchsNameList
                                )}) -> ${branchWhereBelongsTo}`,
                                branchColor:
                                    branchesData[
                                        branchesList.indexOf(fullHistory[currentNodeNumber].branch)
                                    ].branchColor
                            };
                            const destinationCommitMessage = fullHistory[currentNodeNumber].message;
                            const destinationHash = fullHistory[currentNodeNumber].hash;
                            currentNode = buildMergeJSON({
                                destinationBranch,
                                destinationHash,
                                destinationCommitMessage
                            });
                        }

                        currentNodeMetadata.parentOf.forEach(value => {
                            // if there's children check for merge endpoints and graph them
                            if (metadataList[value].isMerge && metadataList[value].isPointer) {
                                const branchWhereBelongsTo = fullHistory[value].branch;
                                const branchsNameList = fullHistory[currentNodeNumber].branch;
                                const destinationBranch = {
                                    branchName: `(${branchsNameList}) -> ${branchWhereBelongsTo}`,
                                    branchColor:
                                        branchesData[
                                            branchesList.indexOf(
                                                fullHistory[currentNodeMetadata.parentOf[0]].branch
                                            )
                                        ].branchColor
                                };
                                const destinationCommitMessage = fullHistory[value].message;
                                const destinationHash = fullHistory[value].hash;
                                currentNode.children.push(
                                    buildMergeJSON({
                                        destinationBranch,
                                        destinationHash,
                                        destinationCommitMessage
                                    })
                                );
                            }
                        });

                        treeStructure = injectParallelChild(
                            treeStructure,
                            fullHistory[currentNodeNumber].parentHash,
                            [currentNode]
                        );
                    }
                }
            }
        };

        // TODO Document the offsets here

        if (fullHistory.length > 0) {
            treeStructure = generateInitialCommit(treeOffset);
            // TODO find where the hell is the off by one error in some repos
            debugger
            buildNode(metadataList.length - 2 - treeOffset, true);
        }

        return treeStructure;
    };

    return buildCausalityTree();
};

*/
