import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'

function Students() {

    /* Variables para columna *Función* de CRUD de ALUMNOS */

    // let studentGetById = <p className="m-0" >Ver un alumno especifico <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea buscar</span></p>

    // let studentPut = <p className="m-0" >Para modificar un alumno existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea modificar</span></p>

    // let studentDelete = <p className="m-0" >Para borrar un alumno existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea borrar</span></p>

    // let studentGetByName = <p className="m-0" >Ver un alumno especifico mediante su nombre <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el nombre del alumno que se desea buscar, teniendo en cuenta mayúsculas y minúsculas</span></p>

    // let studentFilter = <><h3 className="h4 text-primary-emphasis">Filtro</h3>Filtra por año y muestra todos los alumnos que pertenecen a ese año <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el año de cursada que se desea filtrar (de primer a sexto año)</span></>


    /*---------- Funciones para el button ----------*/
    // inicialización de useNavigate
    const navigate = useNavigate();

    // función para llevar a todos los alumnos
    const AllStudents = function () {
        navigate('/todos-los-alumnos')
    }

    // función para llevar a la vista de todos los alumnos, pero con otra ruta que habilita el botón de Detalle
    const StudentsByID = function () {
        navigate('/alumnos/detalles')
    }
    
    // función para llevar a crear alumno
    const CreateStudent = function () {
        navigate('/crear-alumno')
    }

    // función para eliminar alumno
    const DeleteStudent = function () {
        navigate('/alumnos/eliminar')
    }
    
    // función para editar alumno
    const EditStudent = function () {
        navigate('/alumnos/editar')
    }
    
    // función para editar alumno
    const SearchByName = function () {
        navigate('/alumnos/buscar-por-nombre')
    }
    
    // función para editar alumno
    const StudentFilter = function () {
        navigate('/alumnos/en-progreso')
    }

    const alumnos = [
        {
            method: 'GET',
            methodColor: 'success',
            function: 'Ver todos los alumnos',
            url: 'http://127.0.0.1:3000/api/alumnos',
            button: {
                color: 'success',
                fn: AllStudents,
                text: 'Ver'
            }
            
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: <p className="m-0" >Ver un alumno especifico <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea buscar</span></p>,
            url: 'http://127.0.0.1:3000/api/alumnos/:id',
            button: {
                color: 'success',
                fn: StudentsByID,
                text: 'Ver'
            }
        },
        {
            method: 'POST',
            methodColor: 'warning',
            function: 'Para crear un alumno',
            url: 'http://127.0.0.1:3000/api/alumnos',
            button: {
                color: 'warning',
                fn: CreateStudent,
                text: 'Crear'
            }

        },
        {
            method: 'PUT',
            methodColor: 'primary',
            function: <p className="m-0" >Para modificar un alumno existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea modificar</span></p>
            ,
            url: 'http://127.0.0.1:3000/api/alumnos/:id',
            button: {
                color: 'primary',
                fn: EditStudent,
                text: 'Actualizar'
            }
        },
        {
            method: 'DELETE',
            methodColor: 'danger',
            function: <p className="m-0" >Para borrar un alumno existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno que se desea borrar</span></p>,
            url: 'http://127.0.0.1:3000/api/alumnos/:id',
            button: {
                color: 'danger',
                fn: DeleteStudent,
                text: 'Eliminar'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: <p className="m-0" >Ver un alumno especifico mediante su nombre <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el nombre del alumno que se desea buscar, teniendo en cuenta mayúsculas y minúsculas</span></p>,
            url: 'http://127.0.0.1:3000/api/alumnos/buscar/:name',
            button: {
                color: 'success',
                fn: SearchByName,
                text: 'Ver'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: <><h3 className="h4 text-primary-emphasis">Filtro <span className='h6'>(No funciona el botón filtrar)</span></h3>Filtra por año y muestra todos los alumnos que pertenecen a ese año <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el año de cursada que se desea filtrar (de primer a sexto año)</span></>,
            url: 'http://127.0.0.1:3000/api/alumnos/año/:school_year',
            button: {
                color: 'success',
                fn: StudentFilter,
                text: 'Filtrar'
            }
        },
    ];

    // Notas adicionales de Alumnos:
    // const jsonAlumnos = <p className="fw-medium"> &#123; <br /> "name": "Nombre de alumno",  <span className="fw-semibold text-success">// Mínimo 2 caracteres</span> <br /> "last_name": "Apellido de alumno", <span className="fw-semibold text-success">// Mínimo 2 caracteres </span> <br /> "school_year": 1, <span className="fw-semibold text-success">// Se escribe con número y va del 1 al 6 (primer año a sexto año) </span> <br /> "birthdate": "2000-12-31" <span className="fw-semibold text-success">// El formato es: YYYY-MM-DD</span> <br /> &#125; </p>

    const notasAlumnos = {
        nombre: "Student",
        parametros: "name, last_name, school_year y birthdate",
        json: <p className="fw-medium"> &#123; <br /> "name": "Nombre de alumno",  <span className="fw-semibold text-success">// Mínimo 2 caracteres</span> <br /> "last_name": "Apellido de alumno", <span className="fw-semibold text-success">// Mínimo 2 caracteres </span> <br /> "school_year": 1, <span className="fw-semibold text-success">// Se escribe con número y va del 1 al 6 (primer año a sexto año) </span> <br /> "birthdate": "2000-12-31" <span className="fw-semibold text-success">// El formato es: YYYY-MM-DD</span> <br /> &#125; </p>
    }

    return (
        
        <Table title="Rutas para usar el CRUD de Alumnos" rows={alumnos} notas={notasAlumnos} />
    );

}

export default Students;