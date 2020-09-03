var express = require('express');
var router = express.Router();
var controller = require('../controllers/moviesController');

router.get('/create', controller.create);
router.post('/create', controller.save);
router.get('/', controller.list);
router.get('/:id/edit', controller.edit);
router.post('/:id/edit', controller.update);
router.post('/:id/delete', controller.delete);
router.get('/:id', controller.detail);

module.exports = router;