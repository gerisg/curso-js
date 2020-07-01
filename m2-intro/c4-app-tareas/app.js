const tareas = require('./tasks.js')
const message = require('./message');
const print = require('./formatter');
const configuration = require('./configuration');

const SUCCESS = 0;
const ERROR = 1;

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
    return SUCCESS;
}

function execute(action, params) {
    try {
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
                 let tasks = tareas.list(params[0]);
                 tasks.forEach(e => print.short(e));
                 return tasks;
            case 'detalle':
                // params: titulo
                let task = tareas.get(params[0]);
                print.long(task);
                return task;
            default:
                throw new Error('Operación no válida');
        }
    } catch (err) {
        message.error(err.message);
        return ERROR;
    }
}

module.exports = {
    execute, 
    config
};