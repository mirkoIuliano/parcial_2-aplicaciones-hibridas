const {Subject} = require('../models/SubjectModel')
const {Student} = require('../models/StudentModel')
const mongoose = require('mongoose')


/*---------- Funciones para el CRUD ----------*/

/* Función para traer a todas las materias */
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json({mensaje: "Se obtuvo el listado de materias de manera correcta", materias:subjects})
    } catch (error){
        console.error(error)
        res.status(500).json( { mensaje: 'Ocurrió un error al buscar las materias', error: error})
    }
}


/* Función para crear materia */
const createSubject = async (req, res) => {
    try {
        const { name, studentId } = req.body;

         // validamos que no haya ningún dato vacío
         if (!name || !studentId) {
            return res.status(400).json({mensaje: 'Faltan parámetros obligatorios', data_recibida : {name, studentId}})
        }

        // validamos si el studentId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${studentId}`})
        }

        // validamos si el estudiante con el studentId proporcionado existe
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({mensaje: `No se encontró un estudiante con el id ${studentId}`})
        }

        // creamos una nueva instancia del modelo Subject
        const newSubject = new Subject({
            name,
            student: studentId // guardamos la referencia al estudiante
        });
        // usamos el método save de mongoose para guardar el documento a la Base de Datos
        await newSubject.save();
        res.status(200).json({mensaje: 'Materia nueva creada exitosamente', materia_nueva: newSubject})
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'Ocurrió un error al crear la materia', error: error})
    }
}


/* Función para encontrar materia por id */
const getSubjectsByUserId = async (req, res) => { 
    try {
        const id  = req.params.id;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`});
        }

        const subjects = await Subject.find({ student: id }).populate('student'); 


        // validamos si encuentra materias o no
        if (subjects.length === 0){
            return res.status(404).json({mensaje: `No se encontraron materias del estudiante con el id ${id}`})
        }

        // si se enecuntra devolvemos un mensaje de éxito
        res.status(200).json({mensaje: "Se trajeron las materias correctamente", materias: subjects})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al buscar las materias para el estudiante con el id ${id}`, error: error})
    }
}


/* Función para borrar una materia */
const deleteSubjectById = async (req, res) => { 
    try {
        const id  = req.params.id;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`});
        }

        // findByIdAndDelete busca por id y elimina, y devuelve el documento eliminado
        const deletedSubject = await Subject.findByIdAndDelete(id);

        // validamos si la materia se encontró y se pudo borrar
        if (!deletedSubject) {
            return res.status(404).json({mensaje: `No se encontró la materia con el id ${id}`})
        } 

        res.status(200).json({mensaje: `Se eliminó la materia con id ${id} correctamente`, materia_borrada: deletedSubject})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al intentar eliminar la materia con el id ${id}`, error: error})
    }
}


/* Función para actualizar una materia */
const updateSubjectById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { name } = req.body;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`});
        }

        // con findByIdAndUpdate busca por id y lo actualiza
        const updatedSubject = await Subject.findByIdAndUpdate(id, {name}, {new:true}); 
    
        // validamos que exista la materia con el id
        if (!updatedSubject) {
            return res.status(404).json({mensaje: `No se encontró la materia con el id ${id}`})
        }

        res.status(200).json({mensaje: `Se actualizó la materia con id ${id} correctamente`, datos_actualizados: {updatedSubject}})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al intentar actualizar los datos de la materia con el id ${id}`})
    }
}


/* Función para filtrar por nombre de materia y buscar todos los alumnos que están en ella */
const getStudentsBySubject = async (req, res) => {
    try {
        const subjectName = req.params.subject

        // validamos que se esté enviando el nombre de la materia
        if (!subjectName) {
            return res.status(400).json({mensaje: 'El nombre de la materia es obligatorio'})
        }

        // buscamos la materia por su nombre y hacemos un populate para obtener los alumnos que están en ella
        const subjects = await Subject.find({ name: subjectName }).populate('student')

        // validamos si encuentra una materia o no
        if (subjects.length === 0) {
            return res.status(404).json({mensaje: `No se encontraron materias con el nombre: ${subjectName}`})
        }

        // extraemos los alumnos de las materias encontradas
        const studentsInSubject = subjects.map(subject => subject.student)

        res.status(200).json({mensaje: `Estudiantes en la materia ${subjectName}`, alumnos: studentsInSubject})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: 'Ocurrió un error al buscar los alumnos por materia', error: error})
    }
};

// exportamos las funciones
module.exports = {getSubjects, createSubject, getSubjectsByUserId, deleteSubjectById, updateSubjectById, getStudentsBySubject}