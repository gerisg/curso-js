const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
}).get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
}).get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.listen(3000, () => console.log('servidor levantado')); 