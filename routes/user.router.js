const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const saltRounds = 5;

router
  .route('/signup')
  .get((req, res) => {
    //res.render('signUp');
    res.send('123');
  })
  .post(async (req, res) => {
    const { name, email, password, city_id } = req.body;
    const hashPass = bcrypt.hashSync(password, saltRounds);
    const currentUser = await User.create({
      nickname: name,
      email: email,
      password: hashPass,
      city_id: city_id,
    });
    req.session.userId = currentUser.id; // для того, чтобы была сразу авторизация
    req.session.lifestyle = currentUser.lifestyle;
    res.redirect('/');
  });

// router
//   .route('/signin')
//   .get((req, res) => {
//     res.render('signIn');
//   })
//   .post(async (req, res) => {
//     const { nickName, password } = req.body;
//     const user = await User.findOne({ where: { name: nickName } });
//     const result = await bcrypt.compare(password, user.password); // сравниваем пароли
//     if (result) {
//       req.session.userId = user.id;
//       req.session.lifestyle = user.lifestyle;
//       res.redirect('/');
//     } else {
//       res.redirect('/user/signup');
//     }
//   });

// router.get('/rap', rapCheck, (req, res) => {
//   res.send('YA RONIAY ZAPAD');
// });

// router.get('/rock', rockCheck, (req, res) => {
//   res.send('TZOY ZHIV');
// });

// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.clearCookie('sid');
//   res.redirect('/');
// });

module.exports = router;
