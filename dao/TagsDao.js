const {createConnect} = require('./DButil')

function insertTag (tag, ctime, utime, success) {
    const insertSql = `insert into tags (tag, ctime, utime) values (?, ?, ?) `
    const params = [tag, ctime, utime]

    const sql = createConnect()
    sql.connect()
    sql.query(insertSql, params, (err, result) => {
        if(err == null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    sql.end()
}

function queryTag (tag, success) {
    const querySql = `select * from tags where tag = ?`
    const params = [tag]

    const sql = createConnect()
    sql.connect()
    sql.query(querySql, params, (err, result) => {
        if(err == null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    sql.end()
}

module.exports = {insertTag, queryTag}