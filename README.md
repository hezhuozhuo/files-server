# README

## express框架官网

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

## pm2管理器官网

https://pm2.io/

## API
| url | 接口名称 | 请求方法 | 请求示例 |
| --- | --- | --- | --- |
| /files/delete | 删除文件接口 | DELETE | {"id":"xxx"} |
| /files/list | 文件列表接口(支持分页) | GET | ?current_page=1&&per_page=10 |
| /files/upload | 上传文件接口 | POST | (multipart/form-data)file |
| /files/download/{filename} | 文件下载 | GET |  |
| /files | 上传文件页面（web端测试） |  |  |

## vscode本地开发调试

- 安装依赖

    ```
    npm install
    ```

- 运行测试

    ```
    npm run test
    ```

- 启动项目（localhost:3000）

    ```
    npm run start
    ```

## 安装部署

### node.js 16.x(centos)

```bash
cd /usr/local/src/
wget https://nodejs.org/download/release/latest-v16.x/node-v16.18.0-linux-x64.tar.gz
tar zxvf node-v16.18.0-linux-x64.tar.gz
cd node-v16.18.0-linux-x64
ln -s /usr/local/src/node-v16.18.0-linux-x64/bin/node /usr/bin/node
ln -s /usr/local/src/node-v16.18.0-linux-x64/bin/npm /usr/bin/npm
ln -s /usr/local/src/node-v16.18.0-linux-x64/bin/npx /usr/bin/npx
npm config set registry https://registry.npm.taobao.org
```

### pm2安装

```
npm install pm2 -g
ln -s /usr/local/src/node-v16.18.0-linux-x64/bin/pm2 /usr/bin/pm2
pm2

```

### 运行项目

在项目当前目录执行：

```bash
pm2 start ./bin/www
```
