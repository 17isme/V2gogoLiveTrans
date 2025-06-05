const express = require('express');
const path = require('path');
const open = require('open');
const db = require('./db');
const { mkGif, start } = require('./server');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use('/sync', express.static(path.join(__dirname, '..', 'sync')));

app.get('/', (req, res) => {
  db.all('SELECT * FROM streams ORDER BY id', (err, rows) => {
    if (err) rows = [];
    res.render('index', { streams: rows });
  });
});

app.get('/add', (req, res) => {
  res.render('form', { stream: {} });
});

app.post('/add', (req, res) => {
  const { code, address, lon, lat } = req.body;
  db.run('INSERT INTO streams(code,address,lon,lat) VALUES(?,?,?,?)', [code, address, lon, lat], () => {
    res.redirect('/');
  });
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM streams WHERE id=?', [id], (err, row) => {
    res.render('form', { stream: row });
  });
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { code, address, lon, lat } = req.body;
  db.run('UPDATE streams SET code=?, address=?, lon=?, lat=? WHERE id=?', [code, address, lon, lat, id], () => {
    res.redirect('/');
  });
});

app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM streams WHERE id=?', [id], () => {
    res.redirect('/');
  });
});

const timer = start();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Web UI running on port ${port}`);
  open(`http://localhost:${port}`);
});
