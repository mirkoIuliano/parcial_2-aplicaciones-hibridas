import React from 'react';
import NavBar from './NavBar';


const Header = () => {
    return (
        <>
            <header>
                <h1 className="text-center bg-body-tertiary h1 p-3 m-0">API REST de Escuela</h1>
                <NavBar/>
            </header>
        </>
    );
};

export default Header;