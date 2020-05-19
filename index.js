const node_ssh = require('node-ssh')
const defaultConfig = require('./default.config.json')
const childProcess = require('child_process')
const process = require('process')

const outConfig = require('../../deploy.config.json')
const projectDir = process.cwd()

let config = mergeConfig(outConfig, defaultConfig)
console.log(projectDir)

init(config)

function mergeConfig(outConfig, defaultConfig) {
  console.log('混合配置...')

  let _config = outConfig ? Object.assign(defaultConfig, outConfig) : defaultConfig

  return _config
}

async function init(config) {
  let { build } = config
  await execBuild(build.script)

  await connect(config)

  process.exit(0)
}

function execBuild(script) {
  console.log('打包开始，工作目录：', projectDir)
  return new Promise((rel, rej) => {
    childProcess.exec(script, { cwd: projectDir, maxBuffer: 1000000 * 1024, timeout: 100000 }, function(err) {
      if (err) {
        rej(err)
        return
      }
      rel()
      console.log('打包成功')
    })
  }).catch(err => {
    console.log('打包失败')
    console.log(err)
    process.exit(1)
  })
}

async function connect(config) {
  const ssh = new node_ssh()
  const { path, dirName } = config.remote
  const remotePath = path

  try {
    await ssh.connect(config.servers)
    console.log('链接成功!')

    console.log('删除远程目录成功')
    await ssh.execCommand(`rm -rf ${dirName}`, { cwd: remotePath })

    console.log('远程路径' + remotePath)

    await ssh.putDirectory(projectDir + '\\' + config.build.pathName, remotePath + dirName)

    console.log('文件上传成功')
  } catch (error) {
    console.error('上传失败', ':', error)

    process.exit(1)
  }
}
