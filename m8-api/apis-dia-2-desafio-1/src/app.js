const express = require('express');
const app = express();
const phrases = require('./frases');
const giphy = require('./requests/giphyRequests');

// Static files and template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routes
app.get('*', (req, res) => {
    let gif = {};
    giphy.get404Gif().then(function(response){
        let random = Math.floor(Math.random() * response.data.data.length);
        let gif = response.data.data[random];
        res.status(404).render('404', { 
            message: phrases[Math.floor(Math.random() * phrases.length)], 
            image: { title: gif.title, url: gif.images.original.url }  
        });
    }).catch(function(error){
        console.log(error);
    });
    
});

// Server
app.listen(3000, () => { console.log('Servidor escuchando en el puerto 3000') });