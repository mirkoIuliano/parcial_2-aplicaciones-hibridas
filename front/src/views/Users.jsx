import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'

function Users() {

    // /* Variables para columna *Función* de CRUD de USUARIOS */

    // let userGetById = <p className="m-0" >Ver un usuario especifico <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea buscar</span></p>

    // let userPut = <p className="m-0">Para modificar un usuario existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea modificar</span></p>

    // let userDelete = <p className="m-0">Para eliminar un usuario existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea borrar</span></p>

    // let userLogin = <p className="m-0">Para iniciar sesión <br /><span className="fw-semibold text-body-secondary">Requiere email y password</span></p>


    /*---------- Funciones para el button ----------*/
    // inicialización de useNavigate
    const navigate = useNavigate();

    // función para llevar a la vista de todos los usuarios
    const AllUsers = function () {
        navigate('/todos-los-usuarios')
    }
    
    // función para llevar a la vista de todos los usuarios, pero con otra ruta que habilita el botón de Detalle
    const UsersByID = function () {
        navigate('/usuarios/detalles')
    }

    // función para llevar a crear usuario
    const CreateUser = function () {
        navigate('/crear-usuario')
    }

    // función para eliminar usuario
    const DeleteUser = function () {
        navigate('/usuarios/eliminar')
    }
    
    // función para editar usuario
    const EditUser = function () {
        navigate('/usuarios/editar')
    }
    
    // función para editar usuario
    const LoginUser = function () {
        navigate('/usuarios/iniciar-sesion')
    }
    
    const usuarios = [
        {
            method: 'GET',
            methodColor: 'success',
            function: 'Ver todos los usuarios',
            url: 'http://127.0.0.1:3000/api/usuarios',
            button: {
                color: 'success',
                fn: AllUsers,
                text: 'Ver'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: <p className="m-0" >Ver un usuario especifico <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea buscar</span></p>,
            url: 'http://127.0.0.1:3000/api/usuarios/:id',
            button: {
                color: 'success',
                fn: UsersByID,
                text: 'Ver'
            }
        },
        {
            method: 'POST',
            methodColor: 'warning',
            function: 'Para crear un usuario',
            url: 'http://127.0.0.1:3000/api/usuarios',
            button: {
                color: 'warning',
                fn: CreateUser,
                text: 'Crear'
            }
        },
        {
            method: 'PUT',
            methodColor: 'primary',
            function: <p className="m-0">Para modificar un usuario existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea modificar</span></p>,
            url: 'http://127.0.0.1:3000/api/usuarios/:id',
            button: {
                color: 'primary',
                fn: EditUser,
                text: 'Actualizar'
            }
        },
        {
            method: 'DELETE',
            methodColor: 'danger',
            function: <p className="m-0">Para eliminar un usuario existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del usuario que se desea borrar</span></p>,
            url: 'http://127.0.0.1:3000/api/usuarios/:id',
            button: {
                color: 'danger',
                fn: DeleteUser,
                text: 'Eliminar'
            }
        },
        {
            method: 'POST',
            methodColor: 'warning',
            function: <p className="m-0">Para iniciar sesión <br /><span className="fw-semibold text-body-secondary">Requiere email y password</span></p>,
            url: 'http://127.0.0.1:3000/api/usuarios/iniciar-sesion',
            button: {
                color: 'warning',
                fn: LoginUser,
                text: 'Iniciar Sesion'
            }
        },
    ];

    // Notas adicionales de Usuarios:
    // const jsonUsuarios = <p className="fw-medium"> &#123; <br /> "name": "Nombre de usuario",  <span className="fw-semibold text-success">// Mínimo 3 caracteres</span> <br /> "email": "test@gmail.com", <span className="fw-semibold text-success">// No se puede poner un email que ya está en uso</span> <br /> "password": "contraseña" <span className="fw-semibold text-success">// Mínimo 8 caracteres</span> <br /> &#125; </p>

    const notasUsuarios = {
        nombre: "User",
        parametros: "name, email y password",
        json: <p className="fw-medium"> &#123; <br /> "name": "Nombre de usuario",  <span className="fw-semibold text-success">// Mínimo 3 caracteres</span> <br /> "email": "test@gmail.com", <span className="fw-semibold text-success">// No se puede poner un email que ya está en uso</span> <br /> "password": "contraseña" <span className="fw-semibold text-success">// Mínimo 8 caracteres</span> <br /> &#125; </p>
    }

    return (

        <>
            <Table title="Rutas para usar el CRUD de Usuarios" rows={usuarios} notas={notasUsuarios} />
        </>

    );

}

export default Users;