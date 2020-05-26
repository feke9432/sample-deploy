<!--
 * @Author: your name
 * @Date: 2020-05-18 13:39:55
 * @LastEditTime: 2020-05-21 11:16:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \sample-deploy\README.md
--> 
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
  "compressType": "tar", // 打包类型
  "local": {
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

4. 需要部署时 运行命令 `npm run deploy ` :)

## 议问

1. 直接使用 密码是不是不好，最好使用密匙

## 待实现功能

1. 测试环境和正式环境分开

3. 找出最合适的压缩文件格式，自动判断服务器是否支持此格式，不支持则选择最优的

4. 支持直接目录上传

5. 通过指令跳过打包阶段，直接上传

6. 显示正在打包状态，显示打包时间

2. 单元测试