'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Card}) {
      this.hasMany(User, {foreignKey: 'city_id'})
		this.hasMany(Card, {foreignKey: 'city_id'})
    }
  }
  City.init({
    cityname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};