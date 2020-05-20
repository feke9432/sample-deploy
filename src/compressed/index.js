const fs = require('fs')
const archiver = require('archiver')
const {Log, outProcess} = require('../utils')

const projectDir = process.cwd()

module.exports = function (config) {
  let { local, remote, compressType } = config

  return new Promise((rel, rej) => {
    const archive = archiver(compressType, {
      zlib: { level: 9 }
    }).on('error', err => {
      Log('压缩失败')
      Log(err)
      outProcess()
    })

    // 创建文件输出流
    const output = fs.createWriteStream(projectDir + `/${remote.dirName}.${compressType}`).on('close', err => {
      if (err) {
        Log(err)
        rej(err)
        return
      }
      rel()
      Log('完成压缩')
    })

    // 通过管道方法将输出流存档到文件
    archive.pipe(output)

    // 从subdir子目录追加内容并重命名
    archive.directory(local.pathName, remote.dirName)

    // 完成打包归档
    archive.finalize()
  })
}