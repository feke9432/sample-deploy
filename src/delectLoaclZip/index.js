const runCommand = require('../runCommand')
const projectDir = process.cwd()

module.exports = function (config) {
  return runCommand(`del ${projectDir}\\${config.remote.dirName}.tar`)
}