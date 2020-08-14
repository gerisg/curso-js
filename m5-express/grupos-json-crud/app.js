const express = require('express');
const app = express();
const methodOverride = require('method-override');

const mainRoutes = require('./routes/index');
const groupsRoutes = require('./routes/groups');
const usersRoutes = require('./routes/users');

// Configuración
// Las vistas tienen extension .ejs
// Las vistas están en la carpeta views
app.set('view engine', 'ejs');
const maintenanceMode = false;

// Middlewares
app.use((req,res,next) => maintenanceMode ? res.render('maintenance-mode') : next()); // Maintenance mode
app.use(express.static('public')); // Template Engines
app.use(express.urlencoded({ extended: false })); // Forms
app.use(methodOverride('_method')); // Support PUT and DELETE Methods

// Routes
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