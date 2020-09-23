'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('actor_movie', [
      {"actor_id":4,"movie_id":18},
      {"actor_id":9,"movie_id":10},
      {"actor_id":8,"movie_id":1},
      {"actor_id":4,"movie_id":3},
      {"actor_id":5,"movie_id":16},
      {"actor_id":2,"movie_id":10},
      {"actor_id":6,"movie_id":12},
      {"actor_id":3,"movie_id":15},
      {"actor_id":5,"movie_id":20},
      {"actor_id":3,"movie_id":19},
      {"actor_id":3,"movie_id":16},
      {"actor_id":6,"movie_id":19},
      {"actor_id":3,"movie_id":7},
      {"actor_id":2,"movie_id":4},
      {"actor_id":1,"movie_id":16},
      {"actor_id":9,"movie_id":3},
      {"actor_id":1,"movie_id":17},
      {"actor_id":8,"movie_id":19},
      {"actor_id":1,"movie_id":11},
      {"actor_id":1,"movie_id":19},
      {"actor_id":7,"movie_id":1},
      {"actor_id":5,"movie_id":10},
      {"actor_id":10,"movie_id":13},
      {"actor_id":5,"movie_id":9},
      {"actor_id":10,"movie_id":1},
      {"actor_id":2,"movie_id":9},
      {"actor_id":8,"movie_id":8},
      {"actor_id":1,"movie_id":15},
      {"actor_id":7,"movie_id":16},
      {"actor_id":2,"movie_id":6},
      {"actor_id":5,"movie_id":18},
      {"actor_id":6,"movie_id":11},
      {"actor_id":2,"movie_id":7},
      {"actor_id":6,"movie_id":4},
      {"actor_id":8,"movie_id":16},
      {"actor_id":9,"movie_id":14},
      {"actor_id":4,"movie_id":9},
      {"actor_id":9,"movie_id":2},
      {"actor_id":1,"movie_id":5}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actor_movie', null, {});
  }
};
