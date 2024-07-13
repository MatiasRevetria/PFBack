const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pf',
    port: 3306
});

connection.connect((error) => {
    if(error){
       return console.log(error);
    };
    console.log('Conectados');
});

module.exports = connection;