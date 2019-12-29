// const loaderUtils = require('loader-utils');
// module.exports = function(source) {
//     const options = loaderUtils.getOptions(this);
//     console.log('---------', source, '--------');
//     // source 要处理文件的源码
//     /*
//      * this 配置文件 
//      this.query 配置文件传递过来的参数
//      */
//     return source.replace('kkb','开课吧')
// };


const { getOptions } = require('loader-utils');
const fs = require('fs');

module.exports = function (source) {
  const options = getOptions(this);
  const { style } = options;
  // 读取样式文件，返回字符串
  const string = fs.readFileSync(style);
  // 合并到原始文件，返回给下一个loader
  source += string;
  console.log(source.replace('px', 'rem'), '------')

  return source;
};