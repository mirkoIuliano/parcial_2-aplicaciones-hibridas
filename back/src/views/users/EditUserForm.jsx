// este archivo sirve para hacer el fomrulario para editar un usuario

import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

const EditUserForm = () => {

    // inicialización de useNavigate
    const navigate = useNavigate();

    // tomamos el id que viene por url
    const { id } = useParams(); 

    const [user, setUser] = useState([]) // estado para almacenar la lista de usuarios
    const [loading, setLoading] = useState(true) // estado para mostrar indicador de carga

    // Defino los estados
    const [formData, setFormData] = useState({ name: '', email: '', password: '' }) // Inicializamos formData como un objeto con tres propiedades (name, email, password), cada una con un valor inicial vacío (''). Usamos useState para crear este estado y setFormData nos permitirá actualizarlo más adelante cuando el usuario complete el formulario

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

            console.log(data)

            setUser(data.usuario)
            setFormData({name: data.usuario.name, email: data.usuario.email, password: data.usuario.password})
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
            console.log("se envio el formulario")
            console.log(formData)

            /*---------- Conectamos a nuestra API ----------*/
            const endPoint = `http://127.0.0.1:3000/api/usuarios/${id}`


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


            navigate('/usuarios/editar')

        } catch (error) {
            console.log(error)
            alert('Error del Servidor')
        }

    }

    return (
        <div>
            <h2>Editar Usuario</h2>
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
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={handleChange} value={formData.email} />
                </div>

                <div className="divForm">
                    <label htmlFor="password">Conrtaseña</label>
                    <input type="password" name="password" onChange={handleChange} value={formData.password} />
                </div>


                <button type="submit">Editar</button>
            </form>
            )}
        </div>
    )
}

export default EditUserForm