const chalk = require('chalk');
const fs = require('fs');

// States by color
let statesByColor = { 'pendiente': chalk.red, 'en progreso': chalk.blueBright, 'terminada': chalk.green };

// Read tasks from JSON
function jsonToTasks() {
    const jsonTasks = fs.readFileSync('./tareas.json', 'utf-8');
    return JSON.parse(jsonTasks);
}

// Save tasks to JSON
function tasksToJSON(tasks) {
    let jsonTasks = JSON.stringify(tasks, null, ' ');
    fs.writeFileSync('./tareas.json', jsonTasks);
}

// Imprimir una tarea formateada
function longPrintTask(task) {
    console.log(`
    TITULO: ${chalk.bold.white(task.titulo)} ${statesByColor[task.estado]('(' + task.estado.toUpperCase() + ')')}
    DESCRIPCION: ${chalk.yellow(task.descripcion)}
    `);
}

// Imprimir una tarea formateada
function shortPrintTask(task) {
    console.log(`◇ ${chalk.bold.white(task.titulo)} ${statesByColor[task.estado]('(' + task.estado.toUpperCase() + ')')}`);
}

// Formato de mensaje ERROR
function error(msg, title = 'Oh no!!') {
    console.log(`${chalk.bold.red(title)} ${chalk.red(msg)}`);
}

// Formato de mensaje INFO
function info(msg, title = 'Enhorabuena!!') {
    console.log(`${chalk.bold.green(title)} ${chalk.green(msg)}`);
}

function all() {
    let tasks = jsonToTasks();
    tasks.forEach(e => {
        shortPrintTask(e);
    });
}

function create(title, description = '', state = 'pendiente' ) {
    // validar
    if(!title) {
        error('Debe ingresar una tarea válida');
        return;
    }

    let newTask = {
        titulo: title,
        descripcion: description,
        estado: state
    };

    let tasks = jsonToTasks();
    tasks.push(newTask);

    tasksToJSON(tasks);
    info('Tarea creada');
}

function toDone(title) {
    // validar
    if(!title) {
        error('Debe ingresar una tarea válida');
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
        info('Tarea borrada!');
    } else {
        error('No existe la tarea');
    }
}

function list(state) {
    if(state) {
        let tasks = jsonToTasks();
        let tasksFiltradas = tasks.filter(t => t.estado == state);
        tasksFiltradas.forEach(e => {
            shortPrintTask(e);
        });
    } else {
        all();
    }
}

function show(title) {
    let tasks = jsonToTasks();
    let foundIndex = tasks.findIndex(t => t.titulo == title);
    foundIndex != -1 ? longPrintTask(tasks[foundIndex]) : error('No existe la tarea');
}

module.exports = {
    create, toDone, remove, list, show
};