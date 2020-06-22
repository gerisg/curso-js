const chalk = require('chalk');

// Error message
function error(msg, title = 'Oh no!!') {
    console.log(`${chalk.bold.red(title)} ${chalk.red(msg)}`);
}

// Info message
function info(msg, title = 'Enhorabuena!!') {
    console.log(`${chalk.bold.green(title)} ${chalk.green(msg)}`);
}

module.exports = {
    info, error
};