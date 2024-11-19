const express = require ('express');
const router = express.Router();

const {getStudents, createStudent, getStudentById, deleteStudentById, updateStudentById, getStudentByName, getStudentsByYear} = require('../controllers/StudentController');

// retornar todos los alumnos
router.get('/', getStudents);

// buscar alumno por id
router.get('/:id', getStudentById);

// crear un alumno
router.post('/', createStudent);

// eliminar un alumno por id
router.delete('/:id', deleteStudentById);

// actualizar un alumno por id
router.put('/:id', updateStudentById);

// buscar alumno por su nombre
router.get('/buscar/:name', getStudentByName)

// filtrar por año escolar
router.get('/a%C3%B1o/:school_year', getStudentsByYear)
// a%C3%B1o = año => es por la ñ que es un caracter especial

// exportamos el router
module.exports = router;

