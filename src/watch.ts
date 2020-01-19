import * as fs from 'fs';
import * as path from 'path';
import * as utils from './utils';

export type Watch = 'modify' | 'delete' | 'create';

export interface WatchCb {
    type: Watch;
    pathLike: string;
    file: boolean;
}

function watch(dir: string, cb: (params: WatchCb) => void) {
    if (!utils.isDir(dir)) {
        return;
    }

    fs.readdirSync(dir).forEach((childDir) => {
        watch(path.join(dir, childDir), cb);
    });

    fs.watch(dir, { encoding: 'utf8'}, (e, name) => {
        const pathLike = path.join(dir, name);
        const file = utils.isFile(pathLike);
        let type: Watch = 'modify';

        if (e === 'rename') {
            type = utils.exist(pathLike) ? 'create' : 'delete';
        }

        if (file && path.parse(pathLike).ext.toLowerCase() !== '.md') {
            return;
        }


        cb({ type, file, pathLike });
    });
}

export default watch;
