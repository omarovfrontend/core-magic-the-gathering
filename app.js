const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const createError = require('http-errors');
const logger = require('morgan');
require('dotenv').config();


const cardRouter = require('./routes/card.router');
const userRouter = require('./routes/user.router');
const mainRouter = require('./routes/main');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(
  session({
	 store: new FileStore(),
    secret: 'secretword',
    resave: false,
    saveUninitialized: false,
    name: 'mtg',
    cookie: { httpOnly: true },
  }),
);

app.use((req, res, next) => {
	res.locals.userId = req.session?.userId;
	res.locals.userName = req.session?.userName;
	next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(process.env.PWD, 'public')));

app.use('/user', userRouter);
app.use('/card', cardRouter);
app.use('/', mainRouter);

app.use((req, res, next) => {
	const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
	next(error);
 });

 app.use(function (err, req, res, next) {
	// Получаем текущий ражим работы приложения.
	const appMode = req.app.get('env');
	// Создаём объект, в котором будет храниться ошибка.
	let error;
	// Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
	if (appMode === 'development') {
	  error = err;
	} else {
	  error = {};
	}
	// Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
	res.locals.message = err.message;
	res.locals.error = error;
	// Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
	res.status(err.status || 500);
	// Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
	res.render('error');
 });

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
