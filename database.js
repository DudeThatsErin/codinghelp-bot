const mysql = require('mysql2');
const config = require('./config/database.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
const promisePool = pool.promise();
module.exports = promisePool;