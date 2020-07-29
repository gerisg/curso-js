const express = require('express');
const app = express();

const routeHeroes = require('./routes/heroes');
const routeMain = require('./routes/main');

app.use(express.static('public'));
app.use("/heroes", routeHeroes);
app.use("/", routeMain);

app.listen (3030, () => ( console.log('server started') ));