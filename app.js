
const express = require('express');
const path = require('path');
const createError = require('http-errors');
require('dotenv').config();

const cardRouter = require('.routes/card.router')
const userRouter = require('./routes/user.router');
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/card', cardRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});

