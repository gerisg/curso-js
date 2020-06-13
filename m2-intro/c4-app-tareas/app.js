const tareas = require('./tasks.js')

// Get action and params
let action = process.argv[2];
let params = process.argv.slice(3);

switch (action) {
    case 'crear':
        tareas.create(params[0], params[1], params[2]);
        break;
    case 'completar':
        tareas.toDone(params[0]);
        break;
    case 'borrar':
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
        tareas.list(params[0])
        break;
    default:
        console.log('Operación no válida');
}