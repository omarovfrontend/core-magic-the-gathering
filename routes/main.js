const router = require('express').Router();
const { Card, City, Quality } = require('../db/models');

// router.route('/').get((req, res) => {
// 	res.render('main');
// })

router.route('/')
.get(async (req, res) => {
	let cards;
	try {
		cards = await Card.findAll({include: [{ model: City}, {model: Quality}], order:[['id', 'DESC']], raw: true});
		cards = cards.map((el) => ({...el, flag: (el.user_id === req.session?.userId)}))
		// console.log(cards)
	} catch (error) {
		return res.render('error', {
			message: 'Не удалось загрузить карты',
			error: {}
		});
	}
	// console.log(res.locals.userId)
return res.render('main', { cards });
})
// .post((req, res) => {
// 	const { findCityInput, findSelectInput} = req.body;
	
// 	let cards;
// 	try {
// 		cards = 
// 	}
// })


module.exports = router;