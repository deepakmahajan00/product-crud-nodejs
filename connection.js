const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_app'
})

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;