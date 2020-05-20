const childProcess = require('child_process')
const {Log, outProcess} = require('../utils')
const projectDir = process.cwd()

module.exports = function (script) {
  return new Promise((rel, rej) => {
    childProcess.exec(script, { cwd: projectDir, maxBuffer: 100000 * 1024, timeout: 100000 }, function(err) {
      if (err) {
        rej(err)
        return
      }
      rel()
    })
  }).catch(err => {
    Log(`执行：${script},失败`)
    Log(err)
    outProcess()
  })
}