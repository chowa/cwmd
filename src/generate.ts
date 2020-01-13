import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as cwlog from 'chowa-log';
import webpackConfig from './webpack-config';

export function exec() {
    const config = webpackMerge(webpackConfig, {
        mode: 'production',
        output: {
            filename: 'js/[name].[hash:5].js'
        }
    });

    webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) {
            cwlog.error('Build error');
            console.error(err); // eslint-disable-line
            return;
        }

        console.info('Build success');
    });
}
