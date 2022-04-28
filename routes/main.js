const router = require('express').Router();
const { Card } = require('../db/models');

router.route('/')
.get(async (req, res) => {
	let cards;
	try {
		cards = await Card.findAll({order:[['id', 'DESC']]});
	} catch (error) {
		return res.render('error', {
			message: 'Не удалось загрузить карты',
			error: {}
		});
	}
return res.render('main', { cards });
});


module.exports = router;