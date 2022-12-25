var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
const multer = require('multer');
var sqlite = require('../src/sqlite');
//import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
var FILES_DIR = path.join(process.cwd(), 'public/video/')
var cache = require("../src/cache").cache;
// 获取文件列表
router.get('/list', function (req, res, next) {
    var count = 0
    var s = cache.getCache("ListCount");
    if (s) {
        count = s
    } else {
        var sql_count = "SELECT count(1) as count FROM video"
        sqlite.db.get(sql_count, (err, row) => {
            if (err) {
                console.log(err.message);
                res.json({
                    code: '1000',
                    message: err.message,
                    data: {}
                });
            } else {
                count = row.count
                cache.addCache("ListCount", count, 600 * 1000)//缓存十分钟
            }
        })
    }
    var sql = "SELECT * FROM video "
    var per_page = 0
    var current_page = 0
    if (req.query.current_page === undefined || req.query.per_page === undefined) {
        var rows = cache.getCache("ListAll");
        if (s) {
            res.json({
                code: '200',
                message: '查询成功',
                data: rows,
                total: count,
                current_page: current_page,
                per_page: per_page
            });
            return
        } else {
            sql += "order by create_time desc"
        }
    } else {
        per_page = req.query.per_page
        current_page = req.query.current_page
        var offset = (current_page - 1) * per_page
        sql += "order by create_time desc limit " + current_page + " offset " + offset
    }
    sqlite.db.all(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            res.json({
                code: '1000',
                message: err.message,
                data: {}
            });
        } else {
            cache.addCache("ListAll", rows, 600 * 1000)//缓存十分钟
            console.log(rows);
            res.json({
                code: '200',
                message: '查询成功',
                data: rows,
                total: count,
                current_page: current_page,
                per_page: per_page
            });
        }
    });
});


//下载文件
// /files/* is accessed via req.params[0]
// but here we name it :file
router.get('/download/:file(*)', function (req, res, next) {
    console.log(FILES_DIR + req.params.file)
    res.download(FILES_DIR + req.params.file, req.params.file, function (err) {
        if (!err) return; // file sent
        if (err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
    });
});

// 上传文件页面
router.get('/', (req, res) => {
    res.send(
        `<!DOCTYPE html>
        <html>
        <body>
          <form action="files/upload" method="post" enctype="multipart/form-data">
            <h1>选择上传的文件</h1>  
            <input type="file" name="file">
            <input type="submit" value="上传">
          </form>
        </body>
        </html>`
    )
})

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, FILES_DIR);
        },
        filename: function (req, file, cb) {
            var time = moment(Date.now()).format('YYYYMMDD-HHmmss')
            var changedName = time.toString() + '-' + file.originalname;
            cb(null, changedName);
        }
    })
});

//文件上传
router.post('/upload', upload.array('file'), (req, res) => {
    console.log(req.files);
    let fileList = [];
    req.files.map((elem) => {
        // 存储
        const stmt = sqlite.db.prepare("INSERT INTO video VALUES (?,?,?,?,?)");
        stmt.run(uuidv4(), elem.filename, 'video/' + elem.filename, elem.size, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
        stmt.finalize();

        fileList.push({
            originalname: elem.originalname
        })
    });
    cache.delCache("ListAll")
    cache.delCache("ListCount")
    res.json({
        code: '200',
        message: '上传成功',
        data: { 'file_list': fileList }
    });

});

// 删除文件列表
router.delete('/delete', function (req, res, next) {
    let params = req.body.id;
    if (params) {
        sqlite.db.run("DELETE FROM video WHERE id = $id", {
            $id: params,
        }, (err) => {
            if (err) {
                console.log(err.message);
                res.json({
                    code: '1000',
                    message: err.message,
                    data: {}
                });
            } else {
                cache.delCache("ListAll")
                cache.delCache("ListCount")
                res.json({
                    code: '200',
                    message: '删除成功',
                    data: params
                });
            }
        });
    };
});


module.exports = router;