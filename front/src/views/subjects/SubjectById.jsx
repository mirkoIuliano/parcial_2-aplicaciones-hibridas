import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function SubjectById() {

    // tomamos el id que viene por url
    const { id } = useParams();

    const [subject, setSubject] = useState([]) // estado para almacenar la lista de materia
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga

    // función para obtener todos los usuarios
    const fetchSubjectById = async (id) => {
        try {

            const endPoint = `http://127.0.0.1:3000/api/materias/${id}`

            const response = await fetch(endPoint)

            if (!response.ok) {
                console.error("Error al obtener materia:", response)
                return;
            }
            const data = await response.json()

            console.log(data.materias[0])

            setSubject(data.materias[0]) 
            setLoading(false) 

        } catch (error) {
            console.error("Error del servidor:", error)
            alert(`Error al obtener materia con id: ${id}`)
        }
    };

    // ejecutamos la función 'fetchUserById' cuando el componente se monta
    useEffect(() => {
        fetchSubjectById(id);
    }, []);

    // Formateo de fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    return (
        <div>
            <h2>{subject.name}</h2>

            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando materia...</p>
            ) : ( // si loading es false aparecen las card
                <div className="card-container d-flex flex-wrap">
                            <div className="card" style={{ width: "35rem", margin: "auto" }} key={subject._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{subject.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{subject._id}</h6>
                                    <h6 className="card-subtitle mb-2">Nombre de alumno asociado: {subject.student.name} {subject.student.last_name}</h6>
                                    <h6 className="card-subtitle mb-2">ID de alumno asociado: {subject.student._id}</h6>
                                    <h6 className="card-subtitle mb-2">Fecha de creación: {formatDate(subject.createdAt)}</h6>
                                </div>
                            </div>
                </div>
            )}
        </div>
    );

}

export default SubjectById;

