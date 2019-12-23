//! webpack配置文件
const path = require('path'); // node遵循 CommonJS规范 
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyrightWebpackPlugin = require("./plugin/copyright-webpack-plugin");
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        port: 8080,
        hot: true, // 在运行过程中，替换、添加或删除模块，而无需重新加载整个页面（css支持好，js支持不完整）
        // hotOnly: true, // 强制浏览器不会刷新，哪怕你的HMR没有生效
        proxy: {
            "/api": {
                target: "http://localhost:9000"
            }
        },
    },
    // webpack构建入口 str || [] || obj
    // entry: './src/index.js', 相当于：entry: {main: './src/index.js'}
    // entry: ['./src/index.js', './src/other.js'], 会合并成一个文件
    // 打包入口文件
    // entry: { // 多入口
    //     main: "./test/loader.test.js",
    //     // other: "./src/other.js"
    // },
    entry: ['./src/index.js'],
    // 打包输出文件
    output: { 
        // path: 绝对路径的字符串 ./dist相对于本文件的相对路径
        path: path.resolve(__dirname, './dist'),
        // ! name是占位符，使文件名称不重复
        filename: '[name].js', // 对应多入口文件，输出文件的名称
    },
    // 打包的模式 production：生产 development开发 none 无优化
    mode: 'development',
    devtool: 'source-map', // 报错会定位到源代码的位置
    // 模块处理
    module: { 
        rules: [
            // {
            //     test: /\.css$/, // 指定匹配规则
            //     use: [
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' }
            //     ]
            // },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './src/replaceLoaderAsync.js'),
                        options: {
                            name: '刘慧'
                        }
                    },
                    {
                        loader: path.resolve(__dirname, "./src/replaceLoader.js"),
                        options: {
                            name: "开课吧" 
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 从右到左或从下至上执行loader
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         [
                    //             '@babel/preset-env',
                    //             {
                    //                 targets: {
                    //                     edge: '17',
                    //                     firefox: '60',
                    //                     chrome: '67',
                    //                     safari: '11.1'
                    //                 },
                    //                 corejs: 2, // 新版本需要指定核心库版本
                    //                 useBuiltIns: 'usage' // 按需注入
                    //             }
                    //         ]
                    //     ]
                    // }
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new htmlWebpackPlugin({
            title: 'webpack project',
            filename: 'index.html',
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyrightWebpackPlugin({
            name: '开课吧-刘慧'
        })
    ]
}