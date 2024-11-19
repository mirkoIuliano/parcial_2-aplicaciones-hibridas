import React from 'react';

function NotasAdicionales ({notas}) {
    return (
        <div className="mt-4">
            <h3>Notas adicionales</h3>
            <p>Los parámetros del modelo {notas.nombre} son: <span className="fw-semibold">{notas.parametros}</span></p>
            <p>Ejemplo de objeto JSON:</p>
            <div className="w-50 m-auto">
            
                {notas.json}
            
            </div>
        </div>
    );
}

export default NotasAdicionales;