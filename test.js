const chalk = require('chalk');
function tips() {
  console.log(chalk.green(`
  使用提示:

  支持参数：

      keepZip  =>  保留本地压缩包
      production  =>  保留本地压缩包，并且不上传服务器
  
  使用方法：

  如命令为 npm run deploy
  添加参数 npm run deploy keepZip,production 可多个
  `))
}

tips()