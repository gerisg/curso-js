# M6 - MySQL

Este archivo contiene un resumen del módulo referido a MySQL del curso Programación Full Stack de Digital House.

## Sequelize

Object Relational Mapper --> transforma la información de los pedidos a objetos.

### Instalación

Se debe instalar sequelize y los paquetes con soporte para mysql porque el ORM soporta múltiples bases de datos.

```sh
npm i sequelize mysql2
```

Herramienta para ejecución por consola.

```sh
npm i sequelize-cli -g
```

### Configuración


1. Se debe crear un archivo __.sequelizerc__ que permite configurar Sequelize. El archivo deberá tener el siguiente contenido y encontrarse en el root de la aplicación.

```javascript
const path = require('path')
module.exports = {
  'config': path.resolve('./database/config', 'config.json'),
  'models-path': path.resolve('./database/models'),
  'migrations-path': path.resolve('./database/migrations'),
  'seeders-path': path.resolve('./database/seeders')
}
```


__2. Luego se deberá ejecutar el siguiente comando para crear la estructura de archivos.__

```sh
sequelize init
```

Dentro del directorio _database_ encontrará los siguientes archivos:

- config: configuración de sequelize
- models: el modelado de las entidades de la aplicación
- migrations: archivos que permiten aplicar los cambios del modelo en la base de datos
- seeders: archivos que permiten generar e insertar información de prueba en la base de datos


__3. Editar el archivo config/config.json con la siguiente información:__

| Propiedad    | Valor                      |
| ------------ | -------------------------- |
| username     | Nombre de usuario de la DB |
| password     | Contraseña de la DB        |
| database     | Nombre de la base de datos |
| host         | IP de la base de datos     |
| dialect      | Dialecto de la DB          |
| define       | Parámetros adicionales     |

Por lo general cuando trabajemos con MySQL vamos a agregar los siguientes parámetros adicionales a la configuración.

```json
    "define": {
      "timestamps": false,
      "underscored": true
    }
```


__4. A continuación algunos comandos de MySQL que son necesarios para crear un usuario y lograr la conexión a la base de datos.__

¿Cómo loguear como root?

```sh
mysql -u root -p
```

¿Cómo crear un nuevo usuario?

```sql
CREATE USER 'nombre_usuario'@'localhost' IDENTIFIED BY 'contrasena_usuario';
```

¿Cómo asignar permisos al nuevo usuario?

```sql
GRANT ALL PRIVILEGES ON * . * TO 'nombre_usuario'@'localhost';
FLUSH PRIVILEGES;
```

Los permisos posibles son ALL PRIVILEGES, CREATE, DROP, DELETE, INSERT, SELECT, UPDATE, GRANT OPTION.

El primer __*__ puede ser reemplazado por el nombre de una base de datos para limitar el acceso.

El segundo __*__ puede ser reemplazado por el nombre de una tabla para limitar el acceso.

¿Cómo eliminar un usuario?

```sql
DROP USER ‘usuario_prueba’@‘localhost’;
```

¿Cómo loguear con el nuevo usuario?

```sh
mysql -u nombre_usuario -p
```


__5. Crear la base de datos (con el nombre que colocamos en la configuración).__

Debemos ejecutar el siguiente comando en la consola.

```sh
sequelize db:create
```


__6. Crear un modelo__

Para generar el model se requiere el nombre del modelo (conveniente colocarlo en mayúscula para que se setee el nombre de la clase como tal), y los atributos separados por __':'__ del valor y con __','__ entre sí.

```sh
sequelize model:generate --name Movie --attributes title:string,rating:decimal,awards:integer
```

Tener en cuenta que el modelo generado quedará en la carpeta _models_ y además generará el archivo de migración en la carpeta _migrations_.

Abrir el modelo creado y modificar las variables necesarias de acuerdo a la siguiente nomenclatura:

- Model: Minúscula. Singular.
- class: Capitalizado. Singular.
- modelName: Minúscula. Singular. 
- tableName: Minúscula. Plural. 

__7. Crear la tabla en la base de datos__

Utilizando el archivo de migración generado en el paso anterior, deberemos verificar que el nombre de la tabla se encuentre indicado en minúscula para seguir con la nomenclatura estándar de MySQL y luego ejecutar el siguiente comando.

```sh
sequelize-cli db:migrate
```

__8. Insertar un registro en la base de datos__

El comando anterior generará un archivo en la carpeta _seeders_. Este archivo puede ser completado con información similar al siguiente ejemplo para insertar un registro en la tabla previamente creada. 

```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        password: '123pass321'
      }], {});
  },
down: (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
```

Una vez verificada la información que se desea insertar se debe ejecutar el siguiente comando:

```sh
sequelize-cli db:seed:all
```

### Asociaciones

[TODO]

### Consultas

La siguiente tabla resume algunas de las consultas más comunes.

| Consulta | Descripción |
| - | - |
| findAll() | Buscar todos los elementos que cumplan con la condición. |
| findOne() | Retorna un sólo resultado |
| findByPk() | Busca por primary key (id) |
| count() | Cuenta los resultados sin traer el detalle |
| findAndCountAll() | [Documentación](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAndCountAll) |


#### Ejecución con Promesas

El siguiente es un ejemplo de una consulta ejecutada con promesas.

```    
model.findAll({
    where: { title: req.query.q }
}).then(results => {
    // Atajamos si no hay resultados
    if (results.length) {
        // Hay resultados
    } else {
        // No hay resultados
    }
}).catch(error => {
    // Hacemos algo con el error
});
```

#### Operadores

Los operadores son necesarios requerirlos porque Sequelize soporta varios tipos de base de datos y los operadores cambian entre ellas.

[Ver más info](https://sequelize.org/master/manual/model-querying-basics.html#operators)
    
```
const { Op } = require("sequelize");

movie.findAll({
    where: { title: { [Op.like] : `%${req.query.q}%` } }
})
```

#### Links útiles

- [Seleccionando campos específicos](https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries)

- [Ordenando](https://sequelize.org/master/manual/model-querying-basics.html#ordering)

- [Paginando](https://sequelize.org/master/manual/model-querying-basics.html#limits-and-pagination)

