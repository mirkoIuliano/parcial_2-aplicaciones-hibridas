import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";


function AllUsers() {

    const [users, setUsers] = useState([]) // estado para almacenar la lista de usuarios
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga
    const location = useLocation(); // obtener la ubicación actual

    // función para obtener todos los usuarios
    const fetchUsers = async () => {
        try {

            const endPoint = 'http://127.0.0.1:3000/api/usuarios'

            const response = await fetch(endPoint)

            if (!response.ok) {
                console.error("Error al obtener usuarios:", response)
                return;
            }

            const data = await response.json()

            setUsers(data.usuarios) // guardamos los datos en el estado 'users'
            setLoading(false) // cambiamos el estado de carga a 'false'


            // estos siguientes 2 console.log son para ver la diferencia entre data y data.usuarios. Básicamente hago esto porque cuando hago el fetch me trae un objeto con dos cosas: un objeto mensaje y un objeto usuarios con un Array que dentro tiene objetos, que son los usuarios con sus datos   
            // console.log(data) // data sería el objeto entero con mensaje y usuarios
            // console.log(data.usuarios) // acá estaría entrando específicamente al objeto usuarios de data 

        } catch (error) {
            console.error("Error del servidor:", error)
            alert('Error al obtener usuarios')
        }
    };

    // ejecutamos la función 'fetchUsers' cuando el componente se monta
    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <div>
            <h2>Lista de todos los Usuarios</h2>

            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando usuarios...</p>
            ) : ( // si loading es false aparecen las card
                <div className="card-container d-flex flex-wrap">
                    {users.length > 0 ? ( // si users tiene algo entonces imprime las card
                        users.map((user) => (
                            <div className="card" style={{ width: "18rem", margin: "10px" }} key={user._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>

                                    {/* Mostrar el enlace solo si no estamos en "/usuarios/detalles" */}
                                    {
                                        location.pathname === "/usuarios/detalles" ? (
                                            <Link to={`/usuarios/detalles/${user._id}`}>Detalle</Link>
                                        ) : ("")
                                    }

                                    {
                                        location.pathname === "/usuarios/eliminar" ? (
                                            <DeleteButton 
                                                endPoint="usuarios" 
                                                id={user._id} 
                                                text="Borrar usuario" 
                                                refresh={fetchUsers} // pasamos esta función como prop para que después de eliminar se refreshee la página
                                            />
                                        ) : ("")
                                    }

                                    {
                                        location.pathname === "/usuarios/editar" ? (
                                            <Link to={`/usuarios/editar/${user._id}`}>Editar</Link>
                                        ) : ("")
                                    }
                                    
                                    
                                </div>
                            </div>
                        ))
                    ) : ( // si users no tiene nada aparece un mensje indicando que no existen usuarios todavía
                        <p>No hay usuarios disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );

}

export default AllUsers;

