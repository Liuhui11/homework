const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");


const glob = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'));
    entryFiles.map((item, index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/pages\/(.*)\/index\.js$/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                title: pageName,
                template: path.join(__dirname, `src/pages/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true
            })
        );
    });
    return {
        entry,
        htmlWebpackPlugins
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

// 配置：https://webpack.docschina.org/configuration/ 
module.exports = {
    mode: 'development',
    // devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        // open: true,
        // openPage: 'test.html',
        port: 8080,
        proxy: {
            // '/api': {
            //     target: 'http://localhost:9002' // 代理的目标服务器地址 /api/info -> http://localhost:8080/api/info
            // }
            '/api': {
                target: 'http://localhost:9002',
                pathRewrite: {'^/api': ''}
            }
        },
        hot: true,
        // hotOnly: true // 热更新浏览器也不刷新页面
    },
    entry,
    // entry: {
    //     index: './src/index.js',
    //     other: './src/other.js'
    // },
    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: '[name].[hash].js'
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('sass'),
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presents: ['@babel/present-env']
                    // }
                }
            }
        ]
    },
    plugins: [
        ...htmlWebpackPlugins,
        // new htmlWebpackPlugin({
        //     title: 'test page',
        //     filename: 'test.html',
        //     template: 'index.html'
        // }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}