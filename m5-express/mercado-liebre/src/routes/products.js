// ************ Require's ************
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

/* Configure multer */
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/images/products'),
    filename: (req, file, cb) => cb(null, 'prod-' + Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', upload.single('image'), productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
