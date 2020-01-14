import promise, { SimpleGit } from 'simple-git/promise';

export const truncate = (str: string, num: number) => {
    if (str.length <= num) {
        return str
    }
    return  `...${str.slice(num, str.length)}`
}

export const parseStatus = (workingDir?: string) => {
    const git = promise(workingDir);
    const parsedData = git.status()
    return parsedData
}