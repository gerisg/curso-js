let { genre, movie }   = require('../database/models');

let moviesController = {
    create: (req, res) => {
        genre.findAll()
            .then(genres => res.render('movies/create', { genres }))
            .catch(error => res.render('error', error))
    },
    save: (req, res) => {
        movie.create({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.releaseDate,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating,
        })
            .then(() => res.redirect('/movies'))
            .catch(error => res.render('error', error))
    },
    list: (req, res) => {
        movie.findAll()
            .then(movies => res.render('movies/list', { movies }))
            .catch(error => res.render('error', error))
    },
    detail: (req, res) => {
        movie.findByPk(req.params.id, { include: ['genre', 'actors'] })
            .then(movie => res.render('movies/detail', { movie }))
            .catch(error => res.render('error', error))
    },
    edit: (req, res) => {
        let moviePromise = movie.findByPk(req.params.id);
        let genresPromise = genre.findAll();
        Promise.all([moviePromise, genresPromise])
            .then(([movie, genres]) => { 
                console.log(JSON.stringify(movie)); 
                res.render('movies/edit', { movie, genres });
            });
    },
    update: (req, res) => {
        movie.update({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating,
        }, {
            where: { id: req.params.id }
        })
            .then(() => res.redirect('/movies/' + req.params.id))
            .catch(error => res.render('error', error))
    },
    delete: (req, res) => {
        movie.destroy({ where: { id: req.params.id }})
            .then(() => res.redirect('/movies'))
            .catch(error => res.render('error', error))
    },
}

module.exports = moviesController;