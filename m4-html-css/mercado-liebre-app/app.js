const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
}).post('/', (req, res) => {
    let data = JSON.stringify(req.body, null, ' ');
    fs.writeFileSync("data.json", data);
    res.sendFile(__dirname + '/views/index.html');
}).get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
}).get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.listen(3000, () => console.log('servidor levantado')); 