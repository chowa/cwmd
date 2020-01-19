import watch from './watch';
import * as path from 'path';

watch(path.resolve(__dirname, '../dev-test'), (file) => {
    console.log(file);
});

setInterval(() => {}, 1 << 30);
