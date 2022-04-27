'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Card}) {
      this.hasMany(Card, {foreignKey: 'quality_id'})
    }
  }
  Quality.init({
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quality',
  });
  return Quality;
};