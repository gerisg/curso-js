const chalk = require('chalk');
const fs = require('fs');
const FILENAME = './tareas.json'

// States
let states = { 'pendiente': chalk.red, 'en progreso': chalk.blueBright, 'terminada': chalk.green };

// Read tasks from JSON
function jsonToTasks() {
    const jsonTasks = fs.readFileSync(FILENAME, 'utf-8');
    return JSON.parse(jsonTasks);
}

// Save tasks to JSON
function tasksToJSON(tasks) {
    let jsonTasks = JSON.stringify(tasks, null, ' ');
    fs.writeFileSync(FILENAME, jsonTasks);
}

// Print tasks with details
function longPrintTask(task) {
    console.log(`
    TITULO: ${chalk.bold.white(task.titulo)} ${states[task.estado]('(' + task.estado.toUpperCase() + ')')}
    DESCRIPCION: ${chalk.yellow(task.descripcion)}
    `);
}

// Print title and state properties
function shortPrintTask(task) {
    console.log(`◇ ${chalk.bold.white(task.titulo)} ${states[task.estado]('(' + task.estado.toUpperCase() + ')')}`);
}

// Error message
function error(msg, title = 'Oh no!!') {
    console.log(`${chalk.bold.red(title)} ${chalk.red(msg)}`);
}

// Info message
function info(msg, title = 'Enhorabuena!!') {
    console.log(`${chalk.bold.green(title)} ${chalk.green(msg)}`);
}

function all() {
<<<<<<< ours
    let tasks = jsonToTasks();
    tasks.forEach(e => {
        shortPrintTask(e);
    });
}

function find(title) {
    let tasks = jsonToTasks();
=======
    return json.readTasks();
}

function findIndex(title) {
    let tasks = json.readTasks();
>>>>>>> theirs
    let foundIndex = tasks.findIndex(t => t.titulo == title);
    return foundIndex;
}

function create(title, description = '', state = 'pendiente' ) {
    // validar
    if(!title) {
<<<<<<< ours
        error('Debe ingresar una tarea válida');
        return;
    }

    let newTask = {
        titulo: title,
        descripcion: description,
        estado: state
    };

    let tasks = jsonToTasks();
=======
        message.error('Debe ingresar una tarea válida');
        throw 
        return false;
    }

    let newTask = { titulo: title, descripcion: description, estado: state };
    let tasks = json.readTasks();
>>>>>>> theirs
    tasks.push(newTask);

    tasksToJSON(tasks);
    info('Tarea creada');
}

function toDone(title) {
    // validar
<<<<<<< ours
    if(!title || find(title) == -1) {
        error('Debe ingresar una tarea válida');
=======
    if(!title || findIndex(title) == -1) {
        message.error('Debe ingresar una tarea válida');
>>>>>>> theirs
        return;
    }

    let tasks = jsonToTasks();
    tasks.map(t => {
        if(t.titulo === title)
            t.estado = 'terminada';
    });

    tasksToJSON(tasks);
    info('Tarea completada');
}

function remove(title) {
    // validar
    if(!title) {
        error('Debe ingresar una tarea válida');
        return;
    }

    let tasks = jsonToTasks();
    let cleanTasks  = tasks.filter(t => t.titulo !== title);
    if (cleanTasks.length < tasks.length) {
        tasksToJSON(cleanTasks);
        info('Tarea borrada');
    } else {
        error('No existe la tarea');
    }
}

function list(state) {
    if(!state) {
<<<<<<< ours
        all();
    } else if(!states.hasOwnProperty(state)) {
        error('Debe ingresar un estado válido');
=======
        return all();
    } else if(STATES.indexOf(state) == -1) {
        message.error('Debe ingresar un estado válido');
>>>>>>> theirs
    } else {
        let tasks = jsonToTasks();
        let tasksFiltradas = tasks.filter(t => t.estado == state);
        tasksFiltradas.forEach(e => {
            shortPrintTask(e);
        });
    }
}

function show(title) {
<<<<<<< ours
    let tasks = jsonToTasks();
    let foundIndex = find(title);
    foundIndex != -1 ? longPrintTask(tasks[foundIndex]) : error('No existe la tarea');
=======
    let tasks = json.readTasks();
    let foundIndex = findIndex(title);
    foundIndex != -1 ? print.long(tasks[foundIndex]) : message.error('No existe la tarea');
>>>>>>> theirs
}

function TaskError(message){
    this.message = message;
}

MyError.prototype = new Error();

module.exports = {
    create, toDone, remove, list, show, error
};