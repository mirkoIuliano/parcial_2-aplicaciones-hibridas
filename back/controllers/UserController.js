const {User} = require('../models/UserModel')
// importamos la librería bcrypt para encriptar la contraseña 
const bcrypt = require('bcrypt')
// para usar variables de entorno tengo importamos el archivo '.env'. En él, está la SECRETKEY que vamos a usar
const dotenv = require('dotenv')
dotenv.config()
// creamos la clave privada y hacemos que sea igual a la variable de entorno SECRETKEY
const secretKey = process.env.SECRETKEY
// creamos la const salt que va a tener el número de dificultad de encriptación que queremos
const salt = 10;
// para el toquen y la atuenticación primero importamos ela libreria jsonwebtoken
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


/*---------- Funciones para el CRUD ----------*/


/* Función para traer a todos los usuarios */
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({mensaje: "Se obtuvo el listado de usuarios de manera correcta", usuarios:users})
    } catch (error){
        console.error(error)
        res.status(500).json( { mensaje: 'Ocurrió un error al buscar los usuarios', error: error})
    }
}


/* Función para encontrar usuario por id */
const getUserById = async (req, res) => { 
    try {
        const id  = req.params.id;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`})
        }

        const userById = await User.findById(id); // con este método de mongoose buscamos por id
        // validamos que exista el usuario con el id
        if (!userById) {
            return res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        }
        // si se enecuntra devolvemos un mensaje de éxito
        res.status(200).json({mensaje: "Se trajo al usuario correctamente", usuario: userById})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al buscar usuario con el id ${id}`, error: error})
    }
}


/* Función para crear usuario */
const createUser = async (req, res) => { 
    try {
        const { name, email, password } = req.body; // extraemos del body el name, el email y el password
        
        // validamos que no haya ningún dato vacío
        if (!name || !email || !password){
            return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {name, email, password}})
            // Usamos "return" para asegurarnos de que la función se detenga aquí si falta algún parámetro
        }
        // validamos que el nombre sea mayor a 2 caracteres
        if (name.length < 3) {
            return res.status(400).json({ mensaje: 'El nombre debe tener al menos 3 caracteres', nombre_recibida : {name}})
        }
        // validamos que el email no esté ya en uso con otro usuario
        const userEmail = await User.findOne({ email });
        if (userEmail) { 
            return res.status(400).json({mensaje: 'El email ya está en uso', email_recibido : {email}})
        }
        // validamos que la contraseña sea mayor a 8 caracteres
        if (password.length < 8) {
            return res.status(400).json({ mensaje: 'La contraseña debe ser mayor a 8 caracteres', contraseña_recibida : {password}})
        }
        // encriptamos la contraseña usando la biblioteca bcrypt
        const passwordHash = await bcrypt.hash(password, salt) // usamos el método hash para encriptarla. Este método recibe dos parámetros: la clave que queremos encriptar y el nivel de encriptación que queremos

        // creamos una instancia del modelo User
        const newUser = new User({
            name,
            email,
            password : passwordHash // le estamos diciendo que 'password' queremos que sea igual a 'passwordHash' 
        });
        // usamos el método save de mongoose para guardar el documento a la Base de Datos
        await newUser.save();
        res.status(200).json({mensaje: 'Usuario nuevo creado exitosamente', usuario_nuevo: newUser})
    } catch (error){
        console.error(error)
        res.status(500).json( { mensaje: 'Ocurrió un error al crear el usuario', error: error})
    }
}


/* Función para actualizar datos de un usuario */
const updateUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        const { name, email, password} = req.body;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`})
        }

        // validamos si existe el id del usuario que se está buscando
        const userById = await User.findById(id);
        if (!userById) {
            return res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        }

        // validamos que no haya ningún dato vacío
        if (!name || !email || !password){
            return res.status(400).json({ mensaje: 'Faltan paramtetros obligatorios', data_recibida : {name, email, password}})
        }
        
        // validamos que el nombre sea mayor a 2 caracteres
        if (name.length < 2) {
            return res.status(400).json({ mensaje: 'El nombre debe tener al menos 3 caracteres', nombre_recibida : {name}})
        }
        
        // validamos que la contraseña sea mayor a 8 caracteres
        if (password.length < 8) {
            return res.status(400).json({ mensaje: 'La contraseña debe ser mayor a 8 caracteres', contraseña_recibida : {password}})
        }

        // validamos que el email no esté ya en uso, solo en caso de que lo haya cambiado. Si sigue usando el original está bien
        if (email !== userById.email) { 
            const userEmail = await User.findOne({ email })
            if (userEmail){
                return res.status(400).json({ mensaje: 'El email ya está en uso', email_recibido : {email} })
            }
        }


        // validación de la contraseña
        // primero comparo si la contraseña nueva es igual a la vieja. Si es igual da true y sino false
        const passwordValue = await bcrypt.compare(password, userById.password)
        // creo la variable passwordHash para guardar la nueva constraseña o la vieja, segpun lo que corresponda
        let passwordHash 
        if (!passwordValue){ // si la contraseña es diferente entro
            // hasheo la nueva password 
            passwordHash = await bcrypt.hash(password, salt)
        } else {
            passwordHash = userById.password; // si es la misma guardo en passwordHash la contraseña original
        }

        // una vez hechas todas las validaciones actualizo los datos del usuario
        const updatedUser = await User.findByIdAndUpdate(id, {name, email, password: passwordHash}, {new:true})
        res.status(200).json({mensaje: `Se actualizaron los datos del usuario con id ${id} correctamente`, datos_viejos_del_usuario: userById, datos_actualizados: {updatedUser}})

    } catch (error) {
        console.error(error)
        res.status(500).json( { mensaje: `Ocurrió un error al intentar actualizar los datos del usuario con el id ${id}`, error: error})
    }
}


/* Función para borrar un usuario */
const deleteUserById = async (req, res) => { 
    try {
        const id  = req.params.id;

        // validamos si el id es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({mensaje: `El id proporcionado no es válido: ${id}`})
        }

        // findByIdAndDelete busca por id y elimina, y devuelve el documento eliminado
        const deletedUser = await User.findByIdAndDelete(id)

        // validamos si el user se encontró y se pudo borrar
        if (!deletedUser) {
            return res.status(404).json({mensaje: `No se encontró el usuario con el id ${id}`})
        } 

        res.status(200).json({mensaje: `Se eliminó el usuario con id ${id} correctamente`, usuario_borrado: deletedUser})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error al intentar eliminar el usuario con el id ${id}`, error: error})
    }
}


/* Función para loguearse */
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // validamos si el email existe
        // buscamos un User que tenga el mismo email
        const user = await User.findOne({email : email}) // como respuesta va a dar un objeto tipo JSON con el usuario y sus datos o me devuelve un null si no encuentra
        if(!user){
            return res.status(401).json({mensaje: 'El email no es válido'})
        }

        // validamos si el password es válido, es decir, que coincida la contraseña recién ingresada con la guardada en la Base de Datos
        const passwordValue = await bcrypt.compare(password, user.password)
        if(!passwordValue){
            return res.status(401).json({mensaje: 'La contraseña no es valida'})
        }

        // si todo va bien, generamos el token
        // en la const data vamos a poner los datos que queremos guardar en el token 
        const data = {
            userId : user._id,
            name : user.name
        }
        const token = jwt.sign(data, secretKey, {expiresIn: '12h'}) // usamos el método sign de la librería jsonwebtoken

        res.status(200).json({mensaje: 'Se ingresó con un mail y constraseña correcta', data:{jwt: token}})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: `Ocurrió un error `, error: error})
    }
}


// exportamos las funciones
module.exports = {getUsers, createUser, getUserById, deleteUserById, updateUserById, login}