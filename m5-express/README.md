# M5 - Express

Este archivo contiene un resumen del módulo referido a Express del curso Programación Full Stack de Digital House.

## Sistema de ruteo

```javascript
const router = express.Router();

// Pedirle datos al servidor. Viajan por URL. Pueden ser cacheados. Datos no sensibles.
router.get('/ruta/:parametro', controller.methodToGet);

// Enviarle datos al servidor. Viajan en el body. No son cacheados. Datos sensibles. Se reenvían al recargar un sitio.
router.post('/ruta/:parametro', controller.methodToGet);

// Reemplazar información existente.
router.put('/ruta/:parametro', controller.methodToGet);

// Borrar un registro.
router.delete('/ruta/:parametro', controller.methodToGet);

module.exports = router;
```

### Parámetros

- Los parámetros enviados en las **rutas** se leen con: ``` req.params.nombre ```
- Los parámetros enviados por GET en la **query** se leen con: ``` req.query.key ```
- Los parámetros enviados por POST se leen con:  ``` req.body.name ```

## Modelo Vista Controlador

Los Controllers son los intermediarios entre los requerimientos que provienen de las Views y los datos que se encuentran modelados en los Models.

### Controladores

Los controladores siguen la nomenclatura ```entityNameController.js``` y su contenido consiste en funciones que contienen la lógica del negocio.

```javascript
module.exports = {
	method_name: (req, res) => { /* your code here */ }
}
```

### Express Generator

Es una herramienta para generar la estructura del proyecto e instalar las dependencias más utilizadas.

#### Instalar

```sh
npm i express-generator -g
```

#### Generar proyecto EJS

```sh
express MY-APP-NAME --ejs
cd MY-APP-NAME
npm install
nodemon bin/www
```

### Motores de vistas

Instalar el motor de vistas EJS
```sh
npm i ejs
```

#### Configurar

Motor de vistas a utilizar:
```javascript
app.set('view engine', 'ejs')
```
Dónde se encuentran las vistas:
```javascript
app.set('view', __dirname + 'views_folder')
```

Recursos estáticos:
```javascript
app.use(express.static(__dirname + '/public'))
```

#### Ejecución

##### Controlador

En los controllers se van a renderizar las vistas cuando así se requiera y deberá enviarse la información para popular la vista en un objeto literal.

TIP: el contenido se almacena en la property **locals**

```javascript
res.render('path/view_name', { key: value });
```

##### Vistas

Se va a renderizar la vista cuyo path y nombre corresponda con la indicada en el método render del controlador y la vista recibirá los parámetros con el nombre indicado en el objeto literal.

EJS utiliza tags especiales para insertar javascript dentro del HTML que conforma la página web.

| Tag    | Descripción               |
| ------ | ------------------------- |
| <% %>  | Código JavaScript         |
| <%= %> | Mostrar valores dinámicos |
| <%- %> | Escribir includes         |

### Procesamiento POST

Siempre es necesario que esten encerradas en un formulario con las siguientes caracteristicas:

1. method=POST
2. action='/path/service?query=value'
3. propiedad 'name' en los elementos del form será utilizada para obtener los parámetros del body
	
#### Configuración Express

```javascript
// Convierte a objeto literal el contenido del formulario
app.use(express.urlencoded({ extended: false }));
// Habilita la conversión a formato json
app.use(express.json());
```

#### Controlador

La ejecución en el controlador de un request POST suele finalizar con un redireccionamiento a donde queremos llevar al usuario luego de que se guardaron los datos.

```javascript
res.redirect('/path')
```

### Procesamiento PUT y DELETE

Estos métodos no son soportados por HTML5 entonces los formularios se enviarán con method=POST y usaremos Method Override para hacer un reemplazo del method del lado del servidor.

#### Instalar method-override

```sh
npm i method-override
```

#### Configurar en Express

Se deberá configurar cuál es el nombre del parámetro que usaremos en el query string para enviar el método que deseamos utilizar.

```javascript
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
```

#### Uso en las vistas

Los formularios tendrán un query param con el nombre configurado. Es común utilizar **_method**.

```
action=/path/service?_method=PUT
action=/path/service?_method=DELETE
```

### Manejo de Errores

Es posible utilizar un middleware para atrapar las páginas no encontradas.

```javascript
app.use((req, res, next) => { res.status(404).render('view-404')})
```

### Manejo de rutas

Siempre que debemos escribir rutas se recomienda utilizar PATH principalmente para convertir una ruta relativa a una ruta absoluta.

```javascript
const path = require('path');
path.join(__dirname, '../../path/', 'filename') // concatenar ruta 
path.extname(filename) // obtener la extensión del archivo
path.dirname(filename) // obtener el nombre del directorio
```

### Manejo de archivos

Siempre que debemos leer y escribir archivos se recomienda utilizar FILESYSTEM que posee métodos sincronos y asincronos para estas tareas.

#### Escritura de archivos

Estos métodos sobreescriben el archivo, es decir si ya existía se pierde el contenido original.

```javascript
const fs = require('fs');

// Escritura de contenido
fs.writeFileSync('filename.ext', 'content');
// Escritura de un objeto en formato JSON
fs.writeFileSync('filename.ext', JSON.stringify(objetoLiteral));

// Versiones asíncronas
fs.writeFileSync('filename.ext', 'content');
fs.writeFileSync('filename.ext', JSON.stringify(objetoLiteral));
```

#### Actualización de archivos

Estos métodos agregan contenido, es decir escriben al final.

```javascript
const fs = require('fs');

// Escritura de contenido
fs.appendFileSync('filename.ext', 'content');
// Escritura de un objeto en formato JSON
fs.appendFileSync('filename.ext', JSON.stringify(objetoLiteral));

// Versiones asíncronas
fs.appendFileSync('filename.ext', 'content');
fs.appendFileSync('filename.ext', JSON.stringify(objetoLiteral));
```

#### Lectura de archivos

Estos métodos permiten leer el contenido de un archivo.

```javascript
const fs = require('fs');

// Lee el contenido y lo convierte a objeto literal
// TIP: no olvidar el encoding
JSON.parse(fs.readFileSync('filename.ext', 'utf-8'));
```

### Hashing

Las contraseñas nunca deben ser guardadas en la base de datos en formato plano ya que si alguien accede al servidor podría hacerse con esta información sensible.

```sh
npm i bcrypt
```

Utilizamos bcrypt (o bcryptjs) para encriptar un texto (la contraseña) y guardaremos el hash que se genera. Esto lo vamos a estar utilizando en el procesamiento del formulario de creación de usuario, como en el de actualización.

```javascript
const bcrypt = require('bcrypt');
let passEncriptada = bcrypt.hashSync('password', 10);
```

Cuando un usuario desee iniciar sesión estará enviando a través de un formulario de tipo POST su contraseña en formato texto. Existe una función que permite determinar si el texto plano se corresponde con el hash almacenado y de esta manera podemos determinar si el password es correcto. 

```javascript
let check = bcrypt.compareSync('password', passEncriptada);
```

### Subida de archivos

Cuando necesitemos subir archivos al servidor lo haremos a través de los formularios, sin embargo tendrán una configuración de encoding específica y del lado del servidor se requiere un tratamiento utilizando la librería multer.

#### Instalar Multer

```sh
npm i multer
```

#### Configuración en Express

La siguiente configuración deberá ser realizada en los Routers.

```javascript
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/entity'),
    filename: (req, file, callback) => {
        callback(null, 'entity-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });
```

#### Configuración en rutas

Multer se guarda en la variable **upload** y se setea como middleware en todas las rutas donde se requiera subir archivos

```javascript
app.post('/ruta', upload.any(), controller.methodName);
app.post('/ruta', upload.single('image'), controller.methoName);
```

#### Configuración en las vistas

Los formularios que requieren subir archivos deben tener un encoding específico y utilizar inputs de tipo **file**.
```javascript
enctype="multipart/form-data"
```
```html
<input type="file">
```

### Middlewares

Son funciones que se ejecutan antes de ejecutar el controlador.

#### Estructura

```javascript
(req, res, next) => {
    // código
    next();
}
```

#### Tipos

- De aplicación: corren con cada request ``` app.use(middleware) ```
- De ruteador: corren para todas las rutas de un archivo de rutas ``` router.use(middleware) ``` Específicamente desde donde se define hacia abajo.
- De ruta: Corren en una ruta específica ``` router.get('/', middleware1, middleware2, controller.action); ```

### Validaciones

Es importante la validación de los formularios para asegurar que llega al controlador sólo la información en el formato esperado y si no es así avisarle al usuario para que lo corrija.

#### Instalar express-validator

```sh
npm i express-validator 
```

#### Crear Validaciones

Las validaciones pueden ser realizadas en un archivo entity-validator que luego será importado en el ruteador, o bien directamente en las rutas.

Si las funciones existentes no son suficientes para evaluar el campo es posible utilizar el método custom y realizar la evaluación de value.

```javascript
const { check } = require('express-validator'); 
    
module.exports = {
    nameForm: [
        check('fieldname')
            .notEmpty().withMessage('your error message').bail(),
            .custom(value => { return evaluated_condition }).withMessage('your error message')
    ]
}
```

#### Chequear en controladores

En los métodos del controlador que procesan los formularios se debe chequear si existen errores de validación. Si existen errores se renderiza la vista del formulario con los errores y datos ingresados por el usuario como parámetros. Si no existen errores se procesa la lógica de negocio del controlador.

```javascript
const { validationResult } = require('express-validator');

let errors = validationResult(req);
// Existen errores?
errors.isEmpty()
// Errores en formato objeto literal por fieldname
errors.mapped()
// Errores en formato array
errors.errors()
```

#### Mostrar errores

En las vistas debemos mostrar los errores que se encontraron en cada uno de los campos del formulario. Se agregará una clase para mostrar el input en un formato que destaque que algo tiene un error y se mostrará el mensaje correspondiente.

TIP: utilizar locals.errors para verificar si existe la variable errors ya que la primera vez que se carga el formulario no va a existir.

```javascript
<p class="<%= locals.errors && errors.fieldname ? 'is-danger' : '' %>">
    <%= locals.errors && errors.fieldname ? errors.fieldname.msg : '' %>
</p>
```

### Sesiones de Usuario

Las sesiones viven en el servidor y son seguras.

#### Instalar express-session

```sh
npm i express-session 
```

#### Configuración en express

```javascript
const session = require('express-session')
app.use(session({
    secret: 'secret-key',
    resave: false, // no vuelve a guardar si no hay cambios
    saveUninitialized: true, // guarda sessiones aunque todavía no haya datos
}));
```

#### Uso de session

- Escribir una propiedad en la sesión ``` req.session.value = value ```
- Leer una propiedad existente en la sesión ``` let value = req.session.value ```
- borrar la sesión: ``` req.session.destroy(); ```

### Cookies

Las cookies viven del lado del usuario por lo tanto son inseguras. No deberían revelar información del sistema.

#### Instalar express-session

```sh
npm i cookie-parser
```

#### Configuración en express

```javascript
var cookieParser = require('cookie-parser')
app.use(cookieParser())
```

#### Escritura de cookie

Escribimos la cookie en el parámetro _res_. Se sugiere utilizar algún método de encriptación para la misma y almacanerla relacionada con el ID del usuario para poder desencriptarla cuando sea necesario.

```javascript
const token = crypto.randomBytes(64).toString('base64');
res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
usersTokensModel.create({ userId: user.id, token });
```

#### Lectura de cookie

Leemos la cookie en el parámetro _req_ indicando el nombre que utilizamos para la misma al momento de crearla.

```javascript
req.cookies.userToken
```

#### Limpieza de cookie

Cuando el usuario cierra la sesión podemos optar por eliminar las cookies haciendo uso del parámetro clearCookie.

```javascript
res.clearCookie('userToken');
```