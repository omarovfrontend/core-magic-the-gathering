const express = require('express');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get('/', (req, res) => {
  res.render('main');
});

app.use((req, res) => {
  res.status(404).send('ooops!');
});

app.listen(PORT, () => {
  console.log('Server started at PORT', PORT);
});
