const { check } = require('express-validator');

// Creamos una propiedad por cada formulario que queramos validar
module.exports = {
    loginForm: [
        check('email')
            .notEmpty().withMessage('Ingrese su correo').bail()
            .isEmail().withMessage('Debe ser un correo válido'),
    ],
    createForm: [
        check('firstname')
            .notEmpty().withMessage('Ingrese su nombre').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('lastname')
            .notEmpty().withMessage('Ingrese su apellido').bail()
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
        check('email')
            .notEmpty().withMessage('Ingrese su correo').bail()
            .isEmail().withMessage('Debe ser un correo válido'),
        check('password')
            .notEmpty().withMessage('Ingese su contraseña').bail()
            .isLength({ min:8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ],
    editForm: [
        check('firstname')
            .notEmpty().withMessage('Ingrese su nombre').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('lastname')
            .notEmpty().withMessage('Ingrese su apellido').bail()
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'), 
        check('email')
            .notEmpty().withMessage('Ingrese su correo').bail()
            .isEmail().withMessage('Debe ser un correo válido'),
        check('password')
            .custom(value => value.length > 0 ? value.length >= 8 : true).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ],
    searchForm: [
        check('search')
            .custom(value => value ? value.length >= 3 : true).withMessage('Debe ingresar al menos 3 caracteres')
    ]
}