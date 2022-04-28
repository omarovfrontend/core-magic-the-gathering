const router = require('express').Router();
const { Card } = require('../db/models');

router.route('/')
.get(async (req, res) => {
	try {
		cards = await Card.findAll({order:[['id', 'DESC']]});
	} catch (error) {
		return res.render('error', {
			message: 'Не удалось загрузить карты',
			error: {}
		});
	}
return res.render('index', { cards });
});


module.exports = router;