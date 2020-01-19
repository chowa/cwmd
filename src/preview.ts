import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackMerge from 'webpack-merge';
import * as cwlog from 'chowa-log';
import webpackConfig from './webpack-config';
import options from './options';

export function exec() {
    const config = webpackMerge(webpackConfig, {
        mode: 'development',
        output: {
            filename: 'js/[name].js'
        }
    });

    const server = new webpackDevServer(webpack(config), {
        contentBase: options.distPath,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        overlay: true,
        stats: 'errors-only'
    });

    server.listen(options.port, options.host, () => {
        cwlog.info(`Preview server has been started at ${options.host}:${options.port}`);
    });
}
