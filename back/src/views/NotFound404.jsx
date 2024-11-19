import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <div className="not-found">
            <div>
                <h1>404</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    );
};

export default NotFound404;