const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const validate = require('../validators/groups-validator');
const redirect = require('../middleware/redirect');
const userRoute = require('../middleware/userRoute');
const adminRoute = require('../middleware/adminRoute');
const controller = require('../controllers/groupsController');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/groups'),
    filename: (req, file, callback) => {
        callback(null, 'group-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Todos los grupos
router.get('/', controller.index);

// Deprecated example
router.get('/deprecated', redirect);

// Formulario de búsqueda
router.get('/search', validate.searchForm, controller.search);

// Formulario de creación
router.get('/create', userRoute, controller.create);

// Procesamiento del formulario de creación
router.post('/', userRoute, upload.single('image'), validate.createForm, controller.store); // Al middleware le paso el name del input file

// Formulario de edición
router.get('/:id/edit', userRoute, controller.edit);

// Procesamiento del formulario de edicion
router.put('/:id', userRoute, upload.single('image'), validate.createForm, controller.update);

// Detalle de un grupo - Ojo con el parámetro
router.get('/:id', controller.show);

// Eliminar un grupo
router.delete('/:id', adminRoute, controller.destroy);

module.exports = router;