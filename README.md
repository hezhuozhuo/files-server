# README

## express框架学习

http://expressjs.com/en/starter/installing.html

## node.js sqlite3包介绍

https://www.npmjs.com/package/sqlite3

## node.js sqlite3 API

https://github.com/TryGhost/node-sqlite3/wiki/API

## mocha官网（JavaScript测试框架）

https://mochajs.org/

## supertest（http测试包）

https://github.com/visionmedia/supertest

## sqlite3.exe工具使用手册

https://www.sqlite.org/cli.html

## sqlite参考文档

https://www.sqlite.org/doclist.html

## 文件上传中间件

https://expressjs.com/en/resources/middleware/multer.html

## API
| url | 接口名称 | 请求方法 | 请求示例 |
| --- | --- | --- | --- |
| /files/delete | 删除文件接口 | DELETE | {"id":"xxx"} |
| /files/list | 文件列表接口 | GET |  |
| /files/upload | 上传文件接口 | POST | (multipart/form-data)file |
| /files/download/{filename} | 文件下载 | GET |  |
| /files | 上传文件页面（web端测试） |  |  |
