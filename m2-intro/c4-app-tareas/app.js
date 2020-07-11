const tareas = require('./tasks.js')
const message = require('./message');
const print = require('./formatter');
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
    return { message: 'Configuración actualizada', value: 0};
}

function execute(action, params) {
    try {
        let response;
        switch (action) {
            case 'crear':
                // params: [titulo, descripcion, estado]
                return tareas.create(params[0], params[1], params[2]);
            case 'completar':
                // params: titulo
                return tareas.toDone(params[0]);
            case 'borrar':
                // params: titulo
                return tareas.remove(params[0]);
            case undefined:
            case 'listar':
                // params: estado
                 response = tareas.list(params[0]);
                 response.value.forEach(e => print.short(e));
                 return response;
            case 'detalle':
                // params: titulo
                response = tareas.get(params[0]);
                print.long(response.value);
                return response;
            default:
                throw new Error('Operación no válida');
        }
    } catch (err) {
        message.error(err.message);
        return { message: err.message, value: 1 };
    }
}

module.exports = {
    execute, 
    config
};