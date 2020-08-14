const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const jsonTable = require('../database/jsonTable');
const usersModel = jsonTable('users');

module.exports = {
    index: (req, res) => {
        res.render('users/index',  { users: usersModel.all() });
    },
    create: (req, res) => {
        res.render('users/create');
    },
    store: (req, res) => {
        let user = req.body;
        // Guardar password encriptado
        user.password = bcrypt.hashSync(user.password, 10);
        user.image = req.file ? req.file.filename : null;
        res.redirect('/users/' + usersModel.create(user))
    },
    edit: (req, res) => {
        let user = usersModel.find(req.params.id);
        res.render('users/edit', { user });
    },
    update: (req, res) => {
        let user = req.body;
        user.id = req.params.id;
        user.password = user.password ? bcrypt.hashSync(user.password, 10) : user.currentPass;
        delete user.currentPass;
        user.image = req.file ? req.file.filename : req.body.currentImage;
        delete user.currentImage;
        res.redirect('/users/' + usersModel.update(user));
    },
    show: (req, res) => {
        let user = usersModel.find(req.params.id);
        res.render('users/detail', { user });
    },
    destroy: (req, res) => {
        /* remove image */
        let user = usersModel.find(req.params.id);
        const imagePath = path.join(__dirname, '../public/img/users/' + user.image);
        if(fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        /* destroy register */
        usersModel.delete(req.params.id);
        res.redirect('/users');
    },
    search: (req, res) => {
        let searchTerms = req.query.search;
        let users = usersModel.findByFields(['firstname', 'lastname', 'email'], searchTerms);
        res.render('users/search', { search: searchTerms, users });
    },
}