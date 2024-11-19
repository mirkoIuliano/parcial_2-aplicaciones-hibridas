const usersRouter = require ('./users-router')
const studentsRouter = require ('./students-router')
const subjectsRouter = require ('./subjects-router')

function routerAPI(app){
    // verificamos que `app` se pase correctamente aquí
    if (!app || typeof app.use !== 'function') {
        throw new TypeError('La aplicación Express (app) no está definida correctamente.');
    }

    app.use('/api/usuarios', usersRouter);
    app.use('/api/alumnos', studentsRouter);
    app.use('/api/materias', subjectsRouter);
}

// exportamos la función routerAPI
module.exports = routerAPI;