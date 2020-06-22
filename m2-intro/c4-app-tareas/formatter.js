const chalk = require('chalk');
const configuration = require('./configuration');

// States
const STATES_COLORS = configuration.read().state_colors;

// Print tasks with details
function longPrintTask(task) {
    console.log(`
    TITULO: ${chalk.bold.white(task.titulo)} ${STATES_COLORS[task.estado]('(' + task.estado.toUpperCase() + ')')}
    DESCRIPCION: ${chalk.yellow(task.descripcion)}
    `);
}

// Print title and state properties
function shortPrintTask(task) {
    console.log(`◇ ${chalk.bold.white(task.titulo)} ${STATES_COLORS[task.estado]('(' + task.estado.toUpperCase() + ')')}`);
}

module.exports = {
    short: shortPrintTask,
    long: longPrintTask
};