// este archivo sirve para hacer el fomrulario para editar un alumno
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

const EditStudentForm = () => {

    // inicialización de useNavigate
    const navigate = useNavigate();

    // tomamos el id que viene por url
    const { id } = useParams();

    const [student, setStudent] = useState([]) // estado para almacenar la lista de alumnos
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga

    // Defino los estados
    const [formData, setFormData] = useState({ name: '', last_name: '', school_year: '', birthdate: '' })

    // función para obtener al usuario por id
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

            // Convertimos la fecha de nacimiento en un formato legible
            // const birthdate = new Date(data.alumno.birthdate).toISOString().split('T')[0]; // Convierte la fecha a UTC
            // const birthdate = formatoDate(data.alumno.birthdate);
            const birthdate = new Date(data.alumno.birthdate);
            const localDate = new Date(birthdate.getTime() - birthdate.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0];

            setFormData({ name: data.alumno.name, last_name: data.alumno.last_name, school_year: data.alumno.school_year, birthdate: localDate })
            setLoading(false)

        } catch (error) {
            console.error("Error del servidor:", error)
            alert(`Error al obtener alumno con id: ${id}`)
        }
    };

    // ejecutamos la función 'fetchUserById' cuando el componente se monta
    useEffect(() => {
        fetchStudentById(id);
    }, []);




    // creamos esta función que se va a cativar cada vez que se está cambiando en input, y lo que hace es vincular lo que está en el input con el formData
    const handleChange = (e) => {
        const { name, value } = e.target // el name este no es de 'nombre', es del ATRIBUTO name. Con target leemos el valor del input
        // console.log(e.target)
        setFormData({ ...formData, [name]: value })
        // esto lo que dice es que quiero que tenga todo lo anterior (...formData) y algo más --> lo que esté en []
    }

    // creamos esta función para que no se recargue la pagina cada vez que enviamos el fomrulario  y para enviar los datos del input a nuestra API
    const handleSubmit = async (e) => { // el 'e' sería el evento
        e.preventDefault() // para que no se recargue la pagina
        try {
            console.log("se envio el formulario")
            console.log(formData)

            /*---------- Conectamos a nuestra API ----------*/
            const endPoint = `http://127.0.0.1:3000/api/alumnos/${id}`


            const config = {
                headers: { // en el encabezado tenemos que indicarle qué tipo de datos vamos a enviar
                    // acá queremos indicarle al servidor que le estamos enviando un archivo de tipo JSON
                    'Content-type': 'application/json',
                    // acé en el header también habría que enviar la autorización (el JsonWebToken)
                },
                method: 'PUT',
                body: JSON.stringify(formData) // hay que convertirlo a String proque los servidores por lo general no reciben JSON
            }

            // hacemos el fetch y le enviamos el endPoint y la configuración
            const response = await fetch(endPoint, config)

            if (!response.ok) // si no me está contestando nada entra al if
            {
                console.error(response)
            }

            const data = await response.json()

            // si está todo bien debería sacar la info por consola
            console.log(data)

            // esto es para que cuando se envíe el fomrulario se resetee el form y estén todos los campos vacíos
            // setFormData({
            //     name: '',
            //     email: '',
            //     password: '',
            // })

            navigate('/alumnos/editar')

        } catch (error) {
            console.log(error)
            alert('Error del Servidor')
        }

    }

    return (
        <div>
            <h2>Editar Alumno</h2>
            {loading ? ( // si loading es true aparece el mensjae de carga
                <p>Cargando usuario...</p>
            ) : (
                <form onSubmit={handleSubmit} className="card p-4">
                    <div className="divForm">
                        <label htmlFor="name">Nombre</label>
                        <input className="" type="text" name="name" onChange={handleChange} value={formData.name} />
                        {/* con value={} vinculamos el input al formData */}
                        {/* esto no funciona como en Vue que si cambiamos uno cambia el otro. Si ponemos arriba en el useStatte sí va a estar impactando en el value={} del input, pero para que el value={} del input afecte al useState necesitamos agregalre un evento
                    React no tiene doble data binding */}
                    </div>
                    <div className="divForm">
                        <label htmlFor="last_name">Apellido</label>
                        <input type="text" name="last_name" onChange={handleChange} value={formData.last_name} />
                    </div>

                    <div className="divForm">
                        <label htmlFor="school_year">Año de Cursada</label>
                        <input type="number" name="school_year" onChange={handleChange} value={formData.school_year} />
                    </div>

                    <div className="divForm">
                        <label htmlFor="birthdate">Fecha de nacimiento</label>
                        <input type="date" name="birthdate" onChange={handleChange} value={formData.birthdate} />
                    </div>

                    <button type="submit">Editar</button>
                </form>
            )}
        </div>
    )
}

export default EditStudentForm