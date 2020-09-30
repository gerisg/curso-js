// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************

const productsApiController = require('../../controllers/api/productsApiController');

// ************       Routes       ************

router.get('/latest', productsApiController.latest);
router.get('/offers', productsApiController.offers);

module.exports = router;