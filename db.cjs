// import mysql from 'mysql2'

const mysql=require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'product_db',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.stack);
    return;
  }
  console.log('Подключение успешно установлено)');
});

module.exports = connection;
