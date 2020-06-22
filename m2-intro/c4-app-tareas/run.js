const app = require('./app');

const CONFIG = {
    filename: __dirname + '/tareas.json',
    state_colors: { 
        'pendiente': 'red', 
        'en progreso': 'blueBright',
        'terminada': 'green'
    }
};

function config() {
    app.config(CONFIG);
}

// Execution from console
let action = process.argv[2];
let params = process.argv.slice(3);
action == 'conf' ? config() : app.execute(action, params);