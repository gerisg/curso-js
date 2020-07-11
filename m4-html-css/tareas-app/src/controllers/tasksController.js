const tasksService = require('../services/tasksService');
const TasksError = require('./tasksError');

const STATUS = [ 'pendiente', 'en progreso', 'terminada' ];

function create(task) {
    // validar
    if(!task || !task.title) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let newTask = { titulo: task.title, descripcion: task.description, estado: STATUS[task.status] };
    let tasks = tasksService.readTasks();
    tasks.push(newTask);

    tasksService.writeTasks(tasks);
    return _response('Tarea creada', newTask);
}

function toDone(title) {
    // validar
    const index = _findIndex(title);
    if(!title || index == -1) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let tasks = tasksService.readTasks();
    tasks[index].estado ='terminada';

    tasksService.writeTasks(tasks);
    return _response('Tarea completada', tasks[index]);
}

function remove(title) {
    console.log(title);
    // validar
    if(!title) {
        throw new TasksError('Debe ingresar una tarea válida');
    }

    let tasks = tasksService.readTasks();
    let cleanTasks  = tasks.filter(t => t.titulo !== title);
    if (cleanTasks.length == tasks.length) {
        throw new TasksError('No existe la tarea');
    }

    tasksService.writeTasks(cleanTasks);
    return _response('Tarea borrada');;
}

function list(state) {
    let listOfTasks = [];
    if(!state) {
        listOfTasks = _all();
    } else if(STATUS.indexOf(state) == -1) {
        throw new TasksError('Debe ingresar un estado válido');
    } else {
        let tasks = tasksService.readTasks();
        listOfTasks = tasks.filter(t => t.estado == state);
    }
    return _response(listOfTasks.length + ' tareas encontradas', listOfTasks);
}

function get(title) {
    let tasks = tasksService.readTasks();
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
    return tasksService.readTasks();
}

function _findIndex(title) {
    let tasks = tasksService.readTasks();
    let foundIndex = tasks.findIndex(t => t.titulo == title);
    return foundIndex;
}

module.exports = {
    create, toDone, remove, list, get
};