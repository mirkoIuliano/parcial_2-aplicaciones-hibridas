const mongoose = require('mongoose')
const {Student} = require('../models/StudentModel')


/*---------- Funciones para el CRUD ----------*/


/* Función para traer a todos los alumnos */
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({mensaje: "Se obtuvo el listado de alumnos de manera correcta", alumnos:students})
    } catch (error){
        console.error(error)
        res.status(500).json({mensaje: 'Ocurrió un error al buscar los alumnos', error: error})
    }
}


/* Función para encontrar alumno por id */
const getStudentById = async (req, res) => { 
    try {
        const id  = req.params.id;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`});
        }

        const studentById = await Student.findById(id); // con este método de mongoose buscamos por id
        // validamos que exista el alumno con el id
        if (!studentById) {
            return res.status(404).json({mensaje: `No se encontró el alumno con el id ${id}`})
        }
        // si se enecuntra devolvemos un mensaje de éxito
        res.status(200).json({mensaje: "Se trajo al alumno correctamente", alumno: studentById})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al buscar alumno con el id ${id}`, error: error})
    }
}


/* Función para crear alumno */
const createStudent = async (req, res) => { 
    try {
        const { name, last_name, school_year, birthdate } = req.body;
        
        // validamos que no haya ningún dato vacío
        if (!name || !last_name || !school_year || !birthdate){
            return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {name, last_name, school_year, birthdate}})
        }
        // validamos que el nombre sea mayor a 2 caracteres
        if (name.length < 2) {
            return res.status(400).json({ mensaje: 'El nombre debe tener al menos 2 caracteres', nombre_recibida : {name}})
        }
        // validamos que el aplelido sea mayor a 2 caracteres
        if (last_name.length < 2) {
            return res.status(400).json({ mensaje: 'El apellido debe tener al menos 2 caracteres', nombre_recibida : {last_name}})
        }
        // validamos que el año escolar sea un número
        if (isNaN(school_year)) {
            return res.status(400).json({ mensaje: 'El año escolar debe ser un número', año_escolar_recibido : {school_year}})
        }
        // validamos que el año escolar sea entre primer y sexto año
        if (school_year < 1 || school_year > 6) {
            return res.status(400).json({ mensaje: 'El año de cursada se comprende primer año a sexto año', año_escolar_recibido : {school_year}})
        }
        // validamos que el formato de la fecha sea válido
        const parsedDate = new Date(birthdate)
        if (isNaN(parsedDate.getTime())) { // si el formato no es válido, el método getTime() va a devolver NaN, lo que inidcaría que la fecha está mal
            return res.status(400).json({ mensaje: 'El formato de la fecha es inválido. Debe seguir el siguiente formato: YYYY-MM-DD', fecha_recibida: {birthdate} })
        }

        // creamos una instancia del modelo Student
        const newStudent = new Student({
            name,
            last_name,
            school_year,
            birthdate
        });
        // usamos el método save de mongoose para guardar el documento a la Base de Datos
        await newStudent.save();
        res.status(200).json({mensaje: 'Alumno nuevo creado exitosamente', alumno_nuevo: newStudent})
    } catch (error){
        console.error(error)
        res.status(500).json({mensaje: 'Ocurrió un error al crear el alumno', error: error})
    }
}


/* Función para actualizar datos de un alumno */
const updateStudentById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { name, last_name, school_year, birthdate } = req.body;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`})
        }

        // validamos si existe el id del alumno que se está buscando
        const studentById = await Student.findById(id);
        if (!studentById) {
            return res.status(404).json({mensaje: `No se encontró el alumno con el id ${id}`})
        }

       // validamos que no haya ningún dato vacío
        if (!name || !last_name || !school_year || !birthdate){
            return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {name, last_name, school_year, birthdate}})
        }
        // validamos que el nombre sea mayor a 2 caracteres
        if (name.length < 2) {
            return res.status(400).json({ mensaje: 'El nombre debe tener al menos 2 caracteres', nombre_recibida : {name}})
        }
        // validamos que el aplelido sea mayor a 2 caracteres
        if (last_name.length < 2) {
            return res.status(400).json({ mensaje: 'El apellido debe tener al menos 2 caracteres', nombre_recibida : {last_name}})
        }
        // validamos que el año escolar sea entre primer y sexto año
        if (school_year < 1 || school_year > 6) {
            return res.status(400).json({ mensaje: 'El año de cursada se comprende primer año a sexto año', año_escolar_recibido : {school_year}})
        }
        // validamos que la fecha de nacimiento sea una fecha valida
        if (birthdate && isNaN(Date.parse(birthdate))) {
            return res.status(400).json({ mensaje: "El formato de la fecha de nacimiento es incorrecto" })
        }

        // una vez hechas todas las validaciones actualizo los datos del alumno
        const updatedStudent = await Student.findByIdAndUpdate(id, {name, last_name, school_year, birthdate}, {new:true})
        res.status(200).json({mensaje: `Se actualizaron los datos del alumno con id ${id} correctamente`, datos_viejos_del_alumno: studentById, datos_actualizados: {updatedStudent}})

    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al intentar actualizar los datos del alumno con el id ${id}`, error: error})
    }
}


/* Función para borrar un alumno */
const deleteStudentById = async (req, res) => { 
    try {
        const id  = req.params.id;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`});
        }

        // findByIdAndDelete busca por id y elimina, y devuelve el documento eliminado
        const deletedStudent = await Student.findByIdAndDelete(id);

        // validamos si el alumno se encontró y se pudo borrar
        if (!deletedStudent) {
            return res.status(404).json({mensaje: `No se encontró el alumno con el id ${id}`})
        } 

        res.status(200).json({mensaje: `Se eliminó el alumno con id ${id} correctamente`, alumno_borrado: deletedStudent})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al intentar eliminar el alumno con el id ${id}`, error: error})
    }
}


/* Función para buscar por nombre */
const getStudentByName = async (req, res) => {
    try {
        const name = req.params.name

        // validamos que haya llegado el parámetro
        if (!name){
            return res.status(400).json({mensaje: 'El parámetro "name" es obligatorio'})
        }

        const student = await Student.find({ name });
        
        // validamos que exista el nombre en el modelo Student
        if (student.length === 0) {
            return res.status(404).json({mensaje: `No se ha encontrado un alumno con el nombre: ${name}. Recuerde poner mayúsculas o minúsuclas necesarias`})
        }

        res.status(200).json({mensaje: 'Alumnmo encontrado:', alumno: student})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al intentar encontrar al alumno ${name}`, error: error})
    }
}


/* Función para filtrar por año escolar y buscar todos los alumnos en ese año */
const getStudentsByYear = async (req, res) => {
    try {
        const school_year = parseInt(req.params.school_year)

        // validamos que el año escolar sea un número válido
        if (isNaN(school_year) || school_year < 1 || school_year > 6) {
            return res.status(400).json({ mensaje: 'El año escolar debe ser un número entre 1 y 6' })
        }

        // buscamos alumnos que coincidan con el año escolar
        const students = await Student.find({ school_year })

        // validamos si se encontraron alumnos
        if (students.length === 0) {
            return res.status(404).json({mensaje: `No se encontraron alumnos en el año escolar ${school_year}`})
        }

        res.status(200).json({mensaje: `Se encontraron alumnos en el año escolar ${school_year}:`, alumnos: students})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: 'Ocurrió un error al buscar alumnos por año escolar', error: error})
    }
}

// exportamos las funciones
module.exports = {getStudents, createStudent, getStudentById, deleteStudentById, updateStudentById, getStudentByName, getStudentsByYear}