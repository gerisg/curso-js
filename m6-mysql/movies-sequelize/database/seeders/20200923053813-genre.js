'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('genres', [
      { name:"Comedia", ranking:1, active:1 },
      { name:"Terror", ranking:2, active:1 },
      { name:"Drama", ranking:3, active:1 },
      { name:"Accion", ranking:4, active:1 },
      { name:"Ciencia Ficción", ranking:5, active:1 },
      { name:"Suspenso", ranking:6, active:1 },
      { name:"Animación", ranking:7, active:1 },
      { name:"Aventuras", ranking:8, active:1 },
      { name:"Infantiles", ranking:9, active:1 },
      { name:"Musical", ranking:10, active:1 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genres', null, {});
  }
};
