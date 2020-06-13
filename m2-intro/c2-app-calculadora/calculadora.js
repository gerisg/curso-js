const sumar = require('./sumar');
const restar = require('./restar');
const multiplicar = require('./multiplicar');
const dividir = require('./dividir');

// Los números son múltiplos
function esMultiplo(dividendo, divisor) {
    if (divisor === 0) {
        return "No se pude dividir por cero.";
    }
    return dividendo % divisor; 
}

let param1 = 10;
let param2 = 1;

const resultadoSumar = sumar(param1, param2);
const resultadoRestar = restar(param1, param2);
const resultadoDividir = dividir(param1, param2);
const resultadoMultiplicar = multiplicar(param1, param2);

console.log("El resultado de la SUMA", resultadoSumar);
console.log("El resultado de la RESTA", resultadoRestar);
console.log("El resultado de la DIVISION", resultadoDividir);
console.log("El resultado de la MULTIPLICACION", resultadoMultiplicar);
console.log("Es múltiplo", esMultiplo(param1, param2));