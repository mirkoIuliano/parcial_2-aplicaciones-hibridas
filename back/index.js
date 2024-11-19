/*----- ESTE INDEX LO CREE EN LA CLASE 12 PARA AMOLDARME A LOS CAMBIOS QUE HICIMOS AL PASAR A USAR UNA BD NO SQL, EN LUGAR DE LA 'BD' LOCAL QUE VENIAMOS USANDO -----*/
// el index se encarga solamente de requerir las cosas y llamar a los diferentes archivos
const express = require('express'); // importa el módulo Express

const cors = require('cors')

require('dotenv').config();
// accedemos a la variable de entorno
const port = process.env.PORT; 
/* 
Antes hacíamos así el port: 
const port = 3000; 
Pero ahora lo hacemos con varaibles de entorno (osea que vienen de el archivo .env)
*/

// importamos las rutas
const routerAPI = require('./routes');
/* 
esto es lo mismo que poner así:
const routerAPI = require('./routes/index');
express cuando importamos la carpeta con varios archivos y no específicamos, automáticamente importa el index
*/

/*------- NOS CONECTARNOS A LA BD  -------*/
const db = require('./config/dataBase.js') // importamos la variable con la conexión a la bd del archivo dataBase.js


// importamos express
const app = express(); // crea una instancia de una aplicación Express. Esto te permite definir rutas, middlewares y otras configuraciones para tu servidor



// Middleware para parsear JSON
app.use(express.json()); /* esto las clases anteriores (puedo verlo en clase-9 o en clase-8-ejercicio-7) lo usábamos en la ruta post (para crear un nuevo objeto). Esto es necesario de tenerlo porque sino express no recibe los datos como un JSON
Como lo estamos poniendo en el index.js de la carpeta raíz se va a aplicar a todos los archivos
Sin esto, por ejemplo, en el archivo products-router no funcionaría el post
CLASE 11 21:00 -> es un middleware, osea que cada request que llegue de la app, él va la va a estar procesandolo. Este en específico se encarga de procesar los JSON, de hacer el parseJSON 
*/



// Clase 13: acá estamos definiendo la carpeta para mis archivos estáticos
app.use(express.static('public'))

app.use(cors())

// acá estamos usando el middleware next
app.use( async (req, res, next) => {
    console.log('Soy el middleware'); // Esto sirve como ejemplo para ver que cada vez que haya una petición va a estar este console.log porque el middleware está presente en TODAS las peticiones
    // si queremos hacer validaciones las podemos hacer aquí de esta forma
    // const body = req.body; // de esta manera obtengo el contenido del request para poder después hacer las validaciones que quiera  
    // console.log(body);
    next();
})
/*---------- EXPLICACIÓN DE CHATGPT SOBRE next() ----------*/
/* El next en un middleware de Express es una función que se utiliza para pasar el control al siguiente middleware o ruta en la pila de procesamiento de solicitudes. Es esencial para asegurarse de que la ejecución no se detenga en ese middleware y que la solicitud continúe su flujo normal.

Cómo funciona next
Cuando llamas a next(), le dices a Express que el middleware actual ha terminado su trabajo y que debe pasar el control al siguiente middleware o ruta que coincida con la solicitud.
Si no llamas a next(), la solicitud quedará "atascada" y el cliente no recibirá ninguna respuesta, ya que Express no sabrá que debe continuar con el procesamiento.

Este middleware se ejecuta para todas las peticiones que llegan a la aplicación (app.use lo aplica de forma global). Después de ejecutar console.log('Soy el middleware');, la llamada a next() permite que la solicitud continúe a la siguiente función middleware o ruta definida en tu aplicación. */
/* ---------- FIN DE EXPLICACIÓN ----------*/


// Ruta Raiz -> Acá voy a colocar algo de HTML luego
app.get('/', (req, res) => {
    res.status(200).send('<h1>API REST</h1>');
});


// Todo lo que no sea /home (user, control, categorías, orden) va a caer acá:
// Ahora llamamos a las rutas:
routerAPI(app);  // esta función se va a encarga de registrar y organizar las rutas de tu aplicación
    /* 
    CHAT GPT
    1. routes/index.js: Este archivo probablemente contiene la función routerAPI, la cual se encarga de agregar todas las rutas que tienes definidas en otros archivos (como products-router.js y users-router.js).
    2. routerAPI(app): Cuando llamas a esta función, le estás pasando la instancia de tu aplicación de Express (app), y esta función va a registrar las rutas para que tu servidor pueda manejar las solicitudes a las URLs correspondientes.

    ¿Qué hace routerAPI(app)?
    1. Recibe la aplicación de Express: app es la instancia de tu aplicación de Express, la cual maneja todas las rutas, middleware y lógica del servidor.
    2. Define las rutas: Dentro de la función routerAPI, asocias diferentes rutas (como /products y /users) con sus respectivos manejadores (productsRouter y usersRouter). Esto significa que cuando tu aplicación recibe una solicitud a /products, será manejada por las funciones que estén definidas en products-router.js, y lo mismo para /users.
    3. Registro de rutas: Al ejecutar routerAPI(app), las rutas se "registran" en la aplicación, lo que permite que el servidor responda a las solicitudes que coinciden con esas rutas.

    En resumen, routerAPI(app) es una forma organizada de separar y cargar todas las rutas de tu aplicación en un solo lugar (en este caso, el archivo routes/index.js).

    https://chatgpt.com/share/3bb3742b-fd83-4200-a28d-9b9406079120 -> buscar 'No enteindo muy bien el routerAPI(app)' para ver esta respuesta más extensa
    -> buscnado 'no entiendo bien qué es una instancia de Express ni qué hace Express' voy a ver una respuesta sobre qué hace express y debajo de esta respuesta la diferencia entre usar app.get para crear rutas y router.get para crear rutas 

    */



// El servidor se inicia con la llamada a app.listen()
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    /* 
    app.listen(port, callback) inicia el servidor en el puerto especificado (3000 en este caso). La función de callback se ejecuta cuando el servidor está en funcionamiento, y puedes usarla para imprimir un mensaje en la consola o realizar otras acciones.
    */
})


