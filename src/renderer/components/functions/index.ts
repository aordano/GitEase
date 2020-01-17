import promise, { SimpleGit } from 'simple-git/promise';

export const truncate = (path: string, num: number) => {
    if (path.length <= num) {
        return path
    }
    const topFolders = path.slice(0,path.slice(path.indexOf("/"),path.lastIndexOf("/")).lastIndexOf("/")-1)
    const fileName = path.slice(path.lastIndexOf("/"),path.length)
    return  `${topFolders} ... ${fileName}`
}

export const parseStatus = (workingDir?: string) => {
    const git = promise(workingDir);
    const parsedData = git.status()
    return parsedData
}

export const stageFile = (file: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.add(file)
}

export const unstageFile = (file: string, workingDir?: string) => {
    const git = promise(workingDir);
    git.reset(["--",file])
}