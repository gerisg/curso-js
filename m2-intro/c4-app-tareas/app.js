const tareas = require('./tasks.js')

// Get action and params
let action = process.argv[2];
let params = process.argv.slice(3);

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
    case 'todas':
        tareas.list();
        break;
    case 'pendientes':
        tareas.list('pendiente');
        break;
    case 'listar':
        // params: estado
        tareas.list(params[0]);
        break;
    case 'detalle':
        // params: titulo
        tareas.show(params[0]);
        break;
    default:
        console.log('Operación no válida');
}