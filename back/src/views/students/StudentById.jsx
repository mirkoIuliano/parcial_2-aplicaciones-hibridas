import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function StudentById() {

    // tomamos el id que viene por url
    const { id } = useParams();

    const [student, setStudent] = useState([]) // estado para almacenar la lista de alumnos
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga

    // función para obtener todos los alumnos
    const fetchStudentById = async (id) => {
        try {

            const endPoint = `http://127.0.0.1:3000/api/alumnos/${id}`

            const response = await fetch(endPoint)

            if (!response.ok) {
                console.error("Error al obtener alumno:", response)
                return;
            }
            const data = await response.json()

            console.log(data)

            setStudent(data.alumno) 
            setLoading(false) 

        } catch (error) {
            console.error("Error del servidor:", error)
            alert(`Error al obtener alumno con id: ${id}`)
        }
    };

    // ejecutamos la función 'fetchStudentById' cuando el componente se monta
    useEffect(() => {
        fetchStudentById(id);
    }, []);

    // Formateo de fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    // Convertimos la fecha de nacimiento en un formato legible
    const birthdate = new Date(student.birthdate).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return (
        <div>
            <h2>{student.name} {student.last_name}</h2>

            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando alumno...</p>
            ) : ( // si loading es false aparecen las card
                <div className="card-container d-flex flex-wrap">
                            <div className="card" style={{ width: "35rem", margin: "auto" }} key={student._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{student.name} {student.last_name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{student._id}</h6>
                                    <h6 className="card-subtitle mb-2"> Año de cursada: {student.school_year}</h6>
                                    <h6 className="card-subtitle mb-2"> Fecha de nacimiento: {birthdate}</h6>
                                    <h6 className="card-subtitle mb-2">Fecha de creación: {formatDate(student.createdAt)}</h6>
                                </div>
                            </div>
                </div>
            )}
        </div>
    );

}

export default StudentById;

