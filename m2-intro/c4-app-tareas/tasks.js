const json = require('./jsonTasks');
const message = require('./message');
const print = require('./formatter');

const STATES = [ 'pendiente', 'en progreso', 'terminada' ];

function all() {
    return json.readTasks();
}

function findIndex(title) {
    let tasks = json.readTasks();
    let foundIndex = tasks.findIndex(t => t.titulo == title);
    return foundIndex;
}

function create(title, description = '', state = 'pendiente' ) {
    // validar
    if(!title) {
        message.error('Debe ingresar una tarea válida');
        throw 
        return false;
    }

    let newTask = { titulo: title, descripcion: description, estado: state };
    let tasks = json.readTasks();
    tasks.push(newTask);

    json.writeTasks(tasks);
    message.info('Tarea creada');
}

function toDone(title) {
    // validar
    if(!title || findIndex(title) == -1) {
        message.error('Debe ingresar una tarea válida');
        return;
    }

    let tasks = json.readTasks();
    tasks.map(t => {
        if(t.titulo === title)
            t.estado = 'terminada';
    });

    json.writeTasks(tasks);
    message.info('Tarea completada');
}

function remove(title) {
    // validar
    if(!title) {
        message.error('Debe ingresar una tarea válida');
        return;
    }

    let tasks = json.readTasks();
    let cleanTasks  = tasks.filter(t => t.titulo !== title);
    if (cleanTasks.length < tasks.length) {
        json.writeTasks(cleanTasks);
        message.info('Tarea borrada');
    } else {
        message.error('No existe la tarea');
    }
}

function list(state) {
    if(!state) {
        return all();
    } else if(STATES.indexOf(state) == -1) {
        message.error('Debe ingresar un estado válido');
    } else {
        let tasks = json.readTasks();
        let tasksFiltradas = tasks.filter(t => t.estado == state);
        tasksFiltradas.forEach(e => {
            print.short(e);
        });
    }
}

function show(title) {
    let tasks = json.readTasks();
    let foundIndex = findIndex(title);
    foundIndex != -1 ? print.long(tasks[foundIndex]) : message.error('No existe la tarea');
}

function TaskError(message){
    this.message = message;
}

MyError.prototype = new Error();

module.exports = {
    create, toDone, remove, list, show
};