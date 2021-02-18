const mysql = require('mysql2/promise');
const config = require('./config.json')

module.exports = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});