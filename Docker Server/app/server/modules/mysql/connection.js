const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'ir',
    password: 'irpass',
    database: 'ir_project'
});

module.exports = connection;

