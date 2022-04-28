const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const saltRounds = 5;

router
  .route('/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    const { name, email, password, user_city } = req.body;
    const hashPass = bcrypt.hashSync(password, saltRounds);
    const currentUser = await User.create({
      nickname: name,
      email: email,
      password: hashPass,
      city_id: user_city,
    });
    req.session.userId = currentUser.id; // для того, чтобы была сразу авторизация
	 req.session.userName = currentUser.nickname;
	 res.redirect('/');
  });

router
  .route('/signin')
  .get((req, res) => {
    res.render('signin');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    const result = await bcrypt.compare(password, user.password); // сравниваем пароли
    if (result) {
      req.session.userId = user.id;
		req.session.userName = user.nickname;
      res.redirect('/');
    } else {
      res.redirect('/user/signup');
    }
  });

  router.route('/logout')
.get((req, res) => {
	req.session.destroy();
	res.clearCookie('mtg');
	res.redirect('/');
});

module.exports = router;
