const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    port: process.env.DB_PORT
});

connection.connect((error) => {
    if(error){
       return console.log(error);
    };
    console.log('Conectados');
});

module.exports = connection;