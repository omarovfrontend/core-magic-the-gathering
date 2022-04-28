'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Qualities', [{
     condition: 'Новая',
     createdAt: new Date(),
	  updatedAt: new Date(),
     }, {
		condition: 'Как новая',
		createdAt: new Date(),
		updatedAt: new Date(),
		}, {
			condition: 'Хорошая',
			createdAt: new Date(),
			updatedAt: new Date(),
			}, {
				condition: 'Изношенная',
				createdAt: new Date(),
				updatedAt: new Date(),
				}], {});

  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Qualities', null, {});

  }
};
