import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'

function Subjects() {
    /* Variables para columna *Función* de CRUD de MATERIAS */

    // let subjectGetById = <p className="m-0" >Ver las materias que tiene un alumno <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno</span></p>

    // let subjectPut = <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea modificar</span></p>

    // let subjectDelete = <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea borrar</span></p>

    // let subjectFilter = <><h3 className="h4 text-primary-emphasis">Filtro</h3> Filtra por materia y muestra todos los alumnos que están en esa materia <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro la materia que se desea filtrar (con mayúsculas, minúsuclas y acentos)</span></>


    /*---------- Funciones para el button ----------*/
    // inicialización de useNavigate
    const navigate = useNavigate();

    // función para llevar a vista con todas las materias
    const AllSubjects = function () {
        navigate('/todas-las-materias')
    }
    
    // función para llevar a vista con todas las materias, pero con otra ruta que habilita el botón de Detalle
    const SubjectsById = function () {
        navigate('/materias/detalles')
    }

    // función para llevar a crear materia
    const CreateSubject = function () {
        navigate('/crear-materia')
    }
    
    // función para llevar a editar materia
    const EditSubject = function () {
        navigate('/materias/editar')
    }

    // función para eliminar materia
    const DeleteSubject = function () {
        navigate('/materias/eliminar')
    }
    
    // función para eliminar materia
    const FilterSubjectByStudent = function () {
        navigate('/materias/filtrar-por-alumno')
    }
    
    const materias = [
        {
            method: 'GET',
            methodColor: 'success',
            function: 'Ver todas las materias',
            url: 'http://127.0.0.1:3000/api/materias',
            button: {
                color: 'success',
                fn: AllSubjects,
                text: 'Ver'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: <p className="m-0" >Ver las materias que tiene un alumno <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id del alumno</span></p>,
            url: 'http://127.0.0.1:3000/api/materias/:id',
            button: {
                color: 'success',
                fn: SubjectsById,
                text: 'Ver'
            }
        },
        {
            method: 'POST',
            methodColor: 'warning',
            function: 'Para crear una materia',
            url: 'http://127.0.0.1:3000/api/materias',
            button: {
                color: 'warning',
                fn: CreateSubject,
                text: 'Crear'
            }
        },
        {
            method: 'PUT',
            methodColor: 'primary',
            function: <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea modificar</span></p>,
            url: 'http://127.0.0.1:3000/api/materias/:id',
            button: {
                color: 'primary',
                fn: EditSubject,
                text: 'Actualizar'
            }
        },
        {
            method: 'DELETE',
            methodColor: 'danger',
            function: <p className="m-0" >Para modificar una materia existente <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro el id de la materia que se desea borrar</span></p>,
            url: 'http://127.0.0.1:3000/api/materias/:id',
            button: {
                color: 'danger',
                fn: DeleteSubject,
                text: 'Eliminar'
            }
        },
        {
            method: 'GET',
            methodColor: 'success',
            function: <><h3 className="h4 text-primary-emphasis">Filtro</h3> Filtra por materia y muestra todos los alumnos que están en esa materia <br /> <span className="fw-semibold text-body-secondary">Es necesario poner como parámetro la materia que se desea filtrar (con mayúsculas, minúsuclas y acentos)</span></>,
            url: 'http://127.0.0.1:3000/api/materias/materia/:subject',
            button: {
                color: 'success',
                fn: FilterSubjectByStudent,
                text: 'Filtrar'
            }
        },

    ];

    // Notas adicionales de Materias:
    // const jsonMaterias = <p className="fw-medium"> &#123; <br /> "name": "Nombre de la materia", <br /> "studentId": "670ae395f783cfbf29096fb3" <span className="fw-semibold text-success">// Aquí iría el ID del alumno al cual se está haciendo referencia </span> <br /> &#125; </p>

    const notasMaterias = {
        nombre: "Subject",
        parametros: "name y studentId",
        json: <p className="fw-medium"> &#123; <br /> "name": "Nombre de la materia", <br /> "studentId": "670ae395f783cfbf29096fb3" <span className="fw-semibold text-success">// Aquí iría el ID del alumno al cual se está haciendo referencia </span> <br /> &#125; </p>
    }

    return (

        <Table title="Rutas para usar el CRUD de Materias" rows={materias} notas={notasMaterias}/>

    );

}

export default Subjects;