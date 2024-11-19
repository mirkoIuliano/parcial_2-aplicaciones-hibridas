import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";

function AllStudents() {

    const [students, setStudents] = useState([]) // estado para almacenar la lista de alumnos
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga
    const location = useLocation(); // obtener la ubicación actual

    // función para obtener todos los alumnos
    const fetchStudents = async () => {
        try {

            const endPoint = 'http://127.0.0.1:3000/api/alumnos'

            const response = await fetch(endPoint)

            if (!response.ok) {
                console.error("Error al obtener alumnos:", response)
                return;
            }

            const data = await response.json()

            setStudents(data.alumnos) // guardamos los datos en el estado 'students'
            setLoading(false) // cambiamos el estado de carga a 'false'


            // estos siguientes 2 console.log son para ver la diferencia entre data y data.alumnos. Básicamente hago esto porque cuando hago el fetch me trae un objeto con dos cosas: un objeto mensaje y un objeto alumnos con un Array que dentro tiene objetos, que son los alumnos con sus datos   
            // console.log(data) // data sería el objeto entero con mensaje y alumnos
            // console.log(data.alumnos) // acá estaría entrando específicamente al objeto alumnos de data 

        } catch (error) {
            console.error("Error del servidor:", error)
            alert('Error al obtener alumnos')
        }
    };

    // ejecutamos la función 'fetchStudents' cuando el componente se monta
    useEffect(() => {
        fetchStudents()
    }, [])

    return (
        <div>
            <h2>Lista de todos los Alumnos</h2>

            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando alumnos...</p>
            ) : ( // si loading es false aparecen las card
                <div className="card-container d-flex flex-wrap">
                    {students.length > 0 ? ( // si students tiene algo entonces imprime las card
                        students.map((student) => {
                            // Convertimos la fecha de nacimiento en un formato legible
                            // const birthdate = new Date(student.birthdate).toLocaleDateString('es-AR', {
                            //     day: '2-digit',
                            //     month: '2-digit',
                            //     year: 'numeric'
                            // });
                            const birthdate = new Date(student.birthdate).toISOString().split('T')[0];
                            return (
                                <div className="card" style={{ width: "18rem", margin: "10px" }} key={student._id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{student.name} {student.last_name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Año de cursada: {student.school_year}</h6>
                                        <p>Fecha de nacimiento: {birthdate}</p>

                                        {/* Mostrar el enlace solo si estamos en "/alumnos/detalles" */}
                                        {
                                            location.pathname === "/alumnos/detalles" ? (
                                                <Link to={`/alumnos/detalles/${student._id}`}>Detalle</Link>
                                            ) : ("")
                                        }

                                        {
                                            location.pathname === "/alumnos/eliminar" ? (
                                                <DeleteButton
                                                    endPoint="alumnos"
                                                    id={student._id}
                                                    text="Borrar alumno"
                                                    refresh={fetchStudents} // pasamos esta función como prop para que después de eliminar se refreshee la página
                                                />
                                            ) : ("")
                                        }

                                        {
                                            location.pathname === "/alumnos/editar" ? (
                                                <Link to={`/alumnos/editar/${student._id}`}>Editar</Link>
                                            ) : ("")
                                        }

                                    </div>
                                </div>
                            )
                        })
                    ) : ( // si students no tiene nada aparece un mensje indicando que no existen alumnos todavía
                        <p>No hay alumnos disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );

}

export default AllStudents;

