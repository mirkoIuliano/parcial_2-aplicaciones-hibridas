// este archivo sirve para hacer el fomrulario de login

import { useEffect, useState } from "react"

const SerachByName = () => {

    // Defino los estados
    const [formData, setFormData] = useState({ name: '' }) // Inicializamos formData como un objeto con tres propiedades (name, email, password), cada una con un valor inicial vacío (''). Usamos useState para crear este estado y setFormData nos permitirá actualizarlo más adelante cuando el usuario complete el formulario
    const [student, setStudent] = useState({})
    const [hasSearched, setHasSearched] = useState(false); // Nuevo estado


    // creamos esta función que se va a cativar cada vez que se está cambiando en input, y lo que hace es vincular lo que está en el input con el formData
    const handleChange = (e) => {
        const { name, value } = e.target // el name este no es de 'nombre', es del ATRIBUTO name. Con target leemos el valor del input
        // console.log(e.target)
        setFormData({ ...formData, [name]: value })
        // esto lo que dice es que quiero que tenga todo lo anterior (...formData) y algo más --> lo que esté en []

        // con esta función estamos haciendo que el name, email o password que definimos en el useState sea igual al value, osea, igual a lo que el usuairo escribió en el input
        // si escribo en input email va a aparecerme:  
        // e.target sería ==> <input type="text" name="email" value="mirko@gmail.com aaaa">
        // con const {name, vlaue} = e.target estamos haceindo que name sea igual a "email" y value sea igual a "mirko@gmail.com aaaa"
        // cuando hacemos setFormData({...formData, [name]:value})  sería ==> [email]:"mirko@gmail.com aaaa"
        // se está modificandno el const [ formData, setFormData ] = useState({name:'', email: '', password:''}) 
        // emai:'' ahora sería email:"mirko@gmail.com"
    }


    // creamos esta función para que no se recargue la pagina cada vez que enviamos el fomrulario  y para enviar los datos del inputa a nuestra API
    const handleSubmit = async (e) => { // el 'e' sería el evento
        e.preventDefault() // para que no se recargue la pagina
        try {
            setHasSearched(true)
            console.log("se envio el formulario")
            console.log(formData)

            /*---------- Conectamos a nuestra API ----------*/
            const endPoint = `http://127.0.0.1:3000/api/alumnos/buscar/${formData.name}`


            // hacemos el fetch y le enviamos el endPoint y la configuración
            const response = await fetch(endPoint)

            if (!response.ok) // si no me está contestando nada entra al if
            {
                if (response.status === 404) {
                    console.warn("Alumno no encontrado");
                    setStudent({}); // Limpiamos el estado si no se encuentra
                } else {
                    console.error(response)
                }
            }
            
            const data = await response.json()

            // si está todo bien debería sacar la info por consola
            console.log(data)

            setStudent(data.alumno[0])



        } catch (error) {
            console.log(error)
            // alert('Error del Servidor')
        }


    }

    useEffect(() => {
        if (Object.keys(student).length > 0) { // Verifica que el objeto no esté vacío
            console.log(student)
        }
    }, [student]) // Esto solo se ejecutará cuando 'student' cambie

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
            <h2>Buscar alumno por nombre</h2>
            <form onSubmit={handleSubmit} className="card p-4">
                <div className="divForm">
                    <label htmlFor="name">Nombre</label>
                    <input className="" type="text" name="name" onChange={handleChange} value={formData.name} />
                    {/* con value={} vinculamos el input al formData */}
                    {/* esto no funciona como en Vue que si cambiamos uno cambia el otro. Si ponemos arriba en el useStatte sí va a estar impactando en el value={} del input, pero para que el value={} del input afecte al useState necesitamos agregalre un evento
                    React no tiene doble data binding */}
                </div>
                <button type="submit">Buscar</button>
            </form>
            {hasSearched && (
                student && student.name ? (
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
                ) : (
                    <div className="card-container d-flex flex-wrap">
                        <div className="card" style={{ width: "35rem", margin: "auto" }} key={student._id}>
                            <div className="card-body">
                                <h5 className="card-title">No se encontraron datos para el alumno</h5>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default SerachByName