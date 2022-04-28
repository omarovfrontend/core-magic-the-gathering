'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Cities', [{
		cityname: "Москва",
		createdAt: new Date(),
		updatedAt: new Date(),
     },{
		cityname: "Санкт-Петербург",
		createdAt: new Date(),
		updatedAt: new Date(),
     },{
		cityname: "Тверь",
		createdAt: new Date(),
		updatedAt: new Date(),
     },{
		cityname: "Севастополь",
		createdAt: new Date(),
		updatedAt: new Date(),
     },{
		cityname: "Новосибирск",
		createdAt: new Date(),
		updatedAt: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Cities', null, {});

  }
};
