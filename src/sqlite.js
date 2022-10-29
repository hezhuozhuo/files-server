const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./files_server.db');
module.exports.db = db;
db.serialize(() => {
    db.run("CREATE TABLE video (id TEXT PRIMARY KEY, name TEXT, path TEXT, size INTEGER, create_time TEXT)", function (err) {
        if (err) {
            console.log("create database error,", err.message);
        } else {
            console.log("create database success");
        }
    });

    // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    // for (let i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();

    // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    //     console.log(row.id + ": " + row.info);
    // });
});
//db.close();