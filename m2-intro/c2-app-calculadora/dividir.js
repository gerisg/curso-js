module.exports = function dividir(dividendo, divisor) {
    if (divisor === 0) {
        return "No se pude dividir por cero.";
    }
    return dividendo / divisor;
};