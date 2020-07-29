const fs = require('fs');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/heroesController');

router.use('/:id/resenia/:tipo?', controller.review);
router.use("/:id", controller.hero);
router.get("/", controller.heroes);

module.exports = router;