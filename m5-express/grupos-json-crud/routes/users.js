const express = require('express');
const router = express.Router();
const validate = require('../validators/users-validator');
const controller = require('../controllers/usersController');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/users'),
    filename: (req, file, callback) => {
        callback(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Formulario de inicio de sesión
router.get('/login', controller.loginForm);

// Procesamiento de sesión de usuario
router.post('/login', validate.loginForm, controller.login);
router.post('/logout', controller.logout);

// Todos los usuarios
router.get('/', controller.index);

// Formulario de búsqueda
router.get('/search', validate.searchForm, controller.search);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
router.post('/', upload.single('image'), validate.createForm, controller.store); // Al middleware le paso el name del input file

// Formulario de edición
router.get('/:id/edit', controller.edit);

// Procesamiento del formulario de edicion
router.put('/:id', upload.single('image'), validate.editForm, controller.update);

// Detalle de un usuario - Ojo con el parámetro
router.get('/:id', controller.show);

// Eliminar un usuario
router.delete('/:id', controller.destroy);

module.exports = router;