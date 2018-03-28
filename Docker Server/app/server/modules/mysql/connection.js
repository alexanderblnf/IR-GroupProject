const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'ir',
    password: 'r5g4XsfNLpU4zuFq',
    database: 'ir_project'
});

module.exports = connection;

