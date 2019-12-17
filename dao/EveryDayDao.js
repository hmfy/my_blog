const {createConnect} = require('./DButil')

function insertEveryDay (content, ctime, success) {
    const insertSql = `insert into every_day (content, ctime) values (?, ?) `
    const params = [content, ctime]

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

function queryEveryDay (success) {
    const querySql = `select * from every_day order by id desc limit 1 `
    const params = []

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

module.exports.insertEveryDay = insertEveryDay
module.exports.queryEveryDay = queryEveryDay
