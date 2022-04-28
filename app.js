const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const createError = require('http-errors');
require('dotenv').config();

const app = express();

const cardRouter = require('./routes/card.router');
const userRouter = require('./routes/user.router');
const indexRouter = require('./routes/index');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(
  session({
    secret: 'secretword',
    resave: false,
    store: new FileStore(),
    saveUninitialized: false,
    name: 'mtg',
    cookie: { httpOnly: true },
  }),
);

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.use('/user', userRouter);
app.use('/card', cardRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});