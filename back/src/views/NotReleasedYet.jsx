import React from 'react';
import { Link } from 'react-router-dom';

const NotReleasedYet = () => {
    return (
        <div className="not-found">
            <div>
                <h1></h1>
                <p>Lo sentimos, la página que buscas no está lista para su funcionamiento.</p>
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    );
};

export default NotReleasedYet;