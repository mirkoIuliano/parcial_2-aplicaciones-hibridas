import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function UserById() {

    // tomamos el id que viene por url
    const { id } = useParams();

    const [user, setUser] = useState([]) // estado para almacenar la lista de usuarios
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga

    // función para obtener al usuario por id
    const fetchUserById = async (id) => {
        try {

            const endPoint = `http://127.0.0.1:3000/api/usuarios/${id}`

            const response = await fetch(endPoint)

            if (!response.ok) {
                console.error("Error al obtener usuario:", response)
                return;
            }
            const data = await response.json()

            // console.log(data)

            setUser(data.usuario) 
            setLoading(false) 

        } catch (error) {
            console.error("Error del servidor:", error)
            alert(`Error al obtener usuario con id: ${id}`)
        }
    };

    // ejecutamos la función 'fetchUserById' cuando el componente se monta
    useEffect(() => {
        fetchUserById(id);
    }, []);

    // Formateo de fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    return (
        <div>
            <h2>{user.name}</h2>

            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando usuario...</p>
            ) : ( // si loading es false aparecen las card
                <div className="card-container d-flex flex-wrap">
                            <div className="card" style={{ width: "35rem", margin: "auto" }} key={user._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{user._id}</h6>
                                    <h6 className="card-subtitle mb-2">Mail: {user.email}</h6>
                                    <h6 className="card-subtitle mb-2">Contraseña: {user.password}</h6>
                                    <h6 className="card-subtitle mb-2">Fecha de creación: {formatDate(user.createdAt)}</h6>
                                </div>
                            </div>
                </div>
            )}
        </div>
    );

}

export default UserById;

