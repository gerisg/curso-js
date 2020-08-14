const express = require('express');
const app = express();
const methodOverride = require('method-override');

// Configuración
// Las vistas tienen extension .ejs
// Las vistas están en la carpeta views
app.set('view engine', 'ejs');

// Template Engines
app.use(express.static('public'));

// Formularios
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Rutas
const mainRoutes = require('./routes/index');
const groupsRoutes = require('./routes/groups');
const usersRoutes = require('./routes/users');

app.use('/', mainRoutes);
app.use('/groups', groupsRoutes);
app.use('/users', usersRoutes);

// Errors
app.use((req, res, next) => {
    res.status(404).render('404-page');
    next();
});

// Servidor
app.listen(3000, () => { console.log('Servidor funcionando en el puerto 3000.') })