# sample-deploy
nodejs 写的部署脚本

## 参考

[前端轻量化部署脚手架实践](https://juejin.im/post/5e1bfbadf265da3e3077005e)

## 使用方法

1. 下载
2. 编写配置文件

请在根目录下生成 `deploy.config.json` 文件，填入内容：

```
{
  "servers": {
    "host": "", // 服务器地址
    "username": "", // 用户名
    "password": "" // 登录密码
    // "privateKey": "" // 同样你可以使用更安全的密匙登录
  },
  "build": {
    "script": "npm run build:t", // 打包命令
    "pathName": "dist" // 打包生成的包目录
  },
  "remote": {
    "path": "/var/www/", // 远程路径
    "dirName": "dist" // 远程目录名
  }
}
```
3. `packange.json` 中添加命令

```
"scripts": {
  ...
  "deploy": "node node_modules/sample-deploy"
},
```

4. 需要部署时 运行命令 `npm run deploy` :)