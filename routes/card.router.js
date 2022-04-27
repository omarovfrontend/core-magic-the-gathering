const express = require('express').Router();
const { Card } = require('../db/models');
const router = require('./user.router');

router.route('/lot')
.get((req, res) => {
	res.render('lot');
})
.post(async (req, res) => {
	try {
	const { cardNameInput, imgInput, priceInput, cityInput, qualityInput} = req.body;
   const newCard = await Card.create({
		cardname: cardNameInput,
		img: imgInput,
		price: priceInput,
		city_id: +cityInput,
		quality_id: qualityInput,
		user_id: req.session?.userId
	}, {returning: true, plain: true});
	return res.redirect(`/lot/${newCard.id}`);
} catch (error) {
	res.render('error', {
		message: 'Не удалось добавить новый лот.',
		error: {}
   });
}
return res.redirect(`/lot/${newCard.id}`);
});

router.route('/lot/:id')
.get(async (req, res) => { 
	let card;
	try {
		card = await Card.findOne({where:{id:req.params.id}});
	} catch (error) {
		return res.render('error', {
			message: 'Не удалось найти лот',
			error: {}
		});
	}
return res.render('lot', { card });
	})
	.put(async (req, res) => {
		let card;
		try {
			card = await Card.update({
			cardname: cardNameInput,
		   img: imgInput,
		   price: priceInput,
		   city_id: cityInput,
		   quality_id: qualityInput,
			}, {where: {id:req.params.id}, returning: true, plain: true});
		} catch (error) {
			return res.json({isUpdateSuccessful: false, errorMessage: 'Не удалось обновить лот'});
		}
		return res.json({ isUpdateSuccessful: true, cardID: card[1].id });
	})
   .delete(async (req, res) => {
		try {
			await Card.destroy({where:{id:req.params.id}});
		} catch (error) {
			return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось удалить лот'});
		}
		return res.json({ isUpdateSuccessful: true });
		});

router.get('/lot/:id/edit', async (req, res) => {
			let card = await Card.findOne({where:{id:req.params.id}});
			res.render('edit', { card });
		 });		
		 
module.exports = router;		


