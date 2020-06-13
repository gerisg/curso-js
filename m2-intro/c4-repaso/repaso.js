// Funcion nombrada
function elDoble(num) {
    return num * 2;
}

let resultadoDoble = elDoble(123);
console.log("El doble es: " + resultadoDoble);

// Funcion anónima
let elTriple = function(num) {
    return num * 3;
}

let resultadoTriple = elTriple(333);
console.log("El triple es: " + resultadoTriple);

// Tipos de datos
let unArray = ['tipos de datos', 'funciones', 'ciclos', 'métodos de arrays', "destructuración"];
let otroArray = [1,2,3,4,5];

// Funcion - Declaracion vs Ejecucion

function log(data) {
    console.log(data);
}

function logTitle(data) {
    log('');
    log(data);
    log('~'.repeat(data.length));
}

// Arrow functions
logTitle('Arrow Functions');

let elDobleShort = num => num * 2;
console.log("El doble short es: " + elDobleShort(123));

let elTripleShort = num => num * 3;
console.log("El triple short es: " + elTripleShort(333));

// Callbacks
logTitle('Callbacks');

let sumar = (num1, num2) => num1 + num2;
let restar = (num1, num2) => num1 - num2;
let calculadora = (operacion, num1, num2) => operacion(num1, num2);

console.log(calculadora(sumar, 20, 10));
console.log(calculadora(restar, 20, 10));

// Metodos de Arrays
logTitle('Metodos de Arrays');

// Map
let unArrayUpperCase = unArray.map(
    unElemento => unElemento.toUpperCase()
);

log(unArrayUpperCase.toString());

// Filter
let unArrayConStringLargos = unArray.filter(
    unElemento => unElemento.length > 10
);

log(unArrayConStringLargos.toString());

// Reduce
let iniciales = unArray.reduce(
    (acumulador, unElemento) => { return acumulador + unElemento[0] }, ''
);

log(iniciales);

let sumaDeArray = otroArray.reduce(
    (acumulador, unElemento) => acumulador += unElemento
);

log(sumaDeArray);

// Foreach
unArray.forEach(
    unElemento => log(unElemento.toUpperCase())
);

// For of
logTitle("for of");

for (let unElemento of unArray){
    log(unElemento);
}

// For in
logTitle("for in");

let unObjeto = {
    titulo: "practicar el for in",
    descripcion: "entender para poder usarlo",
    estado: "pendiente",
};

for (const key in unObjeto) {
    if (unObjeto.hasOwnProperty(key)) {
        const unElemento = unObjeto[key];
        log(key + ": " +  unElemento);
    }
}

// Destructuracion