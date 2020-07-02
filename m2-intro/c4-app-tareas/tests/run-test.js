const app = require('../app');

function configTest() {
    app.configTasksFile(__dirname + 'tareas-test-json');
}

function createTest(name, description, state) {
    let res = app.execute('crear', [name, description, state]);
    console.log(res);
}

function listarTest() {
    let res = app.execute('listar');
    console.log(res);
}

configTest();
listarTest();
// createTest('task1', 'desc1');