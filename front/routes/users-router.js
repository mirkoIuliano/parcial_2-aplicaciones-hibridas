const express = require ('express');
const router = express.Router();

const {getUsers, createUser, getUserById, deleteUserById, updateUserById, login} = require('../controllers/UserController');

// retornar todos los usuarios
router.get('/', getUsers);

// buscar usuario por id
router.get('/:id', getUserById);

// crear un usuario
router.post('/', createUser);

// eliminar un usuario por id
router.delete('/:id', deleteUserById);

// actualizar un usuario por id
router.put('/:id', updateUserById);

// loguearse
router.post('/iniciar-sesion', login);

// exportamos el router
module.exports = router;

