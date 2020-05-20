const runCommand = require('./src/runCommand')
const config = require('./src/getConfig')
const compress = require('./src/compressed')
const connectAndUpload = require('./src/connect')
const { Log } = require('./src/utils')
const delectLoaclZip = require('./src/delectLoaclZip')

async function init() {
  try {
    // 用户打包
    await runCommand(config.local.script)
    Log('打包完成')

    await compress(config)
    Log('压缩完成')

    await connectAndUpload(config)

    await delectLoaclZip(config)
    Log('删除本地文件')
    process.exit()
  } catch (error) {
    delectLoaclZip(config).then(() => {
      process.exit(1)
    })
  }
}

init()
