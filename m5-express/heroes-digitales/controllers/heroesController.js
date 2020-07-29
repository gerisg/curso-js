const fs = require('fs'); 

let heroes = JSON.parse(fs.readFileSync(__dirname + "/../data/heroes.json", "utf-8"));

function truncate(text, numOfWords) {
    let words = text.split(' ');
    
    if(numOfWords <= 0) {
        return '';
    } else if(words.length <= numOfWords) {
        return text;
    } else if(numOfWords === 1) {
        return words[0]
    }

    let truncated = words.reduce((phrase, word) => {
        if(typeof(phrase) == 'string') {
            return [ phrase, word ];
        }
        if(phrase.length < numOfWords) { 
            phrase.push(word);
        }
        return phrase;
    });

    return truncated.join(' ');
}

module.exports = {
    hero: function (req, res) {
        const id = req.params.id;
        let hero = heroes.find(hero => hero.id == id);
        let msg = hero != undefined ? `Hola, mi nombre es ${hero.nombre} y soy ${hero.profesion}` : `No tenemos en nuestra base ningún héroe ni heroína con ${id}`;
        res.send(msg);
    },
    heroes: function (req, res) {
        res.send(heroes);
    },
    review: function (req, res) {
        const id = req.params.id;
        const fullReview = req.params.tipo != undefined && req.params.tipo == 'completa';
        let hero = heroes.find(hero => hero.id == id);
        if(hero == undefined) {
            res.send(`No tenemos en nuestra base ningún héroe ni heroína con ID ${id}`);
        } else {
            let review = fullReview ? hero.resenia : truncate(hero.resenia, 30);
            res.send(`Nombre: ${hero.nombre}, Reseña: ${review}`);
        }    
    }
}