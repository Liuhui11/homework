//! webpack配置文件
const path = require('path'); // node遵循 CommonJS规范 
module.exports = {
    // webpack构建入口
    entry: './src/index.js',
    output: {
        // path: 绝对路径的字符串 ./dist相对于本文件的相对路径
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    // 打包的模式
    mode: 'production',
}