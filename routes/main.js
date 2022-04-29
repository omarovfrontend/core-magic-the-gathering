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


router.post('/search', async (req, res) => {
	const { findNameInput, findSelectInput} = req.body;
	let filterCards;
	try {
		if (!findNameInput) {
			filterCards = await Card.findAll({ where: { city_id: findSelectInput }, order:[['id', 'DESC']], raw: true})
		}
		if (findNameInput) {
			filterCards = await Card.findAll({where: {cardname: findNameInput, city_id: findSelectInput}, order:[['id', 'DESC']], raw: true})
		}
	} catch (error) {
		return res.render('error', {
			message: 'Поиск завершился ошибкой',
			error: {}
		});
	}
	console.log({ filterCards })
	return res.render('search', { filterCards })
});

router.get('/search', (req, res) => {
	res.render('search')
}  );

module.exports = router;