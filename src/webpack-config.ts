import * as path from 'path';
import * as webpack from 'webpack';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import options from './options';

const webpackConfig: webpack.Configuration = {
    entry: {
        app: path.join(options.compilePath, 'index.js'),
        vender: [
            'chowa',
            'react',
            'react-dom',
            'react-router-dom',
            'prop-types',
            'classnames',
            'react-copy-to-clipboard',
            'prismjs',
            'moment',
            'react-dnd-html5-backend',
            'resize-observer-polyfill'
        ]
    },
    output: {
        path: options.distPath,
        publicPath: './'
    },
    stats: {
        colors: true,
        chunks: false,
        errorDetails: true,
        timings: true,
        children: false
    },
    resolve: {
        alias: {
            '@': options.compilePath
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            'targets': {
                                'browsers': ['last 2 versions', 'safari >= 7']
                            },
                            'modules': false
                        }],
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-dynamic-import',
                        ['chowa-import', { style: 'css' }]
                    ]
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: options.themeFile
                                ? `@import '${options.themeFile}';`
                                : null
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'iconfonts/[name].[ext]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:5].css',
            chunkFilename: '[id].css',
            ignoreOrder: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(options.compilePath, 'index.html'),
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(options.root, 'assets'),
                to: path.join(options.compilePath, 'assets')
            },
            {
                from: options.faviconFile
                    ? options.faviconFile
                    : path.join(__dirname, '../favicon.ico'),
                to: path.join(options.distPath)
            },
            {
                from: options.logoFile
                    ? options.logoFile
                    : path.join(__dirname, '../logo.png'),
                to: path.join(options.distPath)
            }
        ])
    ]
};

export default webpackConfig;
