import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">API Rest</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/" className={({ isActive }) => `enlaveNav nav-link ${isActive ? "activo" : ""}`}>Inicio</NavLink>
                            <NavLink to="/usuarios" className={({ isActive }) => `enlaveNav nav-link ${isActive ? "activo" : ""}`}>Usuarios</NavLink>
                            <NavLink to="/alumnos" className={({ isActive }) => `enlaveNav nav-link ${isActive ? "activo" : ""}`}>Alumnos</NavLink>
                            <NavLink to="/materias" className={({ isActive }) => `enlaveNav nav-link ${isActive ? "activo" : ""}`}>Materias</NavLink>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;

