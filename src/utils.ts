import * as fs from 'fs';

export function exist(pathLike: string): boolean {
    return fs.existsSync(pathLike);
}

export function isDir(pathLike: string): boolean {
    return exist(pathLike) && fs.statSync(pathLike).isDirectory();
}

export function isFile(pathLike: string): boolean {
    return exist(pathLike) && fs.statSync(pathLike).isFile();
}
