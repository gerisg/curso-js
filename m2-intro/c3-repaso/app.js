let fs = require('fs');

let tareas = [
    {
        titulo: 'Practicar el switch',
        descripcion: 'Entender para qué puedo usarlo',
        estado: 'pendiente'
    },
    {
        titulo: 'Practicar el for',
        descripcion: 'Entender cómo se usa',
        estado: 'en progreso'
    },{
        titulo: 'Objeto vs JSON',
        descripcion: 'Qué tienen de diferente?',
        estado: 'terminada'
    }
];

tareas.push({
    titulo: 'Aprender métodos de strings',
    descripcion: 'A ver qué se puede hacer',
    estado: 'terminada'
})

// Crear archivo tareas.json
let stringTareas = JSON.stringify(tareas, null, " ");
fs.writeFileSync("./tareas.json", stringTareas);

// Leer el archivo tareas.json con el módulo fs
let tareasJson = fs.readFileSync('./tareas.json', 'utf-8');

// Parseamos el archivo de tareas.json
tareas = JSON.parse(tareasJson);

// Hacer funcion listarTodas
function listarTodas() {
    console.log("*** todas ***")
    for (let i = 0; i < tareas.length; i++) {
        console.log("Tarea: ", tareas[i].titulo, " (", tareas[i].estado, ")");
    }
}

// Hacer funcion listarNoTerminadas
function listarNoTerminadas() {
    console.log("*** terminadas ***");
    for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].estado == 'pendiente' || tareas[i].estado == 'en progreso')
            console.log("Tarea: ", tareas[i].titulo, " (", tareas[i].estado, ")");
    }
}

listarTodas();
listarNoTerminadas();

// mostrar tareas por estado
function mostrarPorEstado(estado) {
    console.log("*** tareas en estado", estado, "***");
    for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].estado === estado)
            console.log("Tarea: ", tareas[i].titulo);
    }
}

mostrarPorEstado("pendiente");
mostrarPorEstado("en progreso");
mostrarPorEstado("terminada");