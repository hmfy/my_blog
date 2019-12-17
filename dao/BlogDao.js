const {createConnect} = require('./DButil');

function insertBlog (title, content, tags, views, ctime, utime, success) {
    const insertSql = `insert into blog (title, content, tags, views, ctime, utime) values (?, ?, ?, ?, ?, ?)`;
    const params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage (page, pageSize, success) {
    const querySql = `select * from blog order by id desc limit ?,?`;
    const params = [page * pageSize, pageSize];

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

function queryBlogById (bid, success) {
    const querySql = `select * from blog where id = ?`;
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

function queryBlogCount (success) {
    const querySql = `select count(1) as count from blog`;

    const params = [];

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

function queryAllBlog (success) {
    const querySql = `select * from blog`;

    const params = [];

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
    insertBlog,
    queryBlogByPage,
    queryBlogCount,
    queryBlogById,
    queryAllBlog
};
