module.exports = {
    credits: function(req, res) {
        res.send('Gerardo Gallardo - Desarrollador Web Full Stack');
    },
    index: function(req, res) {
        res.send('Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los héroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos.');
    },
    error: function(req, res) {
        res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
    }
}