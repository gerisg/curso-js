'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('actors', [
      {first_name:"Tan",last_name:"McGaughie",rating:9.1},
      {first_name:"Oswald",last_name:"O' Concannon",rating:1.5},
      {first_name:"Benson",last_name:"Barnwill",rating:8.9},
      {first_name:"Launce",last_name:"Siddons",rating:1.2},
      {first_name:"Tybi",last_name:"Briscoe",rating:7.4},
      {first_name:"Aliza",last_name:"Newport",rating:1.3},
      {first_name:"Andris",last_name:"Buchett",rating:3.6},
      {first_name:"Seka",last_name:"Maxwaile",rating:7.7},
      {first_name:"Ethelbert",last_name:"Esmead",rating:9.4},
      {first_name:"Howey",last_name:"Ludovici",rating:5.1}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actors', null, {});
  }
};
