const groupsModel = require('../database/groupsModel');

module.exports = {
    index: (req, res) => {
        res.render('groups/index',  { groups: groupsModel.all() });
    },
    create: (req, res) => {
        res.render('groups/create');
    },
    store: (req, res) => {
        let newGroup = {
            name: req.body.name,
            description: req.body.description,
            repository: req.body.repository,
            image: null
        };
        res.redirect('/groups/' + groupsModel.create(newGroup))
    },
    edit: (req, res) => {
        res.render('groups/edit', { group: groupsModel.find(req.params.id) });
    },
    update: (req, res) => {
        let group = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            repository: req.body.repository,
            image: null
        };
        res.redirect('/groups/' + groupsModel.update(group));
    },
    show: (req, res) => {
        res.render('groups/detail', { group: groupsModel.find(req.params.id) });
    },
    destroy: (req, res) => {
        groupsModel.delete(req.params.id);
        res.redirect('/groups')
    },
    search: (req, res) => {
        let searchTerms = req.query.search;
        let groups = groupsModel.findByFields(['name', 'description'], searchTerms);
        res.render('groups/search', { search: searchTerms, groups });
    },
}