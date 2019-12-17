const {createConnect} = require('./DButil');

function insertComment (bid, parent, userName, email, content, ctime, utime, parentName, success) {
    const insertSql = `insert into comments (blog_id, parent, user_name, email, comments, ctime, utime, parent_name) values (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [bid, parent, userName, email, content, ctime, utime, parentName];

    const sql = createConnect();
    sql.connect();
    sql.query(insertSql, params, (err, result) => {
        if(err == null) {
            success(result)
        } else {
            console.log(err)
        }
    });
    sql.end()
}

function queryCommentsByBlogId (bid, success) {
    const querySql = `select * from comments where blog_id = ?`;
    const params = [bid];

    const sql = createConnect();
    sql.connect();
    sql.query(querySql, params, (err, result) => {
        if(err == null) {
            success(result)
        } else {
            console.log(err)
        }
    });
    sql.end()
}

module.exports = {
    insertComment,
    queryCommentsByBlogId
};
