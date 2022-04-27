'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({City, User, Quality}) {
      this.belongsTo(City, {foreignKey: 'city_id'})
	   this.belongsTo(User, {foreignKey: 'user_id'})
	   this.belongsTo(Quality, {foreignKey: 'quality_id'})
    }
  }
  Card.init({
    cardname: DataTypes.STRING,
    img: DataTypes.TEXT,
    price: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    quality_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};