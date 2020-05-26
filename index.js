const chalk = require('chalk');
const init = require('./src')

function GetOption() {
    let opts = {
        keepZip: false,
        production: false
    }
    let argvs = process.argv

    if (argvs.length > 2) {
        tips()
    }
    
    let i = argvs.length
    while(i > 0) {
        for(let j in opts) {
            let reg = new RegExp(`\=?${j}\\b`)
            if (reg.test(argvs[i])) {
                opts[j] = true
            }
        }   
        i --
    }
    return opts
}

function tips() {
    console.log(chalk.green(`
    使用提示:

    支持参数：

        keepZip  =>  保留本地压缩包
        production  =>  保留本地压缩包，并且不上传服务器
    
    使用方法：

    如命令为 npm run deploy
    添加参数 npm run deploy args=keepZip,production 可多个
    `))
}
init(GetOption())
  