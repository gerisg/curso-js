const app = require('./app');

const CONFIG = {
    filename: __dirname + '/tareas.json',
    state_colors: { 
        'pendiente': 'red', 
        'en progreso': 'blueBright',
        'terminada': 'blue'
    }
};

// Execution from console
let action = process.argv[2];
let params = process.argv.slice(3);
let response = action == '--save-conf' ? 
    app.config(CONFIG) : 
    app.execute(action, params);

console.log('Exit code ' + response);