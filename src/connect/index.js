const node_ssh = require('node-ssh')
const projectDir = process.cwd()

module.exports = async function connect(config) {
  const ssh = new node_ssh()
  const compressType = config.compressType
  const { path, dirName } = config.remote
  const zipFileName = `${dirName}.${compressType}`

  try {
    await ssh.connect(config.servers)
    console.log('链接成功!')

    let uploadPath = projectDir + `\\${zipFileName}`

    console.log('上传路径' + uploadPath)

    await ssh.putFile(uploadPath, path + zipFileName)

    console.log('文件上传成功')

    await ssh.execCommand(`rm -rf ${dirName}`, { cwd: path })

    console.log('删除远程目录成功')

    await ssh.execCommand(`tar -xvf ${zipFileName}`, { cwd: path })

    console.log('文件解压成功')

    await ssh.execCommand(`rm -f ${zipFileName}`, { cwd: path })

    console.log('删除远程文件')
  } catch (error) {
    throw error
  }
}