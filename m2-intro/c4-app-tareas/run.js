const app = require('./app');

const CONFIG = {
    filename: __dirname + '/tareas.json',
    state_colors: { 
        'pendiente': 'red', 
        'en progreso': 'blueBright',
        'terminada': 'blue'
    }
};

function buildConf(params) {
    let conf = CONFIG;
    if(params && params.length == 4) {
        conf.filename = __dirname + '/' + params[0]
        conf.state_colors['pendiente'] = params[1];
        conf.state_colors['en progreso'] = params[2];
        conf.state_colors['terminada'] = params[3];
    }
    return conf;
}

// Execution from console
let action = process.argv[2];
let params = process.argv.slice(3);
let response = action == '--save-conf' ? 
    app.config(buildConf(params)) : 
    app.execute(action, params);

console.log(response.message);