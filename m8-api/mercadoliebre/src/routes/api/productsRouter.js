// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************

const productsController = require('../../controllers/api/productsController');

// ************       Routes       ************

router.get('/latest', productsController.latest);
router.get('/offers', productsController.offers);
router.get('/:category?', productsController.categories);

module.exports = router;