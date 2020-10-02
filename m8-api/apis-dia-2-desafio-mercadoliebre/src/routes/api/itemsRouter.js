// ************ Require's ************
const express = require('express');
const router = express.Router();
const authApiMiddleware = require('../../middlewares/auth-api');
const validator = require('../../middlewares/validator');

// ************ Controller Require ************
const itemController = require('../../controllers/api/itemController');

router.post('/', authApiMiddleware, validator.addToCart, itemController.store); /* POST - save item */
router.delete('/', authApiMiddleware, itemController.remove); /* DELETE - delete item */

module.exports = router;
