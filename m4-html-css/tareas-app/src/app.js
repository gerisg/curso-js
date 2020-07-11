const tasks = require('./controllers/tasksController.js')
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})
.get('/tasks', (req, res) => {
    let response = tasks.list(params[0]);
    response.value.forEach(e => console.log(e));
    res.sendFile(__dirname + '/views/index.html');
})
.get('/task', (req, res) => {
    let response = tasks.get(params[0]);
    console.log(response.value);
    res.sendFile(__dirname + '/views/index.html');
})
.post('/task/done', (req, res) => {
    let data = JSON.stringify(req.body, null, ' ');
    let response = tasks.toDone(data);
    res.sendFile(__dirname + '/views/index.html');
})
.post('/task', (req, res) => {
    let response = tasks.create(req.body);
    console.log(response.message);
    res.sendFile(__dirname + '/views/index.html');
})
.delete('/task', (req, res) => {
    let data = JSON.stringify(req.body, null, ' ');
    tasks.remove(data);
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(3000, () => console.log('Server started'));