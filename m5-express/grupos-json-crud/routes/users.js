const express = require('express');
const router = express.Router();
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

// Sesión de usuario
router.get('/login', controller.loginForm);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

// Todos los usuarios
router.get('/', controller.index);

// Formulario de búsqueda
router.get('/search', controller.search);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
router.post('/', upload.single('image'), controller.store); // Al middleware le paso el name del input file

// Formulario de edición
router.get('/:id/edit', controller.edit);

// Procesamiento del formulario de edicion
router.put('/:id', upload.single('image'), controller.update);

// Detalle de un usuario - Ojo con el parámetro
router.get('/:id', controller.show);

// Eliminar un usuario
router.delete('/:id', controller.destroy);

module.exports = router;