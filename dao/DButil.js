const mysql = require('mysql')

function createConnect () {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'yf@123456',
        database: 'my_blog'
    })
    return connection
}

module.exports.createConnect = createConnect