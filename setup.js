import db from './db.cjs'

const createTable = `
  CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
  )
`;

db.query(createTable, (err, result) => {
  if (err) {
    console.error('Ошибка при создании таблицы:', err);
  } else {
    console.log('Таблица products успешно создана или уже существует');
  }
  db.end();
})