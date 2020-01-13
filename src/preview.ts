import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import * as webpackMerge from 'webpack-merge';
import webpackConfig from './webpack-config';
import options from './options';

export function exec() {
    const config = webpackMerge(webpackConfig, {
        mode: 'development',
        output: {
            filename: 'js/[name].js'
        }
    });

    const server = new webpackDevServer(webpack(webpackConfig), {
        contentBase: options.distPath,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        overlay: true,
        stats: 'errors-only'
    });
}
