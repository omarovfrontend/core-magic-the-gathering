const router = require('express').Router();
const { Card } = require('../db/models');

router.route('/')
.get((req, res) => {
 res.render('main');
});


module.exports = router;
