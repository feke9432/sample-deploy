/*
 * @Author: your name
 * @Date: 2020-05-20 16:51:22
 * @LastEditTime: 2020-05-21 10:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sample-deploy\src\connect\index.js
 */ 
const node_ssh = require('node-ssh')
const compressedTypeMap = require('../compressed/compressedTypeMap')
const {Log} = require('../utils')
const projectDir = process.cwd()

module.exports = async function connect(config) {
  const ssh = new node_ssh()
  const compressType = config.compressType
  const { path, dirName } = config.remote
  const zipFileName = `${dirName}.${compressType}`

  try {
    await ssh.connect(config.servers)
    Log('链接成功!')

    let uploadPath = projectDir + `\\${zipFileName}`

    Log('上传路径' + uploadPath)

    await ssh.putFile(uploadPath, path + zipFileName)

    Log('文件上传成功')

    await ssh.execCommand(`rm -rf ${dirName}`, { cwd: path })

    Log('删除远程目录成功')

    const unZipScript = compressedTypeMap[compressType]? compressedTypeMap[compressType].unZipScript : compressedTypeMap['tar'].unZipScript
    if (!compressedTypeMap[compressType]) {
      let typeStr = ''
      for(let key in compressedTypeMap) {
        typeStr += key + '\n'
      }
      Log(`compressType 参数不在可选列表：\n ${typeStr} 采用默认方式：tar 解压`)
    }
    await ssh.execCommand(`${unZipScript} ${zipFileName}`, { cwd: path })

    Log('文件解压成功')

    await ssh.execCommand(`rm -f ${zipFileName}`, { cwd: path })

    Log('删除远程文件')
  } catch (error) {
    throw error
  }
}