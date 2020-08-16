const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

const mainRoutes = require('./routes/index');
const groupsRoutes = require('./routes/groups');
const usersRoutes = require('./routes/users');
const maintenance = require('./middleware/maintenance');
const auth = require('./middleware/auth');

// Configuration
app.set('view engine', 'ejs'); // Las vistas tienen extension .ejs
const maintenanceMode = false; // Las vistas están en la carpeta views

// Middlewares
app.use(express.static('public')); // Template Engines
app.use(express.urlencoded({ extended: false })); // Forms
app.use(methodOverride('_method')); // Support PUT and DELETE Methods
if(maintenanceMode) { app.use(maintenance) } // Maintenance mode
app.use(session({
    secret: 'secret-key-phrase', 
    resave: false, // no vuelve a guardar si no hay cambios
    saveUninitialized: true // guarda sessiones aunque todavía no haya datos
}))
app.use(auth); // authentication with session

// Routes
app.use('/', mainRoutes);
app.use('/groups', groupsRoutes);
app.use('/users', usersRoutes);

// Errors
app.use((req, res, next) => {
    res.status(404).render('404');
    next();
});

// Server
app.listen(3000, () => { console.log('Servidor funcionando en el puerto 3000.') })