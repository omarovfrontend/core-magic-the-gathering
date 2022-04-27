const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const userRouter = require('./routes/user.router');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secretword',
    resave: false,
    store: new FileStore(),
    saveUninitialized: true,
    name: 'mtg',
    cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
  }),
);

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
