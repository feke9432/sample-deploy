const defaultConfig = require('../../default.config.json')

const fs = require('fs')

const {Log} = require('../utils')

const projectDir = process.cwd()

function mergeConfig(defaultConfig) {
  Log('混合配置...')

  let outConfig = getOutConfig()
  let _config = outConfig ? Object.assign(defaultConfig, outConfig) : defaultConfig

  return _config
}

function getOutConfig() {
  try {
    let outConfig = JSON.parse(fs.readFileSync(`${projectDir}/deploy.config.json`,'utf-8'))
    return outConfig
  } catch (error) {
    Log('没有读取到本地配置')
    return {}
  }
}

let config = mergeConfig(defaultConfig)

module.exports = config