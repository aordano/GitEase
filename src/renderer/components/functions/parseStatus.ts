import React from "react"

import promise, { SimpleGit } from 'simple-git/promise';

export const parseStatus = (workingDir?: string) => {
    const git = promise(workingDir);
    const parsedData = git.status()
    return parsedData
}