import React from "react";

const DeleteButton = (props) => {

    const fetchDeleteById = async (id) => {

        const endPoint = `http://127.0.0.1:3000/api/${props.endPoint}/${id}`

        // const response = await fetch(endPoint)

        const config = {
            method: 'DELETE',
        }

        // hacemos el fetch y le enviamos el endPoint y la configuración
        const response = await fetch(endPoint, config)


        if (!response.ok) {
            console.error("Error al intentar borrar:", response)
            return;
        }
        const data = await response.json()

        console.log(data)

        // // llamamos a la función onDelete si está definida
        // if (props.onDelete) {
        //     props.onDelete();
        // }

        // esta función va a servir para que se refreshee la página después de borrar a un usuario
        const refresh = async () => {
            await props.refresh(); // Refresca la lista de usuarios después de borrar
        };

        refresh()

    }



    return (
        <button type="button" className={'btn btn-danger'} onClick={()=>fetchDeleteById(props.id)}> {props.text}  </button>
    )
}

export default DeleteButton