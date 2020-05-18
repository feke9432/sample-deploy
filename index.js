const fs = require('fs')
const node_ssh = require('node-ssh')
const config = require('./default.config.json')
const childProcess = require('child_process');
const archiver  = require('archiver')

init(config)

async function init(config) {
  let {servers, build} = config

  // await execBuild(build.script)

  await makeZip(config)

  await connect(config)

  childProcess.execSync('del dist.zip')

  process.exit(0);
}

function execBuild(script) {
  console.log('打包开始')
  return new Promise((rel, rej) => {
    childProcess.execSync(script, {}, function () {
      rel()
      console.log('打包成功')
    });
  })
}

function makeZip(config) {
  let {build} = config
  const archive = archiver('zip', {
    zlib: { level: 9 },
  }).on('error', err => {
    throw err;
  });

  // 创建文件输出流
  const output = fs.createWriteStream(__dirname + '/dist.zip');

  // 通过管道方法将输出流存档到文件
  archive.pipe(output);

  // 从subdir子目录追加内容并重命名
  archive.directory(build.pathName, build.fileName);

  // 完成打包归档
  archive.finalize();
  console.log('完成打包')
}

async function connect(config) {
  const ssh = new node_ssh()
  const projectDir = process.cwd();
  const zipFileName  = 'dist.zip'
  const remotePath = '/var/www/' 

  try {
    await ssh.connect({
      host: config.servers.host,
      username: config.servers.username,
      password: config.servers.password
    })
    console.log('链接成功!')
  
    let path = projectDir + `\\${zipFileName}`
  
    console.log('上传路径' + path)
    console.log('远程路径' + remotePath)
    
    await ssh.putFile(path, remotePath + zipFileName)
    
    console.log("文件上传成功")

    await ssh.execCommand(`rm -rf buyer-production`, { cwd: remotePath })

    await ssh.execCommand(`unzip ${zipFileName}`, { cwd: remotePath })

    console.log("文件解压成功")

    await ssh.execCommand(`rm -f ${zipFileName}`, { cwd: remotePath })

    console.log("删除远程文件")
  } catch (error) {
    console.error('上传失败',':', error) 
    process.exit(0);
  }
}
