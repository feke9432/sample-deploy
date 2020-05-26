const runCommand = require('./runCommand')
const config = require('./getConfig')
const compress = require('./compressed')
const connectAndUpload = require('./connect')
const { Log } = require('./utils')
const delectLoaclZip = require('./delectLoaclZip')

async function init(opts) {
  try {
    let {keepZip, production} = opts
    // 用户打包
    await runCommand(config.local.script)
    Log('打包完成')

    await compress(config)
    Log('压缩完成')

    if (!production) {
      await connectAndUpload(config)
    }

    if (!keepZip && !production) {
      await delectLoaclZip(config)
      Log('删除本地文件')
    }
    process.exit()
  } catch (error) {
    delectLoaclZip(config).then(() => {
      process.exit(1)
    })
  }
}

module.exports = init
