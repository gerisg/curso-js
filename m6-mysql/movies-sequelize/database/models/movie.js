'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      this.belongsTo(models.genre, { foreignKey: 'genre_id' }),
      this.belongsToMany(models.actor, { through: 'actor_movie' })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    awards: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    release_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'movie',
  });
  return Movie;
};