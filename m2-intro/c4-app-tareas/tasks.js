const repository = require('./jsonTasks');
const TasksError = require('./tasksError');

const STATES = [ 'pendiente', 'en progreso', 'terminada' ];

function create(title, description = '', state = 'pendiente' ) {
    // validar
    if(!title) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let newTask = { titulo: title, descripcion: description, estado: state };
    let tasks = repository.readTasks();
    tasks.push(newTask);

    repository.writeTasks(tasks);
    return _response('Tarea creada', newTask);
}

function toDone(title) {
    // validar
    const index = _findIndex(title);
    if(!title || index == -1) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let tasks = repository.readTasks();
    tasks[index].estado ='terminada';

    repository.writeTasks(tasks);
    return _response('Tarea completada', tasks[index]);
}

function remove(title) {
    // validar
    if(!title) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let tasks = repository.readTasks();
    let cleanTasks  = tasks.filter(t => t.titulo !== title);
    if (cleanTasks.length == tasks.length) {
        throw new TasksError('No existe la tarea');
    }

    repository.writeTasks(cleanTasks);
    return _response('Tarea borrada');;
}

function list(state) {
    let listOfTasks = [];
    if(!state) {
        listOfTasks = _all();
    } else if(STATES.indexOf(state) == -1) {
        throw new TasksError('Debe ingresar un estado válido');
    } else {
        let tasks = repository.readTasks();
        listOfTasks = tasks.filter(t => t.estado == state);
    }
    return _response(listOfTasks.length + ' tareas encontradas', listOfTasks);
}

function get(title) {
    let tasks = repository.readTasks();
    let foundIndex = _findIndex(title);
    if (foundIndex == -1) {
        throw new TasksError('No existe la tarea');
    }
    return _response('Tarea encontrada', tasks[foundIndex]);
}


function _response(message, value = []) {
    return {
        message: message,
        value: value
    }
}

function _all() {
    return repository.readTasks();
}

function _findIndex(title) {
    let tasks = repository.readTasks();
    let foundIndex = tasks.findIndex(t => t.titulo == title);
    return foundIndex;
}

module.exports = {
    create, toDone, remove, list, get
};