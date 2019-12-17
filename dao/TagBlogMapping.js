const {createConnect} = require('./DButil')

function insertTagBlogMapping (tagId, blogId, ctime, utime, success) {
    const insertSql = `insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?) `
    const params = [tagId, blogId, ctime, utime]

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

module.exports = {insertTagBlogMapping}