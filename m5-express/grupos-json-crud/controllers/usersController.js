const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator'); 

const jsonTable = require('../database/jsonTable');
const usersModel = jsonTable('users');

module.exports = {
    login: (req, res) => {
        res.render('users/login');
    },
    authenticate: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = usersModel.findByFields(['email'], req.body.email)[0];
            if(user && bcrypt.compareSync(req.body.password, user.password)) {
                req.session.authorized = { id: user.id, firstname: user.firstname, category: user.category };
                res.redirect('/');
            } else {
                res.render('users/login', { 
                    errors: { form: { msg: 'Credenciales no válidas' }}
                });
            }
        } else {
            res.render('users/login', { errors: errors.mapped() });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/users/login');
    },
    index: (req, res) => {
        res.render('users/index',  { users: usersModel.all() });
    },
    create: (req, res) => {
        res.render('users/create');
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = req.body;
            user.password = bcrypt.hashSync(user.password, 10);
            user.category = parseInt(req.body.category);
            user.image = req.file ? req.file.filename : null;
            let id = usersModel.create(user);
            res.redirect('/users/' + id);
        } else {
            res.render('users/create', { errors: errors.mapped(), user: req.body });
        }
    },
    edit: (req, res) => {
        let user = usersModel.find(req.params.id);
        res.render('users/edit', { user });
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = req.body;
            user.id = parseInt(req.params.id);
            user.category = parseInt(req.body.category);
            user.password = user.password ? bcrypt.hashSync(user.password, 10) : user.currentPass;
            delete user.currentPass;
            user.image = req.file ? req.file.filename : req.body.currentImage ? req.body.currentImage : null;
            delete user.currentImage;
            let id = usersModel.update(user);
            res.redirect('/users/' + id);
        } else {
            req.body.id = req.params.id;
            req.body.image = req.file ? req.file.filename : req.body.currentImage;
            res.render('users/edit', { errors: errors.mapped(), user: req.body });
        }
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
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let search = req.query.search;
            let users = search && search.length == 0 ? usersModel.all() : usersModel.findByFields(['firstname', 'lastname', 'email'], search);
            res.render('users/search', { search: search, users });
        } else {
            res.render('users/search', { errors: errors.mapped(), search: req.query.search });
        }
    },
}