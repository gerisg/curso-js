const fs = require('fs');
const configuration = require('./configuration');

// Read tasks from JSON
function readTasks() {
    let filename = configuration.read().filename;
    if (!fs.existsSync(filename)) {
        return [];
    }
    const jsonTasks = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(jsonTasks);
}

// Save tasks to JSON
function writeTasks(tasks) {
    let filename = configuration.read().filename;
    let jsonTasks = JSON.stringify(tasks, null, ' ');
    fs.writeFileSync(filename, jsonTasks);
}

module.exports = {
    readTasks, writeTasks
};