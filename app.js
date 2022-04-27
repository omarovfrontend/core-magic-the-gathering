const express = require('express');
const path = require('path');
const userRouter = require('./routes/user.router');
const PORT = 3000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

app.use(express());

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
