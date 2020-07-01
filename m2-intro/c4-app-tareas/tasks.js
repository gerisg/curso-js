const repository = require('./jsonTasks');
const message = require('./message');
const TasksError = require('./tasksError');

const STATES = [ 'pendiente', 'en progreso', 'terminada' ];
const SUCCESS = 0; // Exit code successful

function _all() {
    return repository.readTasks();
}

function _findIndex(title) {
    let tasks = repository.readTasks();
    let foundIndex = tasks.findIndex(t => t.titulo == title);
    return foundIndex;
}

function create(title, description = '', state = 'pendiente' ) {
    // validar
    if(!title) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let newTask = { titulo: title, descripcion: description, estado: state };
    let tasks = repository.readTasks();
    tasks.push(newTask);

    repository.writeTasks(tasks);
    message.info('Tarea creada');

    return SUCCESS;
}

function toDone(title) {
    // validar
    if(!title || _findIndex(title) == -1) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let tasks = repository.readTasks();
    tasks.map(t => {
        if(t.titulo === title)
            t.estado = 'terminada';
    });

    repository.writeTasks(tasks);
    message.info('Tarea completada');

    return SUCCESS;
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
    message.info('Tarea borrada');
    return SUCCESS;
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
    return listOfTasks;
}

function get(title) {
    let tasks = repository.readTasks();
    let foundIndex = _findIndex(title);
    if (foundIndex == -1) {
        throw new TasksError('No existe la tarea');
    }
    return tasks[foundIndex];
}

module.exports = {
    create, toDone, remove, list, get
};