'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardname: {
			allowNull: false,
        type: Sequelize.STRING
      },
      img: {
			allowNull: false,
        type: Sequelize.TEXT
      },
      price: {
			allowNull: false,
        type: Sequelize.STRING
      },
      city_id: {
			allowNull: false,
        type: Sequelize.INTEGER,
		  references: {
			model: 'Cities',
			key: 'id',
		},
      },
      quality_id: {
			allowNull: false,
        type: Sequelize.INTEGER,
		  references: {
			model: 'Qualities',
			key: 'id',
		},
      },
      user_id: {
			allowNull: false,
        type: Sequelize.INTEGER,
		  references: {
			model: 'Users',
			key: 'id',
		},
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};