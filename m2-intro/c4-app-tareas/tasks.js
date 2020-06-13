const chalk = require('chalk');
const fs = require('fs');

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
function printTask(task) {
    console.log("***", task.titulo, "*** (" + task.estado + ")");
    console.log(chalk.inverse.red(task.descripcion));
}

function all() {
    let tasks = jsonToTasks();
    tasks.forEach(e => {
        printTask(e);
    });
}

function create(title, description = '', state = 'pendiente' ) {
    // validar
    if(!title) {
        console.log('Tarea no válida');
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
    console.log("Tarea creada!");
}

function toDone(title) {
    // validar
    if(!title) {
        console.log('Tarea no válida');
        return;
    }

    let tasks = jsonToTasks();
    tasks.map(t => {
        if(t.titulo === title)
            t.estado = 'terminada';
    });

    tasksToJSON(tasks);
    console.log("Tarea guardada!");
}

function remove(title) {
    // validar
    if(!title) {
        console.log('Tarea no válida');
        return;
    }

    let tasks = jsonToTasks();
    let cleanTasks  = tasks.filter(t => t.titulo !== title);
    if (cleanTasks.length < tasks.length) {
        tasksToJSON(cleanTasks);
        console.log("Tarea borrada!");
    } else {
        console.log("No existe la tarea");
    }
}

function list(state) {
    if(state) {
        let tasks = jsonToTasks();
        let tasksFiltradas = tasks.filter(t => t.estado == state);
        tasksFiltradas.forEach(e => {
            printTask(e);
        });
    } else {
        all();
    }
}

module.exports = {
    create: create,
    toDone: toDone,
    remove: remove,
    list: list
};