# Aplicación de Tareas

Es un simple gestor de tareas.

## Installation

Clonar el repositorio

```bash
git clone git@github.com:gerisg/curso-js.git
```



## Usage

``` bash
node app.js [action] [params]


crear titulo [descripcion] [estado]
    # Crear una tarea con el nombre "titulo". Parámetros opcionales: descripcion, estado.

completar titulo
    # Pasar una tarea al estado "terminada".

borrar titulo
    # Eliminar una tarea.

listar [estado]
    # Listar tareas en el estado indicado. Si no se indica estado mostrará todas las tareas.

detalle titulo
    # Visualizar la descripcion de una tarea.

```

## Backlog

- Crear tests unitarios
- Soportar containers
