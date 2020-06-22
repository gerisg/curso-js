const tareas = require('./tasks.js')
const message = require('./message');
const configuration = require('./configuration');

function config(config, debug = false) {
    configuration.write(config);
    if (debug) {
        message.info('Archivo: ' + config.filename, '');
        let colors = config.state_colors;
        let colorsMsg = [];
        for (const key in colors) {
            if (colors.hasOwnProperty(key)) {
                const element = colors[key];
                colorsMsg.push(key + ':' + element);
            }
        }
        message.info('Estados: ' + colorsMsg.join(', '), '');
    }
}

function execute(action, params) {
    switch (action) {
        case 'crear':
            // params: [titulo, descripcion, estado]
            tareas.create(params[0], params[1], params[2]);
            break;
        case 'completar':
            // params: titulo
            tareas.toDone(params[0]);
            break;
        case 'borrar':
            // params: titulo
            tareas.remove(params[0]);
            break;
        case undefined:
        case 'listar':
            // params: estado
            tareas.list(params[0]);
            break;
        case 'detalle':
            // params: titulo
            tareas.show(params[0]);
            break;
        default:
            message.error('Operación no válida');
    }
}

module.exports = {
    execute, 
    config
};