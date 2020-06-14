# Aplicación de Tareas

Es un simple gestor de tareas.

## Installation

1. Clone repository

```bash
git clone git@github.com:gerisg/curso-js.git
```
2. Build container
```bash
docker build -t task-app .
```
3. Run application with Docker
```bash
docker run -ti -v $(pwd)/tareas.json:/home/node/tasks/tareas.json task-app app.js [action] [params]
```

## Usage

```bash
node app.js [action] [params]
```

``` bash
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
