const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'tododb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à MySQL');
});

app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur lancé sur http://0.0.0.0:${PORT}`);
});