const fs = require('fs');

// Read tasks from JSON
function readTasks() {
    let filename = __dirname + '/../data/tasks.json';
    if (!fs.existsSync(filename)) {
        return [];
    }
    const jsonTasks = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(jsonTasks);
}

// Save tasks to JSON
function writeTasks(tasks) {
    let filename = __dirname + '/../data/tasks.json';
    let jsonTasks = JSON.stringify(tasks, null, ' ');
    fs.writeFileSync(filename, jsonTasks);
}

module.exports = {
    readTasks, writeTasks
};