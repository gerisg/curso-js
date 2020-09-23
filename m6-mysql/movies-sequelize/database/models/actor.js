'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      this.belongsToMany(models.movie, { through: 'actor_movie' });
    }
  };
  Actor.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    rating: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'actor'
  });
  return Actor;
};