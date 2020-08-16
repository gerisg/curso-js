const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator'); 

const jsonTable = require('../database/jsonTable');
const groupsModel = jsonTable('groups');
const categoriesModel = jsonTable('categories');

module.exports = {
    index: (req, res) => {
        let groups = groupsModel.all();
        groups.map(group => group.category = categoriesModel.find(group.categoryId).name);
        res.render('groups/index',  { groups });
    },
    create: (req, res) => {
        let categories = categoriesModel.all();
        res.render('groups/create', { categories });
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let group = req.body;
            group.image = req.file ? req.file.filename : null;
            let id = groupsModel.create(group)
            res.redirect('/groups/' + id);
        } else {
            let categories = categoriesModel.all();
            res.render('groups/create', { categories, errors: errors.mapped(), group: req.body });
        }
    },
    edit: (req, res) => {
        let group = groupsModel.find(req.params.id);
        let categories = categoriesModel.all();
        res.render('groups/edit', { group, categories });
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let group = req.body;
            group.id = req.params.id;
            group.image = req.file ? req.file.filename : req.body.currentImage ? req.body.currentImage : null;
            delete group.currentImage;
            let id = groupsModel.update(group);
            res.redirect('/groups/' + id);
        } else {
            req.body.id = req.params.id;
            req.body.image = req.file ? req.file.filename : req.body.currentImage;
            let categories = categoriesModel.all();
            res.render('groups/edit', { categories, errors: errors.mapped(), group: req.body });
        }
    },
    show: (req, res) => {
        let group = groupsModel.find(req.params.id);
        group.category = categoriesModel.find(group.categoryId).name;
        res.render('groups/detail', { group });
    },
    destroy: (req, res) => {
        /* remove image */
        let group = groupsModel.find(req.params.id);
        const imagePath = path.join(__dirname, '../public/img/groups/' + group.image);
        if(fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        /* destroy register */
        groupsModel.delete(req.params.id);
        res.redirect('/groups');
    },
    search: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let search = req.query.search;
            let groups = search && search.length == 0 ? groupsModel.all() : groupsModel.findByFields(['name', 'description'], search);
            groups.map(group => group.category = categoriesModel.find(group.categoryId).name);
            res.render('groups/search', { search, groups });
        } else {
            res.render('groups/search', { errors: errors.mapped(), search: req.query.search });
        }
    },
}