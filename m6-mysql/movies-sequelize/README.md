# Movies with Sequelize

El objetivo de este repositorio es practicar sequelize-cli en el espacio de CoLearning del curso Full Stack de Digital House.

## Links
[Guía de Referencia](https://github.com/gerisg/grupo-5-simpsocks/tree/database/database)
[Documentación Migrations](https://sequelize.readthedocs.io/en/latest/docs/migrations)

## Procedimiento

### Configuraciones Previas

#### Sequelize

1. Debemos crear el archivo __.sequelizerc__ en el directorio root de la aplicación.
2. Colocar el siguiente contenido al archivo:

```sh
const path = require('path');
module.exports = {
  'config': path.resolve('./database/config', 'config.json'),
  'models-path': path.resolve('./database', 'models'),
  'migrations-path': path.resolve('./database', 'migrations'),
  'seeders-path': path.resolve('./database', 'seeders')
};
```
3. Ejecutar el script de inicialización para crear la estructura del proyecto con el siguiente comando: ```sequelize init```

#### Conexión a MySQL

4. Editar el archivo __./database/config/config.json__
5. Colocar datos de conexión con la base de datos: username, password, database, host, dialect.
6. Configuración personalizada en property "define":

    - "charset": "utf8mb4"
    - "collate": "utf8mb4_unicode_ci",  
    - "timestamps": false,
    - "underscored": true,

#### Instalar MySQL con Docker

7. Linux ya trae MySQL instalado, en Windows y Mac existen varias opciones como XAMPP y MAMP. Una alternativa multiplataforma si tienen instalado Docker es bajar una imagen de MySQL.

```sh
docker run -p 3306:3306 --name colearn-dh-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```

8. Verificamos su correcto funcionamiento:

```
docker exec -it colearn-dh-mysql mysql -u root -p
```

### Crear Base de Datos

Para crear una base de datos con el nombre indicado en la configuración utilizamos el siguiente comando: ```sequelize db:create```

[OPCIONAL] --charset 'utf8mb4' --collate 'utf8mb4_unicode_ci'

### Diagrama de Entidad Relación

Primero veamos el modelo de entidad-relación que queremos construir y las relaciones entre sus entidades.

- Entidades: Actor, Movie, Genre
- Relaciones: 
    -   Actor/Movie (n:m relation)
    -   Genre/Movie (1:n relation)

### Crear Modelos

La creación de modelos se realiza con el comando ```sequelize model:generate``` al cuál le debemos pasar el parámetro _name_ con el nombre en formato de Clase (Capitalized y Singular) y el parámetro _attributes_ que consiste en un string donde se separa prop:valor con el caracter __:__ y se separan los atributos con __,__.

```sh
sequelize model:generate --name Name --attributes prop1:datatye,prop2:datatype
```

En nuestro caso quedaría de la siguiente manera:

```
sequelize model:generate --name Actor --attributes first_name:string,last_name:string, rating:decimal
sequelize model:generate --name Movie --attributes title:string,rating:decimal,awards:integer,length:integer,release_date:date
sequelize model:generate --name Genre --attributes name:string,ranking:integer,active:integer
```

Deberemos verificar los modelos generado en la carpeta __models__ y las migraciones generadas en la carpeta __migrations__ para colocar los nombres de las tablas en lowercase y plural, y el nombre del modelo en lowercase y singular.

Finalizada esta operación podemos probar la creación de las tablas en nuestra base de datos y se aconseja asegurar que la operación se deshace correctamente.

```sh
sequelize db:migrate
sequelize db:migrate:undo
```

### Crear Associations

Debemos tener presente que las asociaciones se deben configurar en los modelos y en la base de datos por lo que generaremos migraciones para este fin.

Primero agreguemos las asociaciones que corresponden a cada modelo.

#### Genre - Movie

Models:

__Movie__
```this.belongsTo(models.genre, { foreignKey: 'genre_id' })```
__Genre__
```this.hasMany(models.movie, { foreignKey: 'genre_id' })```

Migrations:

Ejecutamos el siguiente comando para generar un archivo de migración ```sequelize migration:generate --name associate-genre-movie```.

Editamos el archivo de migración y colocamos en este caso la acción que queremos realizar que consiste en agregar la columna __genre_ir__ en la tabla __movies__ y asignarle una referencia a la columna __id__ de la tabla __genres__.

```javascript
await queryInterface.addColumn(
  'movies',
  'genre_id',
  {
    type: Sequelize.INTEGER,
    references: {
      model: 'genres', // name of Target table
      key: 'id', // key in Target table that we're referencing
    }
  }
);
```

#### Actor - Movie

Models:

__Actor__
```this.belongsToMany(models.movie, { through: 'actor_movie' })```
__Movie__
```this.belongsToMany(models.actor, { through: 'actor_movie' })```

Migrations:

Ejecutamos el siguiente comando para generar un archivo de migración ```sequelize migration:generate --name associate-actor-movie```.

Editamos el archivo de migración y colocamos en este caso la acción que queremos realizar que consiste en agregar una nueva tabla y referencias a las tablas que relaciona.

```javascript
await queryInterface.createTable('actor_movie', {
  id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    autoIncrement: true, 
    primaryKey: true 
  },
  actor_id: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'actors', // name of Target table
      key: 'id', // key in Target table that we're referencing
    }
  },
  movie_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'movies', // name of Target table
      key: 'id', // key in Target table that we're referencing
    }
  }
});
```

Es conveniente que cada archivo de migración sea probado tanto para crear la migración como para deshacerla asegurando que funciona correctamente.

```sh
sequelize db:migrate
sequelize db:migrate:undo
```

### Crear seeders

sequelize seed:generate --name genre
sequelize seed:generate --name actor
sequelize seed:generate --name movie
sequelize seed:generate --name actor-movie

### Comandos

Una vez que tenemos creados los archivos de migraciones y seeders resulta muy simple reiniciar una base de datos a sus valores de prueba.

```
db:drop
db:create
db:migrate
db:seed:all
```
