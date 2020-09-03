'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      this.hasMany(models.movie, { foreignKey: 'genre_id' });
    }
  };
  Genre.init({
    name: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'genre'
  });
  return Genre;
};