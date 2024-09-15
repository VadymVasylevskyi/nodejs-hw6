import express from 'express';
import db from './db.cjs'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.status(200).send('Hello, World!');
  } catch (error) {
    res.status(500).send('Что-то пошло не так');
  }
});

app.post('/reg', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).send('Ошибка: данные не были отправлены');
  } else {
    res.status(200).json({
      message: 'Данные успешно получены',
      receivedData: data,
    });
  }
});



app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.json(results);
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .send('Пожалуйста, предоставьте имя и цену продукта.');
  }

  const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(query, [name, price], (err, result) => {
    if (err) {
      console.error('Ошибка при добавлении продукта:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.send('Продукт успешно добавлен!');
    }
  });
});

app.use((req, res, next) => {
    res.status(404).send('Маршрут не найден');
    
  });

app.listen(3000, 'localhost', () => {
  console.log('Server is runnig on 3000 port');
});
