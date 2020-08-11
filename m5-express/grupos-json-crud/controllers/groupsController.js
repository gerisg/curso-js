const fs = require('fs');
const path = require('path');
const jsonTable = require('../database/jsonTable');

const groupsModel = jsonTable('groups');
const categoriesModel = jsonTable('categories');

module.exports = {
    index: (req, res) => {
        res.render('groups/index',  { groups: groupsModel.all() });
    },
    create: (req, res) => {
        let categories = categoriesModel.all();
        res.render('groups/create', { categories });
    },
    store: (req, res) => {
        let group = req.body;
        group.image = req.file ? req.file.filename : null;
        res.redirect('/groups/' + groupsModel.create(group))
    },
    edit: (req, res) => {
        let group = groupsModel.find(req.params.id);
        let categories = categoriesModel.all();
        res.render('groups/edit', { group, categories });
    },
    update: (req, res) => {
        let group = req.body;
        group.id = req.params.id;
        group.image = req.file ? req.file.filename : req.body.currentImage;
        delete group.currentImage;
        res.redirect('/groups/' + groupsModel.update(group));
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
        let searchTerms = req.query.search;
        let groups = groupsModel.findByFields(['name', 'description'], searchTerms);
        res.render('groups/search', { search: searchTerms, groups });
    },
}