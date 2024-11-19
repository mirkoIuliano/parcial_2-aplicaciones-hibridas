const express = require ('express');
const router = express.Router();

const {getSubjects, createSubject, getSubjectsByUserId, deleteSubjectById, updateSubjectById, getStudentsBySubject} = require('../controllers/SubjectController');

// retornar todas las materias
router.get('/', getSubjects);

// buscar todas las materias que tiene un alumno
router.get('/:id', getSubjectsByUserId);

// crear una materia
router.post('/', createSubject);

// eliminar una materia por id
router.delete('/:id', deleteSubjectById);

// actualizar una materia por id
router.put('/:id', updateSubjectById);

// filtrar por materia y buscar todos los alumnos en ella
router.get('/materia/:subject', getStudentsBySubject);

// exportamos el router
module.exports = router;

