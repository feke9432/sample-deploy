const { program } = require('commander');
const init = require('./src')

program
  .option('-z, --keepZip', '保留压缩文件')
  .option('-p, --production', '生产模式，保留压缩文件，并不上传')

function GetOption(program) {
    let opts = {
        keepZip: false,
        production: false
    }
    if (program.keepZip) {
        opts.keepZip = true
    }

    if (program.production) {
        opts.production = true
    }
}

init(GetOption(program))
  