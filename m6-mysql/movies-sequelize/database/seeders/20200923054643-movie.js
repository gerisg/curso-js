'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('movies', [
      {title:"Avatar",rating:7.4,awards:5,length:240,release_date:"2018-10-10 20:17:19",genre_id:1},
      {title:"Titanic",rating:7.2,awards:5,length:320,release_date:"2015-09-08 22:08:54",genre_id:2},
      {title:"La Guerra de las galaxias: Episodio VI",rating:6.2,awards:10,length:130,release_date:"2018-12-15 20:44:02",genre_id:3},
      {title:"La Guerra de las galaxias: Episodio VII",rating:10.0,awards:5,length:270,release_date:"2018-08-11 13:08:04",genre_id:4},
      {title:"Parque Jurasico",rating:1.9,awards:null,length:130,release_date:"2016-01-15 21:51:55",genre_id:5},
      {title:"Harry Potter y las Reliquias de la Muerte",rating:1.9,awards:5,length:150,release_date:"2018-12-16 08:07:22",genre_id:6},
      {title:"Transformers: el lado oscuro de la luna",rating:2.0,awards:null,length:270,release_date:"2019-05-25 04:17:30",genre_id:7},
      {title:"Harry Potter y la piedra filosofal",rating:2.1,awards:null,length:190,release_date:"2017-05-25 02:54:48",genre_id:8},
      {title:"Harry Potter Editada",rating:4.6,awards:null,length:180,release_date:"2019-12-01 04:38:52",genre_id:9},
      {title:"El rey león",rating:7.7,awards:null,length:190,release_date:"2016-02-02 09:34:30",genre_id:10},
      {title:"Alicia en el país de las maravillas",rating:7.7,awards:5,length:240,release_date:"2017-10-30 23:51:29",genre_id:1},
      {title:"Buscando a Nemo",rating:3.1,awards:null,length:320,release_date:"2018-05-08 12:42:20",genre_id:2},
      {title:"Toy Story",rating:2.2,awards:7,length:150,release_date:"2016-09-29 03:52:32",genre_id:3},
      {title:"Toy Story 2",rating:4.3,awards:4,length:130,release_date:"2015-02-22 19:25:17",genre_id:4},
      {title:"La vida es bella",rating:6.9,awards:8,length:150,release_date:"2018-08-06 01:23:07",genre_id:5},
      {title:"Mi pobre angelito",rating:2.7,awards:null,length:190,release_date:"2018-09-13 17:28:37",genre_id:6},
      {title:"Intensamente",rating:7.2,awards:7,length:130,release_date:"2016-07-25 21:14:31",genre_id:7},
      {title:"Carrozas de fuego",rating:2.0,awards:6,length:240,release_date:"2017-09-18 20:13:48",genre_id:8},
      {title:"Big",rating:8.4,awards:5,length:180,release_date:"2018-04-30 22:42:42",genre_id:9},
      {title:"I am Sam",rating:3.9,awards:8,length:240,release_date:"2018-02-07 00:30:20",genre_id:10}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('movies', null, {});
  }
};